// 'use client';
// import { useParams, useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';

// const LESSON_DATA: Record<string, { title: string, content: string, code: string, tip: string, module: string }> = {
//     "variables-data-types": {
//         module: "01",
//         title: "Variables and Data Types",
//         content: "Variables are the foundation of any program. In Python, variables are created the moment you assign a value to them. Python is dynamically typed, meaning you don't need to declare whether a variable is a string or an integer; the interpreter figures it out automatically. The basic types include Integers (whole numbers), Floats (decimals), Strings (text), and Booleans (True/False).",
//         code: "# Variable Assignment\nname = 'LearnFlow'\nversion = 3.10\nis_active = True\n\n# Dynamic Re-assignment\nscore = 10\nscore = 'Ten' # This is perfectly legal in Python",
//         tip: "Use snake_case for variable names (e.g., user_score) to follow Python's PEP 8 style guide."
//     },
//     "control-flow": {
//         module: "02",
//         title: "Control Flow (if/elif/else)",
//         content: "Control flow allows your program to execute code blocks only when specific conditions are met. Python uses indentation (4 spaces) instead of curly braces to define scope. The 'if' statement evaluates a condition, 'elif' (short for else-if) checks subsequent conditions, and 'else' catches everything else.",
//         code: "temperature = 25\n\nif temperature > 30:\n    print('It is hot!')\nelif temperature > 20:\n    print('It is pleasant.')\nelse:\n    print('It is cold.')",
//         tip: "In Python, any non-zero number or non-empty string evaluates to 'True' in a boolean context."
//     },
//     "loops": {
//         module: "03",
//         title: "Loops (for/while)",
//         content: "Loops are used to iterate over a sequence (like a list) or repeat a task until a condition changes. A 'for' loop is used for iterating over items, while a 'while' loop executes as long as a condition remains True. Be careful with 'while' loops to avoid infinite loops!",
//         code: "# For Loop\nfor i in range(5):\n    print(f'Iteration {i}')\n\n# While Loop\ncount = 0\nwhile count < 3:\n    print('Counting...')\n    count += 1",
//         tip: "Use the 'enumerate()' function in for loops to get both the index and the value at the same time."
//     },
//     "lists-tuples": {
//         module: "04",
//         title: "Lists and Tuples",
//         content: "Lists and Tuples are used to store multiple items in a single variable. Lists are mutable (you can change them), while Tuples are immutable (they cannot be changed after creation). This makes Tuples faster and safer for data that should never change.",
//         code: "my_list = ['Python', 'JS', 'C++']\nmy_list[1] = 'TypeScript' # Allowed\n\nmy_tuple = (10, 20, 30)\n# my_tuple[0] = 5 # This would cause an Error",
//         tip: "Use Lists for collections of data that need to grow; use Tuples for fixed sets of constants."
//     },
//     "dictionaries-sets": {
//         module: "05",
//         title: "Dictionaries and Sets",
//         content: "Dictionaries store data in Key:Value pairs, making them incredibly fast for looking up information. Sets are unordered collections of unique elements; they are perfect for removing duplicates from a list or performing mathematical set operations.",
//         code: "user = {\n    'name': 'Dev',\n    'level': 5\n}\n\n# Sets automatically remove duplicates\nunique_ids = {1, 2, 2, 3} # Result: {1, 2, 3}",
//         tip: "Keys in a dictionary must be immutable types, like strings, numbers, or tuples."
//     },
//     "functions": {
//         module: "06",
//         title: "Functions",
//         content: "Functions are blocks of reusable code that perform a specific action. They help break large programs into smaller, manageable pieces. You define a function using the 'def' keyword and call it using its name followed by parentheses.",
//         code: "def greet(name='Student'):\n    return f'Hello, {name}!'\n\nmessage = greet('Alice')\nprint(message)",
//         tip: "Always include a 'docstring' (a triple-quoted string) at the start of your function to explain what it does."
//     },
//     "oop": {
//         module: "07",
//         title: "Object-Oriented Programming",
//         content: "OOP is a paradigm based on 'objects' which contain data (attributes) and code (methods). Classes act as blueprints for these objects. This allows for powerful concepts like Inheritance, where one class takes features from another.",
//         code: "class Robot:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        print(f'{self.name} says Beep!')\n\nbot = Robot('Flow')\nbot.speak()",
//         tip: "The 'self' parameter is a reference to the current instance of the class and is used to access variables belonging to the class."
//     },
//     "file-handling": {
//         module: "08",
//         title: "File Handling",
//         content: "Python can create, read, update, and delete files. Using the 'with' statement is the best practice because it automatically closes the file for you, preventing memory leaks and data corruption.",
//         code: "# Writing to a file\nwith open('notes.txt', 'w') as f:\n    f.write('Python is amazing!')\n\n# Reading a file\nwith open('notes.txt', 'r') as f:\n    print(f.read())",
//         tip: "Always use 'a' (append) mode instead of 'w' (write) if you want to add text without deleting what's already there."
//     },
//     "error-handling": {
//         module: "09",
//         title: "Error Handling",
//         content: "Even the best code can crash. Error handling (try/except) allows your program to catch errors gracefully rather than stopping entirely. You can use 'finally' to run code regardless of whether an error occurred.",
//         code: "try:\n    number = 10 / 0\nexcept ZeroDivisionError:\n    print('Cannot divide by zero!')\nfinally:\n    print('Cleaning up...')",
//         tip: "Avoid using a bare 'except:'—always specify the error type you are expecting to catch."
//     },
//     "modules-packages": {
//         module: "10",
//         title: "Modules and Packages",
//         content: "Modules are just Python files containing code. Packages are directories of modules. This structure allows you to use pre-written code from the Python Standard Library or third-party libraries using 'pip'.",
//         code: "import math\nprint(math.sqrt(16))\n\nfrom datetime import datetime\nprint(datetime.now())",
//         tip: "Use 'import module as m' to give a module a shorter alias for cleaner code."
//     }
// };

