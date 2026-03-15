import Head from 'next/head';
import Link from 'next/link';

export default function PaymentsPage() {
  const payments = [
    { id: '1', description: 'Batch 3 - Course Fee', amount: '$1,500', status: 'Completed', date: '2024-01-05' },
    { id: '2', description: 'Batch 3 - Lab Access Fee', amount: '$200', status: 'Completed', date: '2024-01-06' },
    { id: '3', description: 'Batch 3 - Remaining Balance', amount: '$500', status: 'Pending', date: '2024-01-15' },
  ];

  return (
    <>
      <Head>
        <title>Payments - Tech2High Bootcamp Portal</title>
      </Head>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard/student" className="text-xl font-bold text-primary-700">Tech2High Portal</Link>
          <Link href="/dashboard/student" className="text-sm text-gray-600 hover:text-primary-600">← Dashboard</Link>
        </nav>

        <div className="max-w-3xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Payments</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="card text-center">
              <div className="text-2xl font-bold text-gray-900">$2,200</div>
              <div className="text-sm text-gray-500">Total Paid</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-red-600">$500</div>
              <div className="text-sm text-gray-500">Balance Due</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-gray-900">$2,700</div>
              <div className="text-sm text-gray-500">Total Course Fee</div>
            </div>
          </div>

          <div className="card mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-2">Description</th>
                    <th className="pb-2">Amount</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {payments.map((p) => (
                    <tr key={p.id}>
                      <td className="py-2">{p.description}</td>
                      <td className="py-2 font-medium">{p.amount}</td>
                      <td className="py-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          p.status === 'Completed' ? 'bg-green-100 text-green-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>{p.status}</span>
                      </td>
                      <td className="py-2 text-gray-500">{p.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Make a Payment</h3>
            <p className="text-gray-500 text-sm mb-4">Secure payments powered by Square</p>
            <button className="btn-primary">Pay $500 Balance</button>
          </div>
        </div>
      </div>
    </>
  );
}
