import Link from 'next/link';
import { GraduationCap, ArrowRight, BookOpen, Shield, Database } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-800 text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-xl">
            <GraduationCap size={24} />
          </div>
          <span className="font-bold text-xl tracking-tight">Tech2High</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-indigo-200 hover:text-white transition-colors text-sm font-medium"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="bg-white text-indigo-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition-colors"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-8 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 text-indigo-200 text-sm px-4 py-1.5 rounded-full mb-8">
          <span>🚀</span>
          <span>Launch your tech career today</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Tech2High
          <br />
          <span className="text-indigo-300">Bootcamp Portal</span>
        </h1>
        <p className="text-indigo-200 text-lg max-w-2xl mx-auto mb-10">
          Access your lessons, track your progress, manage database credentials, and stay connected
          with your instructors — all in one place.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-white text-indigo-900 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-colors"
          >
            Get Started <ArrowRight size={18} />
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/20"
          >
            Create Account
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <BookOpen size={24} />,
              title: 'Structured Lessons',
              desc: 'Follow curated video lessons in your batch at your own pace.',
            },
            {
              icon: <Database size={24} />,
              title: 'Database Access',
              desc: 'Secure, IP-whitelisted access to practice databases on AWS.',
            },
            {
              icon: <Shield size={24} />,
              title: 'Secure Platform',
              desc: 'JWT authentication, role-based access, and encrypted data.',
            },
          ].map((f) => (
            <div key={f.title} className="bg-white/10 rounded-2xl p-6 border border-white/10">
              <div className="p-3 bg-white/10 rounded-xl w-fit mb-4">{f.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-indigo-200 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center text-indigo-400 text-sm py-8">
        © {new Date().getFullYear()} Tech2High Bootcamp. All rights reserved.
      </footer>
    </main>
  );
}
