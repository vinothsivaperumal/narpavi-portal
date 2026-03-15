import Head from 'next/head';
import Link from 'next/link';

export default function AgreementsPage() {
  const agreements = [
    { id: '1', title: 'Enrollment Agreement', status: 'Signed', date: '2024-01-01' },
    { id: '2', title: 'Data Access Policy', status: 'Signed', date: '2024-01-02' },
    { id: '3', title: 'Code of Conduct', status: 'Pending', date: null },
  ];

  return (
    <>
      <Head>
        <title>Agreements - Tech2High Bootcamp Portal</title>
      </Head>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard/student" className="text-xl font-bold text-primary-700">Tech2High Portal</Link>
          <Link href="/dashboard/student" className="text-sm text-gray-600 hover:text-primary-600">← Dashboard</Link>
        </nav>

        <div className="max-w-3xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Legal Agreements</h2>
          <p className="text-gray-500 text-sm mb-6">Review and sign required documents. Powered by BoldSign.</p>

          <div className="space-y-4">
            {agreements.map((agreement) => (
              <div key={agreement.id} className="card flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{agreement.title}</h3>
                  {agreement.date && (
                    <p className="text-gray-400 text-xs mt-1">Signed on {agreement.date}</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    agreement.status === 'Signed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>{agreement.status}</span>
                  {agreement.status === 'Pending' && (
                    <button className="btn-primary text-sm">Sign Now</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
