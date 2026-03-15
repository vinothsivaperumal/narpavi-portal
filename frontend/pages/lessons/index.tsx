import Head from 'next/head';
import Link from 'next/link';

const lessons = [
  { id: '1', title: 'Introduction to Data Analysis', description: 'Foundations of data analysis, types of data, and key tools.', duration: '2h 30m', order: 1 },
  { id: '2', title: 'Python for Data Science', description: 'Core Python programming for data manipulation and analysis.', duration: '5h 00m', order: 2 },
  { id: '3', title: 'SQL & Database Management', description: 'Writing SQL queries and managing relational databases.', duration: '4h 00m', order: 3 },
  { id: '4', title: 'Data Visualization with Tableau', description: 'Creating compelling dashboards and visual stories.', duration: '3h 30m', order: 4 },
  { id: '5', title: 'Machine Learning Basics', description: 'Introduction to supervised and unsupervised learning.', duration: '6h 00m', order: 5 },
];

export default function LessonsPage() {
  return (
    <>
      <Head>
        <title>Lessons - Tech2High Bootcamp Portal</title>
      </Head>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard/student" className="text-xl font-bold text-primary-700">Tech2High Portal</Link>
          <Link href="/dashboard/student" className="text-sm text-gray-600 hover:text-primary-600">← Dashboard</Link>
        </nav>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Lessons</h2>
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="card hover:shadow-md transition-shadow flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold flex-shrink-0">
                  {lesson.order}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{lesson.description}</p>
                  <p className="text-xs text-gray-400 mt-1">Duration: {lesson.duration}</p>
                </div>
                <button className="btn-primary text-sm self-center">Start</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
