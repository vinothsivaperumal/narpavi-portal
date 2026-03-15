'use client';

import React from 'react';
import {
  Users,
  Layers,
  Globe,
  CreditCard,
  FileText,
  Activity,
} from 'lucide-react';
import MetricCard from '@/components/dashboard/MetricCard';
import { useApi } from '@/hooks/useApi';
import { formatDate } from '@/lib/utils';
import type { DashboardStats } from '@/types';

interface ActivityItem {
  id: string;
  type: string;
  description: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const { data: stats, loading: loadingStats } = useApi<DashboardStats>('/api/admin/dashboard');
  const { data: activity, loading: loadingActivity } = useApi<ActivityItem[]>('/api/admin/activity');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of your bootcamp</p>
      </div>

      {loadingStats ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-28 bg-white rounded-xl border border-gray-200 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <MetricCard
            label="Total Students"
            value={stats?.totalStudents ?? 0}
            icon={<Users size={20} />}
            color="indigo"
          />
          <MetricCard
            label="Active Batches"
            value={stats?.activeBatches ?? 0}
            icon={<Layers size={20} />}
            color="blue"
          />
          <MetricCard
            label="Pending IP Requests"
            value={stats?.pendingIpRequests ?? 0}
            icon={<Globe size={20} />}
            color="yellow"
          />
          <MetricCard
            label="Pending Payments"
            value={stats?.pendingPayments ?? 0}
            icon={<CreditCard size={20} />}
            color="red"
          />
          <MetricCard
            label="Unsigned Agreements"
            value={stats?.unsignedAgreements ?? 0}
            icon={<FileText size={20} />}
            color="green"
          />
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Activity Feed */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <Activity size={18} className="text-indigo-600" />
            <h2 className="font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {loadingActivity ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="px-6 py-3 h-14 animate-pulse bg-gray-50" />
              ))
            ) : !activity || activity.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-400 text-sm">
                No recent activity.
              </div>
            ) : (
              activity.slice(0, 8).map((item) => (
                <div key={item.id} className="px-6 py-3 flex items-start justify-between gap-3">
                  <p className="text-sm text-gray-700">{item.description}</p>
                  <span className="text-xs text-gray-400 flex-shrink-0">{formatDate(item.createdAt)}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="px-6 py-4 grid grid-cols-2 gap-3">
            {[
              { label: 'Add Student',     href: '/admin/students',    color: 'bg-indigo-50 text-indigo-700' },
              { label: 'Create Batch',    href: '/admin/batches',     color: 'bg-blue-50 text-blue-700' },
              { label: 'Add Lesson',      href: '/admin/lessons',     color: 'bg-green-50 text-green-700' },
              { label: 'Review IP Reqs',  href: '/admin/ip-requests', color: 'bg-yellow-50 text-yellow-700' },
              { label: 'Create Invoice',  href: '/admin/payments',    color: 'bg-red-50 text-red-700' },
              { label: 'Send Agreement',  href: '/admin/agreements',  color: 'bg-purple-50 text-purple-700' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`${link.color} px-3 py-3 rounded-lg text-sm font-medium text-center hover:opacity-90 transition-opacity`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
