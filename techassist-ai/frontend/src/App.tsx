import React, { useState } from 'react';
import Chat from './components/Chat/Chat';
import Layout from './components/Layout/Layout';

type Mode = 'pre-visit' | 'on-site';

function App() {
  const [mode, setMode] = useState<Mode>('pre-visit');

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-4">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Field Service AI Assistant
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => setMode('pre-visit')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                mode === 'pre-visit'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Pre-Visit Preparation
            </button>
            <button
              onClick={() => setMode('on-site')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                mode === 'on-site'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              On-Site Support
            </button>
          </div>
        </header>

        <main>
          <Chat mode={mode} />
        </main>
      </div>
    </Layout>
  );
}

export default App;