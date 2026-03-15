'use client';

import React from 'react';
import { ExternalLink, CheckCircle2, Circle } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import Button from '@/components/ui/Button';
import type { Lesson } from '@/types';

export default function StudentLessonsPage() {
  const { data: lessons, loading, error } = useApi<Lesson[]>('/api/student/lessons');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Lessons</h1>
        <p className="text-gray-500 text-sm mt-1">Your batch curriculum</p>
      </div>

      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-24 bg-white rounded-xl border border-gray-200 animate-pulse" />
          ))}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      {!loading && !error && (!lessons || lessons.length === 0) && (
        <div className="text-center py-16 text-gray-400">
          No lessons available for your batch yet.
        </div>
      )}

      {!loading && lessons && lessons.length > 0 && (
        <div className="space-y-3">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex items-start gap-4"
            >
              <div className="flex-shrink-0 mt-0.5">
                {lesson.completed ? (
                  <CheckCircle2 size={22} className="text-green-500" />
                ) : (
                  <Circle size={22} className="text-gray-300" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                    Lesson {lesson.order}
                  </span>
                  {lesson.completed && (
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">
                      Completed
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 truncate">{lesson.title}</h3>
                <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">{lesson.description}</p>
              </div>
              <div className="flex-shrink-0">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => window.open(lesson.youtubeUrl, '_blank')}
                  disabled={!lesson.youtubeUrl}
                >
                  <ExternalLink size={14} />
                  Watch
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
