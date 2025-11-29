import React, { useState } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ControlPanel } from './components/ControlPanel';
import { ResultsDisplay } from './components/ResultsDisplay';
import { generateCreativeContent } from './services/gemini';
import { AnalysisResult, ContentType, GenerationOptions, WritingStyle } from './types';
import { Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [selectedImageBase64, setSelectedImageBase64] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<GenerationOptions>({
    contentType: ContentType.STORY,
    style: WritingStyle.WHIMSICAL
  });

  const handleImageSelected = (base64: string, preview: string) => {
    setSelectedImageBase64(base64);
    setImagePreview(preview);
    setResult(null); // Clear previous results
  };

  const handleClear = () => {
    setSelectedImageBase64(null);
    setImagePreview(null);
    setResult(null);
  };

  const handleGenerate = async () => {
    if (!selectedImageBase64) return;

    setIsLoading(true);
    try {
      const data = await generateCreativeContent(selectedImageBase64, options);
      setResult(data);
    } catch (error) {
      console.error("Failed to generate content", error);
      alert("Something went wrong with the AI generation. Please ensure your API key is valid and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 h-16 flex items-center px-6 lg:px-12 justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg text-white">
            <Sparkles size={18} />
          </div>
          <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Visual Muse
          </h1>
        </div>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 hidden sm:block">
          Powered by Gemini 2.5 Flash
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-6 lg:px-12 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column - Controls (Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="space-y-2 mb-6">
              <h2 className="text-3xl font-extrabold tracking-tight">
                Inspiration Starts Here
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Upload an image and let AI craft a unique story or poem based on what it sees.
              </p>
            </div>

            <ImageUploader 
              onImageSelected={handleImageSelected} 
              selectedImage={imagePreview} 
              onClear={handleClear} 
            />
            
            <ControlPanel 
              options={options} 
              setOptions={setOptions} 
              onGenerate={handleGenerate} 
              isLoading={isLoading}
              disabled={!selectedImageBase64}
            />
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-7 min-h-[500px]">
            <ResultsDisplay 
              result={result} 
              isLoading={isLoading} 
              imagePreview={imagePreview}
            />
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
