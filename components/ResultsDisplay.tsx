import React from 'react';
import { AnalysisResult } from '../types';
import { Tag, Quote, Aperture, Smile } from 'lucide-react';

interface ResultsDisplayProps {
  result: AnalysisResult | null;
  isLoading: boolean;
  imagePreview: string | null;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, isLoading, imagePreview }) => {
  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-6 min-h-[500px] bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Aperture size={24} className="text-indigo-600 animate-pulse" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-gray-700 dark:text-gray-200">Analyzing Visuals...</p>
          <p className="text-sm text-gray-500">Detecting objects • Reading emotions • Crafting story</p>
        </div>
      </div>
    );
  }

  if (!result || !imagePreview) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-400 min-h-[500px] border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl p-8 bg-gray-50/50 dark:bg-gray-900/50">
        <Aperture size={64} className="mb-4 text-gray-300 dark:text-gray-700" />
        <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">Ready to Create</h3>
        <p className="text-center max-w-sm text-gray-500">
          Upload an image on the left to see the AI analysis and generated creative text appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      
      {/* Image Preview & Analysis Container */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-xl shadow-gray-100 dark:shadow-none border border-gray-100 dark:border-gray-800">
        
        {/* Source Image */}
        <div className="mb-6 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 h-64 md:h-80 relative group">
          <img 
            src={imagePreview} 
            alt="Analyzed Source" 
            className="w-full h-full object-contain"
          />
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            Source Image
          </div>
        </div>

        {/* Analysis Tags */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
          {/* Mood Card */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/50 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400">
              <Smile size={18} />
              <h3 className="text-xs font-bold uppercase tracking-wider">Detected Mood</h3>
            </div>
            <p className="text-lg font-serif font-medium text-indigo-900 dark:text-indigo-100">
              {result.mood}
            </p>
          </div>

          {/* Objects Card */}
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-100 dark:border-purple-900/50">
            <div className="flex items-center gap-2 mb-2 text-purple-600 dark:text-purple-400">
              <Tag size={18} />
              <h3 className="text-xs font-bold uppercase tracking-wider">Detected Objects</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.detectedObjects.map((obj, idx) => (
                <span 
                  key={idx}
                  className="bg-white dark:bg-purple-900/40 text-purple-700 dark:text-purple-200 px-2 py-1 rounded-md text-xs font-medium border border-purple-100 dark:border-purple-800"
                >
                  {obj}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Generated Content */}
      <div className="relative bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl shadow-gray-100 dark:shadow-none border border-gray-100 dark:border-gray-800">
        <div className="absolute -top-4 left-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-2 rounded-lg shadow-lg transform -rotate-2">
          <Quote size={24} />
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-4 font-serif leading-tight">
          {result.title}
        </h2>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="whitespace-pre-line leading-relaxed text-gray-700 dark:text-gray-300 font-serif text-lg pl-4 border-l-4 border-indigo-100 dark:border-indigo-900">
            {result.content}
          </p>
        </div>
      </div>
    </div>
  );
};