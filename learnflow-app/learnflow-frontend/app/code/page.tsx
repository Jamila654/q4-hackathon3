'use client';

import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { api } from '@/lib/api';
import Link from 'next/link';

interface ExecuteResponse {
  success: boolean;
  output: string;
  error: string;
}

export default function CodePage() {
  const [code, setCode] = useState('# Write your Python code here\nprint("Hello, World!")');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    setOutput('');
    setError('');

    try {
      // Cast response to our interface
      const response = (await api.executeCode(code, 'student123')) as ExecuteResponse;
      if (response.success) {
        setOutput(response.output);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError('Failed to execute code. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">💻 Python Code Editor</h1>
          <Link href="/" className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
            ← Home
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Editor</h2>
              <button
                onClick={runCode}
                disabled={loading}
                className="px-6 py-2 bg-green-600 rounded-lg hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Running...' : '▶ Run Code'}
              </button>
            </div>
            <Editor
              height="500px"
              defaultLanguage="python"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
              }}
            />
          </div>

          <div className="bg-gray-800 rounded-xl p-4">
            <h2 className="text-xl font-semibold mb-4">Output</h2>
            <div className="bg-black rounded-lg p-4 h-[500px] overflow-y-auto font-mono text-sm">
              {output && (
                <pre className="text-green-400 whitespace-pre-wrap">{output}</pre>
              )}
              {error && (
                <pre className="text-red-400 whitespace-pre-wrap">{error}</pre>
              )}
              {!output && !error && !loading && (
                <p className="text-gray-500">Output will appear here...</p>
              )}
              {loading && <p className="text-yellow-400">Executing...</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}