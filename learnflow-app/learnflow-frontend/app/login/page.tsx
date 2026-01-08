'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth', { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, action: 'login' })
            });
            
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('user', JSON.stringify(data));
                router.push('/dashboard');
            } else {
                setError(data.error || "Invalid email or password");
            }
        } catch (err) {
            setError("Connection failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                {/* --- ADDED BACK TO HOME LINK --- */}
                <Link href="/" className="inline-block mb-8 text-gray-500 hover:text-white transition-all text-sm font-bold tracking-widest group">
                    <span className="group-hover:mr-2 transition-all">←</span> BACK TO HOME
                </Link>

                <div className="bg-white/5 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
                    {/* Subtle Background Glows */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 blur-[100px]" />
                    
                    <div className="relative z-10">
                        <div className="text-center mb-10">
                            <span className="text-5xl block mb-4">🐍</span>
                            <h1 className="text-4xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                                Welcome Back
                            </h1>
                            <p className="text-gray-500 mt-2 text-xs font-bold uppercase tracking-[0.2em]">Agentic Learning Portal</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs text-center font-bold">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-gray-600 ml-4 uppercase tracking-widest">Email Address</label>
                                <input 
                                    type="email" 
                                    placeholder="email@example.com" 
                                    className="w-full p-4 rounded-2xl bg-black/50 border border-white/10 text-white focus:border-purple-500 outline-none transition-all placeholder:text-gray-700" 
                                    onChange={e => setForm({...form, email: e.target.value})} 
                                    required 
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-gray-600 ml-4 uppercase tracking-widest">Password</label>
                                <input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="w-full p-4 rounded-2xl bg-black/50 border border-white/10 text-white focus:border-purple-500 outline-none transition-all placeholder:text-gray-700" 
                                    onChange={e => setForm({...form, password: e.target.value})} 
                                    required 
                                />
                            </div>

                            <button 
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 p-5 rounded-2xl font-black text-white mt-4 shadow-xl shadow-purple-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                            >
                                {loading ? "AUTHENTICATING..." : "LOGIN →"}
                            </button>
                        </form>

                        <div className="text-center mt-8">
                            <p className="text-gray-500 text-sm">
                                New to LearnFlow? <Link href="/signup" className="text-blue-400 font-bold hover:text-blue-300 transition-colors">Sign Up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}