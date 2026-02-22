import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 overflow-hidden">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                LinguaLift-AI
              </span>
            </div>
            <div className="hidden md:flex space-x-8 text-slate-600 font-medium">
              <a href="#features" className="hover:text-primary transition-colors">Features</a>
              <a href="#about" className="hover:text-primary transition-colors">About</a>
              <Link href="/train" className="px-5 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-all transform hover:scale-105 shadow-md">
                Start Practicing
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-primary uppercase bg-primary/10 rounded-full">
            The Future of Language Learning
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 mb-6 leading-tight">
            Master English with Your <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-secondary">
              Personal AI Voice Coach
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-10">
            Real-time conversations, instant grammar corrections, and natural feedback. 
            Speak your way to fluency with LinguaLift's advanced AI companion.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/train" className="px-8 py-4 bg-primary text-white rounded-2xl text-lg font-bold hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 flex items-center justify-center">
              Start Free Session 
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </Link>
            <button className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl text-lg font-bold hover:border-primary transition-all shadow-sm">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/4 right-0 -z-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Why LinguaLift AI?</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Real-time Voice",
                desc: "Natural, flowing conversations that feel like talking to a real teacher.",
                icon: "🎙️",
                color: "bg-blue-50"
              },
              {
                title: "Instant Correction",
                desc: "Get polite, detailed feedback on grammar and vocabulary as you speak.",
                icon: "✍️",
                color: "bg-green-50"
              },
              {
                title: "Smart Difficulty",
                desc: "AI adjusts to your level (Beginner to Advanced) in real-time.",
                icon: "📈",
                color: "bg-purple-50"
              }
            ].map((f, i) => (
              <div key={i} className={`p-8 rounded-3xl ${f.color} border border-slate-100 transition-transform hover:-translate-y-2`}>
                <div className="text-4xl mb-6">{f.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-slate-400 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center border-t border-slate-800 pt-12">
          <div className="mb-8 md:mb-0">
             <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                LinguaLift-AI
              </span>
              <p className="mt-2 text-sm">Empowering your voice globally.</p>
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
