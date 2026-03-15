import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function IpManagementPage() {
  const [ipAddress, setIpAddress] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const requests = [
    { ip: '192.168.1.100', status: 'Approved', date: '2024-01-10' },
    { ip: '10.0.0.55', status: 'Pending', date: '2024-01-12' },
    { ip: '203.0.113.42', status: 'Rejected', date: '2024-01-08' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setIpAddress('');
    setDescription('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <Head>
        <title>IP Management - Tech2High Bootcamp Portal</title>
      </Head>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard/student" className="text-xl font-bold text-primary-700">Tech2High Portal</Link>
          <Link href="/dashboard/student" className="text-sm text-gray-600 hover:text-primary-600">← Dashboard</Link>
        </nav>

        <div className="max-w-3xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">IP Whitelist Management</h2>

          <div className="card mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Request IP Whitelist</h3>
            {submitted && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm">
                IP whitelist request submitted successfully!
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">IP Address</label>
                <input
                  type="text"
                  value={ipAddress}
                  onChange={(e) => setIpAddress(e.target.value)}
                  placeholder="e.g. 192.168.1.100"
                  required
                  className="mt-1 input-field border px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description (optional)</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Home office IP"
                  className="mt-1 input-field border px-3 py-2"
                />
              </div>
              <button type="submit" className="btn-primary">Submit Request</button>
            </form>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">My IP Requests</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-2">IP Address</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {requests.map((r, i) => (
                    <tr key={i}>
                      <td className="py-2 font-mono">{r.ip}</td>
                      <td className="py-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          r.status === 'Approved' ? 'bg-green-100 text-green-700' :
                          r.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>{r.status}</span>
                      </td>
                      <td className="py-2 text-gray-500">{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