// export default function LessonPage() {
//     const { slug } = useParams();
//     const router = useRouter();
//     const lesson = LESSON_DATA[slug as string] || LESSON_DATA["variables-data-types"];

//     const [isCompleted, setIsCompleted] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [user] = useState(() => {
//         if (typeof window !== 'undefined') return JSON.parse(localStorage.getItem('user') || 'null');
//     });

//     useEffect(() => {
//         if (!user) {
//             router.push('/login');
//             return;
//         }

//         const checkStatus = async () => {
//             try {
//                 const res = await fetch(`/api/progress?email=${user.email}`);
//                 const completedTopics = await res.json();
//                 setIsCompleted(completedTopics.includes(lesson.title));
//             } catch (err) {
//                 console.error("Status check failed", err);
//             }
//         };
//         checkStatus();
//     }, [user, router, lesson.title]);

//     const handleToggleComplete = async () => {
//         if (!user || loading) return;
//         setLoading(true);

//         try {
//             // We pass an 'action' to the backend so it knows whether to add or remove
//             const res = await fetch("/api/progress", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ 
//                     email: user.email, 
//                     topic: lesson.title,
//                     action: isCompleted ? 'undo' : 'complete' // Explicitly tell the backend what to do
//                 }),
//             });
            
//             if (res.ok) {
//                 const newStatus = !isCompleted;
//                 setIsCompleted(newStatus);
                
//                 // If we just finished, go back. If we undid it, stay on page.
//                 if (newStatus === true) {
//                     router.push("/dashboard");
//                 }
//             }
//         } catch (error) {
//             console.error("Update failed:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (!user) return null;

