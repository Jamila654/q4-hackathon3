'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="text-7xl mb-4">🐍</div>
          </div>
          <h1 className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            LearnFlow
          </h1>
          <p className="text-3xl text-gray-300 mb-4">
            Master Python with AI-Powered Learning
          </p>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Interactive lessons, real-time code execution, and personalized AI tutoring
            to accelerate your programming journey
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg"
            >
              Start Learning →
            </Link>
            <Link
              href="/chat"
              className="px-8 py-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all font-semibold text-lg border border-gray-700"
            >
              Try Chat Demo
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-2xl font-bold mb-3">AI-Powered Tutoring</h3>
            <p className="text-gray-400">
              Get instant explanations and personalized guidance from our advanced AI tutor
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold mb-3">Live Code Execution</h3>
            <p className="text-gray-400">
              Write, run, and debug Python code directly in your browser with instant feedback
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-pink-500 transition-all">
            <div className="text-5xl mb-4">📈</div>
            <h3 className="text-2xl font-bold mb-3">Progress Tracking</h3>
            <p className="text-gray-400">
              Monitor your learning journey with detailed analytics and achievement tracking
            </p>
          </div>
        </div>

        {/* Main Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Link
            href="/chat"
            className="group bg-gradient-to-br from-blue-900 to-blue-800 p-8 rounded-2xl hover:from-blue-800 hover:to-blue-700 transition-all transform hover:scale-105 border border-blue-700"
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">💬</div>
            <h2 className="text-3xl font-bold mb-3">Chat with Tutor</h2>
            <p className="text-blue-100">
              Ask questions and get instant AI-powered explanations with code examples
            </p>
          </Link>

          <Link
            href="/code"
            className="group bg-gradient-to-br from-purple-900 to-purple-800 p-8 rounded-2xl hover:from-purple-800 hover:to-purple-700 transition-all transform hover:scale-105 border border-purple-700"
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">💻</div>
            <h2 className="text-3xl font-bold mb-3">Code Editor</h2>
            <p className="text-purple-100">
              Write and run Python code in the browser with Monaco Editor
            </p>
          </Link>

          <Link
            href="/progress"
            className="group bg-gradient-to-br from-pink-900 to-pink-800 p-8 rounded-2xl hover:from-pink-800 hover:to-pink-700 transition-all transform hover:scale-105 border border-pink-700"
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">📊</div>
            <h2 className="text-3xl font-bold mb-3">Track Progress</h2>
            <p className="text-pink-100">
              View your learning journey and achievements across all modules
            </p>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center">
          <p className="text-gray-500 mb-2">Powered by AI Agents & Kubernetes</p>
          <p className="text-gray-600 text-sm">Built for Hackathon III - Agentic Infrastructure</p>
        </div>
      </div>
    </div>
  );
}