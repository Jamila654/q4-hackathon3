'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const CURRICULUM = [
    { id: '1', title: 'Variables and Data Types', slug: 'variables-data-types', icon: '📚', color: 'from-blue-500 to-cyan-500' },
    { id: '2', title: 'Control Flow (if/elif/else)', slug: 'control-flow', icon: '⚖️', color: 'from-purple-500 to-indigo-500' },
    { id: '3', title: 'Loops (for/while)', slug: 'loops', icon: '🔄', color: 'from-pink-500 to-rose-500' },
    { id: '4', title: 'Lists and Tuples', slug: 'lists-tuples', icon: '📦', color: 'from-orange-500 to-yellow-500' },
    { id: '5', title: 'Dictionaries and Sets', slug: 'dictionaries-sets', icon: '🗺️', color: 'from-green-500 to-emerald-500' },
    { id: '6', title: 'Functions', slug: 'functions', icon: '⚙️', color: 'from-blue-600 to-purple-600' },
    { id: '7', title: 'Object-Oriented Programming', slug: 'oop', icon: '🏗️', color: 'from-violet-600 to-fuchsia-600' },
    { id: '8', title: 'File Handling', slug: 'file-handling', icon: '📂', color: 'from-sky-500 to-blue-500' },
    { id: '9', title: 'Error Handling', slug: 'error-handling', icon: '⚠️', color: 'from-red-500 to-orange-500' },
    { id: '10', title: 'Modules and Packages', slug: 'modules-packages', icon: '📦', color: 'from-teal-500 to-green-500' },
];

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('user');
            return saved ? JSON.parse(saved) : null;
        }
        return null;
    });

    const [completedTopics, setCompletedTopics] = useState<string[]>([]);

    useEffect(() => {
        if (!user) {
            router.push('/login');
        } else {
            fetch(`/api/progress?email=${user.email}`)
                .then(res => res.json())
                .then(setCompletedTopics)
                .catch(err => console.error(err));
        }
    }, [user, router]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        router.push('/login');
    };

    if (!user) return null;
    const progress = Math.round((completedTopics.length / CURRICULUM.length) * 100);

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            {/* Nav Bar */}
            <nav className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🐍</span>
                        <span className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                            LEARNFLOW
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-400 text-sm hidden sm:block">Welcome, <span className="text-white font-bold">{user.name}</span></span>
                        <button onClick={handleLogout} className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/20 hover:text-red-400 transition-all text-xs font-bold">
                            LOGOUT
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-6 py-12">
                {/* Stats Card */}
                <div className="bg-gradient-to-br from-gray-900 to-[#0a0a0a] border border-white/10 p-10 rounded-[2.5rem] mb-12 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-8">
                    <div>
                        <h2 className="text-4xl font-black tracking-tighter mb-2">Python Path</h2>
                        <p className="text-gray-400">Mastering Python through Agentic Infrastructure</p>
                        <div className="mt-8 flex gap-3">
                            <span className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-xs font-bold border border-blue-500/20">
                                {completedTopics.length} / 10 MODULES
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-6xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">{progress}%</span>
                        <div className="w-48 h-2 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000" style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CURRICULUM.map((topic) => {
                        const isDone = completedTopics.includes(topic.title);
                        return (
                            <Link href={`/lessons/${topic.slug}`} key={topic.id} className="group">
                                <div className={`h-full p-8 rounded-[2rem] border transition-all duration-300 ${
                                    isDone 
                                    ? 'bg-gradient-to-br from-green-900/20 to-black border-green-500/30' 
                                    : 'bg-white/[0.02] border-white/5 hover:border-purple-500/50 hover:bg-white/[0.05]'
                                }`}>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${topic.color} flex items-center justify-center text-3xl shadow-lg shadow-black/50`}>
                                            {topic.icon}
                                        </div>
                                        {isDone && <div className="bg-green-500 text-black p-1 rounded-full"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{topic.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-6">Explore syntax, logic, and real-world implementation.</p>
                                    <div className={`text-sm font-bold uppercase tracking-widest ${isDone ? 'text-green-400' : 'text-blue-500 group-hover:text-white transition-colors'}`}>
                                        {isDone ? 'Review' : 'Start Lesson →'}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}