import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Tech2High Bootcamp Portal</title>
        <meta name="description" content="Tech2High Data Analysis Bootcamp Portal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-primary-900 to-primary-700">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center text-white mb-16">
            <h1 className="text-5xl font-bold mb-4">Tech2High Bootcamp Portal</h1>
            <p className="text-xl text-primary-200 max-w-2xl mx-auto">
              Your gateway to Data Analysis excellence. Access lessons, track progress,
              manage payments, and collaborate with your cohort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Student Portal</h2>
                <p className="text-gray-600 mb-6">
                  Access your lessons, submit assignments, manage IP whitelisting, and track your progress.
                </p>
                <Link href="/auth/login?role=student" className="btn-primary w-full inline-block">
                  Student Login
                </Link>
              </div>
            </div>

            <div className="card hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Portal</h2>
                <p className="text-gray-600 mb-6">
                  Manage students, course content, batches, payments, and system configurations.
                </p>
                <Link href="/auth/login?role=admin" className="btn-primary w-full inline-block">
                  Admin Login
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center text-white">
              <div className="text-3xl font-bold mb-2">📚</div>
              <h3 className="text-lg font-semibold mb-1">Course Content</h3>
              <p className="text-primary-200 text-sm">Access structured lessons and materials</p>
            </div>
            <div className="text-center text-white">
              <div className="text-3xl font-bold mb-2">🔒</div>
              <h3 className="text-lg font-semibold mb-1">Secure Access</h3>
              <p className="text-primary-200 text-sm">IP-based database access management</p>
            </div>
            <div className="text-center text-white">
              <div className="text-3xl font-bold mb-2">💳</div>
              <h3 className="text-lg font-semibold mb-1">Easy Payments</h3>
              <p className="text-primary-200 text-sm">Seamless course fee settlement</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
