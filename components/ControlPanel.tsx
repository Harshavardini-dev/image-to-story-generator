import React from 'react';
import { ContentType, WritingStyle, GenerationOptions } from '../types';
import { PenTool, Palette, Sparkles } from 'lucide-react';

interface ControlPanelProps {
  options: GenerationOptions;
  setOptions: React.Dispatch<React.SetStateAction<GenerationOptions>>;
  onGenerate: () => void;
  isLoading: boolean;
  disabled: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ 
  options, 
  setOptions, 
  onGenerate, 
  isLoading,
  disabled
}) => {
  return (
    <div className="space-y-8 mt-6 p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-lg shadow-gray-100 dark:shadow-none border border-gray-100 dark:border-gray-800">
      <div className="pb-4 border-b border-gray-100 dark:border-gray-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
           Configuration
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Customize your AI generation parameters</p>
      </div>

      {/* Content Type Selector */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          <PenTool size={14} />
          Output Mode
        </label>
        <div className="grid grid-cols-2 gap-3">
          {Object.values(ContentType).map((type) => (
            <button
              key={type}
              onClick={() => setOptions(prev => ({ ...prev, contentType: type }))}
              className={`
                py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 border-2
                ${options.contentType === type 
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' 
                  : 'border-transparent bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}
              `}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Style Selector */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          <Palette size={14} />
          Writing Style
        </label>
        <div className="relative">
          <select
            value={options.style}
            onChange={(e) => setOptions(prev => ({ ...prev, style: e.target.value as WritingStyle }))}
            className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-500 focus:ring-0 text-gray-800 dark:text-white transition-all cursor-pointer font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {Object.values(WritingStyle).map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={onGenerate}
        disabled={disabled || isLoading}
        className={`
          w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300
          ${disabled 
            ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl shadow-indigo-200/50 dark:shadow-none hover:-translate-y-0.5 active:translate-y-0'}
        `}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Generating...</span>
          </>
        ) : (
          <>
            <Sparkles size={20} />
            <span>Generate {options.contentType}</span>
          </>
        )}
      </button>
    </div>
  );
};