//     return (
//         <div className="min-h-screen bg-[#050505] text-white">
//             <nav className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
//                 <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
//                     <button 
//                         onClick={() => router.push('/dashboard')}
//                         className="flex items-center gap-3 text-gray-400 hover:text-white transition-all font-bold text-xs tracking-widest"
//                     >
//                         ← <span className="hidden sm:inline">BACK TO DASHBOARD</span>
//                     </button>
//                     <div className="flex items-center gap-3">
//                         <span className="text-xl">🐍</span>
//                         <span className="font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
//                             LEARNFLOW
//                         </span>
//                     </div>
//                     <div className="w-24 text-right">
//                         <span className={`text-[10px] border px-3 py-1 rounded-full font-bold transition-all duration-500 ${isCompleted ? 'bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'bg-white/5 border-white/10 text-purple-400'}`}>
//                             {isCompleted ? 'FINISHED' : `MOD ${lesson.module}`}
//                         </span>
//                     </div>
//                 </div>
//             </nav>

//             <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
//                 <div className="grid lg:grid-cols-2 gap-16 items-start">
//                     <div className="space-y-10">
//                         <div>
//                             <h1 className="text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500 leading-tight">
//                                 {lesson.title}
//                             </h1>
//                             <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
//                         </div>

//                         <div className="prose prose-invert max-w-none text-xl text-gray-400 leading-relaxed font-medium">
//                             {lesson.content}
//                         </div>

//                         <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/10 p-8 rounded-[2.5rem] border border-purple-500/20 shadow-2xl relative overflow-hidden group">
//                             <div className="absolute -right-8 -bottom-8 text-8xl opacity-5 group-hover:scale-110 transition-transform duration-700">💡</div>
//                             <h3 className="text-purple-400 font-black uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
//                                 <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
//                                 Mentor Insight
//                             </h3>
//                             <p className="text-gray-200 text-lg italic leading-relaxed">
//                                 {lesson.tip}
//                             </p>
//                         </div>
//                     </div>

//                     <div className="space-y-8 sticky top-32">
//                         <div className="bg-[#0c0c0c] border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
//                             <div className="bg-white/5 px-8 py-5 border-b border-white/10 flex justify-between items-center">
//                                 <div className="flex gap-2">
//                                     <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
//                                     <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
//                                     <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
//                                 </div>
//                                 <span className="text-[10px] font-mono text-gray-500 font-bold tracking-[0.3em] uppercase">interpreter_v1.py</span>
//                             </div>
//                             <div className="p-10 font-mono text-lg leading-relaxed bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent">
//                                 <pre className="text-blue-200"><code>{lesson.code}</code></pre>
//                             </div>
//                         </div>

//                         <div className="bg-[#111] p-8 rounded-[2.5rem] border border-white/5 flex flex-col items-center">
//                             <p className="text-gray-500 text-sm mb-6 text-center">
//                                 {isCompleted ? "You've mastered this! Want to reset your progress?" : "Ready to commit this to your progress?"}
//                             </p>
                            
//                             <div className="flex flex-col w-full gap-4">
//                                 <button 
//                                     onClick={handleToggleComplete}
//                                     disabled={loading}
//                                     className={`w-full p-5 rounded-2xl font-black text-xl transition-all duration-300 shadow-xl flex justify-center items-center gap-3 active:scale-95 ${
//                                         isCompleted 
//                                         ? 'bg-red-500/10 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white shadow-red-900/10' 
//                                         : 'bg-white text-black hover:bg-blue-500 hover:text-white shadow-white/5'
//                                     }`}
//                                 >
//                                     {loading ? (
//                                         <span className="flex items-center gap-2">
//                                             <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24">
//                                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
//                                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                             </svg>
//                                             SYNCING...
//                                         </span>
//                                     ) : isCompleted ? "UNDO COMPLETION" : "MARK AS COMPLETE →"}
//                                 </button>
                                
//                                 {isCompleted && (
//                                     <button 
//                                         onClick={() => router.push('/dashboard')}
//                                         className="w-full bg-white/5 text-white p-5 rounded-2xl font-black text-xl hover:bg-white/10 transition-all border border-white/5"
//                                     >
//                                         RETURN TO DASHBOARD
//                                     </button>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// }

