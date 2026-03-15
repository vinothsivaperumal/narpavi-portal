import Head from 'next/head';
import Link from 'next/link';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Students', value: '48', icon: '👥' },
    { label: 'Active Batches', value: '3', icon: '📚' },
    { label: 'Pending IP Requests', value: '7', icon: '🔒' },
    { label: 'Revenue This Month', value: '$12,400', icon: '💳' },
  ];

  const recentActivity = [
    { text: 'New student registered: Jane Smith', time: '2 hours ago' },
    { text: 'IP request approved for John Doe', time: '3 hours ago' },
    { text: 'Batch 3 enrollment completed', time: '5 hours ago' },
    { text: 'Payment received from Alex Johnson', time: '1 day ago' },
  ];

  return (
    <>
      <Head>
        <title>Admin Dashboard - Tech2High Bootcamp Portal</title>
      </Head>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary-700">Tech2High Admin</h1>
          <div className="flex items-center gap-4">
            <Link href="/messages" className="text-gray-600 hover:text-primary-600 text-sm">Messages</Link>
            <Link href="/" className="text-sm text-red-600 hover:underline">Logout</Link>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="card">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/users" className="btn-secondary text-center text-sm">Manage Students</Link>
                <Link href="/lessons" className="btn-secondary text-center text-sm">Manage Lessons</Link>
                <Link href="/ip" className="btn-secondary text-center text-sm">IP Requests</Link>
                <Link href="/payments" className="btn-secondary text-center text-sm">View Payments</Link>
                <Link href="/agreements" className="btn-secondary text-center text-sm">Agreements</Link>
                <Link href="/messages" className="btn-secondary text-center text-sm">Messages</Link>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <ul className="space-y-3">
                {recentActivity.map((item, i) => (
                  <li key={i} className="text-sm">
                    <p className="text-gray-700">{item.text}</p>
                    <p className="text-gray-400 text-xs">{item.time}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
