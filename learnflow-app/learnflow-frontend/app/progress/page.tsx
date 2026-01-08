'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';

interface TopicsResponse {
  topics: string[];
}

export default function ProgressPage() {
  const [topics, setTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = (await api.getTopics()) as TopicsResponse;
        setTopics(response.topics);
      } catch (error) {
        console.error('Failed to fetch topics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">📊 Learning Progress</h1>
          <Link href="/" className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
            ← Home
          </Link>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-6">Python Curriculum</h2>
          
          {loading ? (
            <p className="text-gray-400">Loading topics...</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {topics.map((topic, idx) => (
                <div key={idx} className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">📚</div>
                    <div>
                      <h3 className="font-semibold">{topic}</h3>
                      <p className="text-sm text-gray-400">Not started</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 p-6 bg-blue-900 bg-opacity-30 rounded-lg border border-blue-700">
            <h3 className="text-xl font-semibold mb-2">🎯 Coming Soon</h3>
            <p className="text-gray-300">
              Track your progress, complete quizzes, and get personalized AI insights on your learning journey!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}