'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import Link from 'next/link';
import { api } from '@/lib/api'; // Integrated with your working API helper

/** * TYPES */
interface User {
  email: string;
  name?: string;
}

interface ExecuteResponse {
  success: boolean;
  output: string;
  error: string;
}

interface ChatResponse {
  reply: string;
}

// RESTORED FULL CONTENT
const LESSON_DATA: Record<string, { title: string, content: string, code: string, tip: string, module: string }> = {
    "variables-data-types": {
        module: "01",
        title: "Variables and Data Types",
        content: "Variables are the foundation of any program. In Python, variables are created the moment you assign a value to them. Python is dynamically typed, meaning you don't need to declare whether a variable is a string or an integer; the interpreter figures it out automatically. The basic types include Integers (whole numbers), Floats (decimals), Strings (text), and Booleans (True/False).",
        code: "# Variable Assignment\nname = 'LearnFlow'\nversion = 3.10\nis_active = True\n\n# Dynamic Re-assignment\nscore = 10\nscore = 'Ten' # This is perfectly legal in Python",
        tip: "Use snake_case for variable names (e.g., user_score) to follow Python's PEP 8 style guide."
    },
    "control-flow": {
        module: "02",
        title: "Control Flow (if/elif/else)",
        content: "Control flow allows your program to execute code blocks only when specific conditions are met. Python uses indentation (4 spaces) instead of curly braces to define scope. The 'if' statement evaluates a condition, 'elif' (short for else-if) checks subsequent conditions, and 'else' catches everything else.",
        code: "temperature = 25\n\nif temperature > 30:\n    print('It is hot!')\nelif temperature > 20:\n    print('It is pleasant.')\nelse:\n    print('It is cold.')",
        tip: "In Python, any non-zero number or non-empty string evaluates to 'True' in a boolean context."
    },
    "loops": {
        module: "03",
        title: "Loops (for/while)",
        content: "Loops are used to iterate over a sequence (like a list) or repeat a task until a condition changes. A 'for' loop is used for iterating over items, while a 'while' loop executes as long as a condition remains True. Be careful with 'while' loops to avoid infinite loops!",
        code: "# For Loop\nfor i in range(5):\n    print(f'Iteration {i}')\n\n# While Loop\ncount = 0\nwhile count < 3:\n    print('Counting...')\n    count += 1",
        tip: "Use the 'enumerate()' function in for loops to get both the index and the value at the same time."
    },
    "lists-tuples": {
        module: "04",
        title: "Lists and Tuples",
        content: "Lists and Tuples are used to store multiple items in a single variable. Lists are mutable (you can change them), while Tuples are immutable (they cannot be changed after creation). This makes Tuples faster and safer for data that should never change.",
        code: "my_list = ['Python', 'JS', 'C++']\nmy_list[1] = 'TypeScript' # Allowed\n\nmy_tuple = (10, 20, 30)\n# my_tuple[0] = 5 # This would cause an Error",
        tip: "Use Lists for collections of data that need to grow; use Tuples for fixed sets of constants."
    },
    "dictionaries-sets": {
        module: "05",
        title: "Dictionaries and Sets",
        content: "Dictionaries store data in Key:Value pairs, making them incredibly fast for looking up information. Sets are unordered collections of unique elements; they are perfect for removing duplicates from a list or performing mathematical set operations.",
        code: "user = {\n    'name': 'Dev',\n    'level': 5\n}\n\n# Sets automatically remove duplicates\nunique_ids = {1, 2, 2, 3} # Result: {1, 2, 3}",
        tip: "Keys in a dictionary must be immutable types, like strings, numbers, or tuples."
    },
    "functions": {
        module: "06",
        title: "Functions",
        content: "Functions are blocks of reusable code that perform a specific action. They help break large programs into smaller, manageable pieces. You define a function using the 'def' keyword and call it using its name followed by parentheses.",
        code: "def greet(name='Student'):\n    return f'Hello, {name}!'\n\nmessage = greet('Alice')\nprint(message)",
        tip: "Always include a 'docstring' (a triple-quoted string) at the start of your function to explain what it does."
    },
    "oop": {
        module: "07",
        title: "Object-Oriented Programming",
        content: "OOP is a paradigm based on 'objects' which contain data (attributes) and code (methods). Classes act as blueprints for these objects. This allows for powerful concepts like Inheritance, where one class takes features from another.",
        code: "class Robot:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        print(f'{self.name} says Beep!')\n\nbot = Robot('Flow')\nbot.speak()",
        tip: "The 'self' parameter is a reference to the current instance of the class and is used to access variables belonging to the class."
    },
    "file-handling": {
        module: "08",
        title: "File Handling",
        content: "Python can create, read, update, and delete files. Using the 'with' statement is the best practice because it automatically closes the file for you, preventing memory leaks and data corruption.",
        code: "# Writing to a file\n# (Simulated in browser editor)\nprint('Simulating file write...')\nprint('Python is amazing!')",
        tip: "Always use 'a' (append) mode instead of 'w' (write) if you want to add text without deleting what's already there."
    },
    "error-handling": {
        module: "09",
        title: "Error Handling",
        content: "Even the best code can crash. Error handling (try/except) allows your program to catch errors gracefully rather than stopping entirely. You can use 'finally' to run code regardless of whether an error occurred.",
        code: "try:\n    number = 10 / 0\nexcept ZeroDivisionError:\n    print('Cannot divide by zero!')\nfinally:\n    print('Cleaning up...')",
        tip: "Avoid using a bare 'except:'—always specify the error type you are expecting to catch."
    },
    "modules-packages": {
        module: "10",
        title: "Modules and Packages",
        content: "Modules are just Python files containing code. Packages are directories of modules. This structure allows you to use pre-written code from the Python Standard Library or third-party libraries using 'pip'.",
        code: "import math\nprint(math.sqrt(16))\n\nfrom datetime import datetime\nprint(datetime.now())",
        tip: "Use 'import module as m' to give a module a shorter alias for cleaner code."
    }
};

