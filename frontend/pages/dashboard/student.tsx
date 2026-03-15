import Head from 'next/head';
import Link from 'next/link';

export default function StudentDashboard() {
  const progress = [
    { module: 'Introduction to Data Analysis', progress: 100, status: 'Completed' },
    { module: 'Python for Data Science', progress: 75, status: 'In Progress' },
    { module: 'SQL & Database Management', progress: 40, status: 'In Progress' },
    { module: 'Machine Learning Basics', progress: 0, status: 'Upcoming' },
  ];

  return (
    <>
      <Head>
        <title>Student Dashboard - Tech2High Bootcamp Portal</title>
      </Head>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary-700">Tech2High Portal</h1>
          <div className="flex items-center gap-4">
            <Link href="/messages" className="text-gray-600 hover:text-primary-600 text-sm">Messages</Link>
            <Link href="/" className="text-sm text-red-600 hover:underline">Logout</Link>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, Student!</h2>
          <p className="text-gray-500 mb-8">Batch 3 · Data Analysis Bootcamp</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="card mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
                <div className="space-y-4">
                  {progress.map((item) => (
                    <div key={item.module}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700 font-medium">{item.module}</span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          item.status === 'Completed' ? 'bg-green-100 text-green-700' :
                          item.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-500'
                        }`}>{item.status}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full transition-all"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/lessons" className="btn-secondary text-center text-sm">View Lessons</Link>
                  <Link href="/ip" className="btn-secondary text-center text-sm">Manage IP Access</Link>
                  <Link href="/payments" className="btn-secondary text-center text-sm">My Payments</Link>
                  <Link href="/agreements" className="btn-secondary text-center text-sm">Agreements</Link>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Next Lesson</h3>
                <p className="text-primary-600 font-medium text-sm">Python for Data Science</p>
                <p className="text-gray-500 text-xs mt-1">Module 4: Data Visualization</p>
                <Link href="/lessons" className="btn-primary text-sm mt-4 inline-block w-full text-center">
                  Continue Learning
                </Link>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Status</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Balance Due</span>
                  <span className="font-bold text-red-600">$500</span>
                </div>
                <Link href="/payments" className="btn-secondary text-sm mt-3 inline-block w-full text-center">
                  Make Payment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
