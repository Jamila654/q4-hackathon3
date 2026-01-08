'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, action: 'signup' })
            });
            
            const data = await res.json();

            if (res.ok) {
                // Save user to local storage and redirect
                localStorage.setItem('user', JSON.stringify(data));
                router.push('/dashboard');
            } else {
                setError(data.error || "Signup failed. Email might already exist.");
            }
        } catch (err) {
            setError("A connection error occurred. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-gray-900 to-black flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                {/* Back to Home Link */}
                <Link href="/" className="inline-block mb-8 text-gray-500 hover:text-white transition-all text-sm font-bold tracking-widest">
                    ← BACK TO HOME
                </Link>

                <div className="bg-white/5 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
                    {/* Subtle Gradient Glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/20 blur-[100px]" />
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-600/20 blur-[100px]" />

                    <div className="relative z-10">
                        <div className="text-center mb-10">
                            <span className="text-5xl block mb-4">🐍</span>
                            <h1 className="text-4xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                                Create Account
                            </h1>
                            <p className="text-gray-400 mt-2 text-sm uppercase tracking-widest font-bold opacity-60">Join the Python Elite</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm text-center font-bold">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSignup} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-gray-500 ml-4 uppercase tracking-widest">Full Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Guido van Rossum" 
                                    className="w-full p-4 rounded-2xl bg-black border border-white/10 text-white focus:border-purple-500 outline-none transition-all placeholder:text-gray-700" 
                                    onChange={e => setForm({...form, name: e.target.value})} 
                                    required 
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-gray-500 ml-4 uppercase tracking-widest">Email Address</label>
                                <input 
                                    type="email" 
                                    placeholder="pythonista@flow.com" 
                                    className="w-full p-4 rounded-2xl bg-black border border-white/10 text-white focus:border-purple-500 outline-none transition-all placeholder:text-gray-700" 
                                    onChange={e => setForm({...form, email: e.target.value})} 
                                    required 
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-gray-500 ml-4 uppercase tracking-widest">Password</label>
                                <input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="w-full p-4 rounded-2xl bg-black border border-white/10 text-white focus:border-purple-500 outline-none transition-all placeholder:text-gray-700" 
                                    onChange={e => setForm({...form, password: e.target.value})} 
                                    required 
                                />
                            </div>

                            <button 
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-5 rounded-2xl font-black text-lg shadow-xl shadow-purple-500/20 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                            >
                                {loading ? "INITIALIZING..." : "START LEARNING →"}
                            </button>
                        </form>

                        <div className="text-center mt-8">
                            <p className="text-gray-500 text-sm">
                                Already mastering Python? <Link href="/login" className="text-blue-400 font-bold hover:text-blue-300 transition-colors">Log In</Link>
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Footer Note */}
                <p className="text-center mt-12 text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">
                    Powered by LearnFlow AI Infrastructure
                </p>
            </div>
        </div>
    );
}