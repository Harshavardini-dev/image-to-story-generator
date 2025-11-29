import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ContentType, WritingStyle, AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    detectedObjects: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of 3-5 key objects, people, or activities identified in the image.",
    },
    mood: {
      type: Type.STRING,
      description: "The overall emotional atmosphere or mood (e.g., Melancholic, Joyful, Serene).",
    },
    title: {
      type: Type.STRING,
      description: "A creative and relevant title for the generated piece.",
    },
    content: {
      type: Type.STRING,
      description: "The generated story or poem text. It should be long, comprehensive, and detailed (approx 20+ lines).",
    },
  },
  required: ["detectedObjects", "mood", "title", "content"],
};

export const generateCreativeContent = async (
  imageBase64: string,
  options: { contentType: ContentType; style: WritingStyle }
): Promise<AnalysisResult> => {
  const prompt = `
    Analyze the provided image deeply to act as a Visual Muse.
    
    1. **Object Detection**: Identify key objects, people, settings, and human activities. Be accurate. Do not hallucinate objects that are not there.
    2. **Mood Detection**: Determine the emotional tone (e.g., happy, sad, calm, angry, nostalgic).
    3. **Creative Writing**: Write a ${options.contentType} inspired by the image.
    4. **Style**: The writing style must be '${options.style}'.
    
    Constraints:
    - The story/poem MUST reflect exactly what is in the image.
    - If there are people, describe their emotions based on their expressions.
    - No generic text; make it specific to the visual details provided.
    - **LENGTH**: Write a LONG, detailed piece. Do NOT restrict yourself to short paragraphs. Aim for at least 20-30 lines or more. Flesh out the narrative or stanzas fully.
    
    Return the result in strict JSON format matching the schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: imageBase64,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.7,
      },
    });

    if (!response.text) {
      throw new Error("No response text generated");
    }

    const result = JSON.parse(response.text) as AnalysisResult;
    return result;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};