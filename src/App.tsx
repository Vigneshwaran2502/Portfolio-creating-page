/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Editor from './components/Editor';
import Preview from './components/Preview';
import Toolbar from './components/Toolbar';
import SectionManager from './components/SectionManager';

export default function App() {
  return (
    <div className="flex flex-col h-screen w-full bg-black text-white overflow-hidden font-sans">
      <Toolbar />
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <div className="w-full md:w-1/3 md:min-w-[350px] h-1/2 md:h-full border-b md:border-b-0 md:border-r border-gray-800">
          <Editor />
        </div>
        <div className="flex-1 h-1/2 md:h-full bg-gray-950 relative overflow-hidden">
          <Preview />
        </div>
        <div className="hidden lg:block">
          <SectionManager />
        </div>
      </div>
    </div>
  );
}
