'use client';

import React from 'react';
import { BookOpen, CheckCircle, Globe, CreditCard } from 'lucide-react';
import MetricCard from '@/components/dashboard/MetricCard';
import { useAuth } from '@/hooks/useAuth';
import { useApi } from '@/hooks/useApi';
import type { DashboardStats } from '@/types';

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const { data: stats, loading } = useApi<DashboardStats>('/api/student/dashboard');

  const firstName = user?.firstName ?? 'Student';

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {firstName}! 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Here&apos;s a summary of your progress.
        </p>
      </div>

      {/* Metric Cards */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 bg-white rounded-xl border border-gray-200 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Total Lessons"
            value={stats?.totalLessons ?? 0}
            icon={<BookOpen size={20} />}
            color="indigo"
          />
          <MetricCard
            label="Completed Lessons"
            value={stats?.completedLessons ?? 0}
            icon={<CheckCircle size={20} />}
            color="green"
          />
          <MetricCard
            label="IP Request Status"
            value={stats?.ipRequestStatus ?? 'None'}
            icon={<Globe size={20} />}
            color="blue"
          />
          <MetricCard
            label="Pending Payments"
            value={stats?.pendingPayments ?? 0}
            icon={<CreditCard size={20} />}
            color="yellow"
          />
        </div>
      )}

      {/* Quick Links */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Quick Access</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'View Lessons', href: '/student/lessons', color: 'bg-indigo-50 text-indigo-700' },
            { label: 'Register IP', href: '/student/ip-registration', color: 'bg-blue-50 text-blue-700' },
            { label: 'Database Credentials', href: '/student/database', color: 'bg-green-50 text-green-700' },
            { label: 'Make Payment', href: '/student/payments', color: 'bg-yellow-50 text-yellow-700' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`${link.color} px-4 py-3 rounded-lg text-sm font-medium text-center hover:opacity-90 transition-opacity`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
