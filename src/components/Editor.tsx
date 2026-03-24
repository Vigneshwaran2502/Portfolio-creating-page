import React from 'react';
import { useStore } from '../store/useStore';

export default function Editor() {
  const { markdown, setMarkdown } = useStore();

  return (
    <div className="flex flex-col h-full bg-gray-900 text-gray-100 border-r border-gray-800">
      <div className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Markdown Editor</h2>
        <div className="flex gap-2">
          <button 
            className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded transition-colors"
            onClick={() => {
              const el = document.createElement('input');
              el.type = 'file';
              el.accept = '.md';
              el.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => setMarkdown(e.target?.result as string);
                  reader.readAsText(file);
                }
              };
              el.click();
            }}
          >
            Upload .md
          </button>
        </div>
      </div>
      <textarea
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        className="flex-1 w-full p-6 bg-transparent resize-none focus:outline-none font-mono text-sm leading-relaxed"
        placeholder="Paste your markdown resume here..."
        spellCheck={false}
      />
    </div>
  );
}