export default function LessonPage() {
    const { slug } = useParams();
    const router = useRouter();
    const lesson = LESSON_DATA[slug as string] || LESSON_DATA["variables-data-types"];

    const [user, setUser] = useState<User | null>(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [code, setCode] = useState(lesson.code);
    const [output, setOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    
    // Chat states
    const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
        { role: 'assistant', content: `Hello! Module ${lesson.module} is active. How can I help?` }
    ]);
    const [input, setInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('user');
        if (!saved) { router.push('/login'); return; }
        const parsed = JSON.parse(saved);
        setUser(parsed);

        // Fetch completion status
        fetch(`/api/progress?email=${parsed.email}`)
            .then(res => res.json())
            .then(data => setIsCompleted(data.includes(lesson.title)))
            .catch(console.error);
    }, [lesson.title, router]);

    // CODE RUNNER via your api library
    const handleRunCode = async () => {
        if (!user) return;
        setIsRunning(true);
        setOutput("Running...");
        try {
            const response = (await api.executeCode(code, user.email)) as ExecuteResponse;
            if (response.success) {
                setOutput(response.output);
            } else {
                setOutput(`Error: ${response.error}`);
            }
        } catch (err) {
            setOutput("Execution failed. Ensure the backend runner is online.");
        } finally { setIsRunning(false); }
    };

    // CHATBOT via your api library
    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !user || isThinking) return;

        const userMsg = { role: 'user' as const, content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsThinking(true);

        try {
            const response = (await api.chat(user.email, input)) as ChatResponse;
            setMessages(prev => [...prev, { role: 'assistant', content: response.reply }]);
        } catch (err) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Tutor is currently offline." }]);
        } finally { setIsThinking(false); }
    };

    const handleToggleComplete = async () => {
        if (!user) return;
        const res = await fetch("/api/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email, topic: lesson.title, action: isCompleted ? 'undo' : 'complete' }),
        });
        if (res.ok) {
            setIsCompleted(!isCompleted);
            if (!isCompleted) router.push('/dashboard');
        }
    };

    if (!user) return null;

    return (
        <div className="flex flex-col h-screen bg-[#050505] text-white overflow-hidden font-sans">
            <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-black/50 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest">← DASHBOARD</Link>
                    <div className="h-4 w-[1px] bg-white/20" />
                    <h1 className="text-sm font-black text-blue-400 uppercase tracking-tighter">{lesson.title}</h1>
                </div>
                <button onClick={handleToggleComplete} className={`px-4 py-2 rounded-lg text-[10px] font-black transition-all ${isCompleted ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-white text-black'}`}>
                    {isCompleted ? 'UNDO PROGRESS' : 'COMPLETE LESSON'}
                </button>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* INSTRUCTIONS & CHAT */}
                <div className="w-1/3 flex flex-col border-r border-white/10 bg-[#080808]">
                    <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
                        <section>
                            <h3 className="text-[10px] font-black text-blue-500 tracking-[0.3em] uppercase mb-4">Study Module</h3>
                            <p className="text-gray-400 leading-relaxed text-sm font-medium">{lesson.content}</p>
                            <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                                <h4 className="text-[9px] font-bold text-blue-400 uppercase mb-1 tracking-widest">Pro Tip</h4>
                                <p className="text-xs text-gray-300 italic">{lesson.tip}</p>
                            </div>
                        </section>

                        <section className="bg-white/[0.03] border border-white/5 rounded-2xl flex flex-col h-[400px]">
                            <div className="p-3 border-b border-white/5 flex justify-between bg-white/5 items-center">
                                <span className="text-[9px] font-black text-gray-500 tracking-widest uppercase">AI Tutor</span>
                                <div className={`w-2 h-2 rounded-full ${isThinking ? 'bg-blue-500 animate-pulse' : 'bg-green-500'}`} />
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-[11px] scrollbar-hide">
                                {messages.map((m, i) => (
                                    <div key={i} className={`flex flex-col ${m.role === 'assistant' ? 'items-start' : 'items-end'}`}>
                                        <div className={`p-3 rounded-xl max-w-[90%] ${m.role === 'assistant' ? 'bg-blue-600/10 text-blue-100' : 'bg-purple-600 text-white'}`}>
                                            {m.content}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <form onSubmit={handleSendMessage} className="p-3 border-t border-white/5">
                                <input 
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Message tutor..." 
                                    className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-[11px] outline-none focus:border-blue-500"
                                />
                            </form>
                        </section>
                    </div>
                </div>

                {/* EDITOR & OUTPUT */}
                <div className="flex-1 flex flex-col bg-[#0a0a0a]">
                    <div className="flex-1 relative">
                        <Editor
                            height="100%"
                            defaultLanguage="python"
                            theme="vs-dark"
                            value={code}
                            onChange={(val) => setCode(val || "")}
                            options={{ fontSize: 15, minimap: { enabled: false }, padding: { top: 20 } }}
                        />
                    </div>
                    <div className="h-64 border-t border-white/10 bg-[#050505] flex flex-col">
                        <div className="px-6 py-3 flex justify-between items-center bg-white/5">
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">System Console</span>
                            <button onClick={handleRunCode} disabled={isRunning} className="bg-green-600 hover:bg-green-500 text-white px-6 py-1.5 rounded-md text-[10px] font-black tracking-widest active:scale-95 transition-all">
                                {isRunning ? "RUNNING..." : "RUN CODE ▶"}
                            </button>
                        </div>
                        <div className="flex-1 p-6 font-mono text-xs overflow-y-auto bg-black/40">
                            <pre className={`${output.toLowerCase().includes('error') ? 'text-red-400' : 'text-green-400'}`}>
                                {output || "> Ready to execute..."}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}