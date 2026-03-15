'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Database,
  Globe,
  MessageSquare,
  CreditCard,
  FileText,
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useAuth } from '@/hooks/useAuth';

const navItems = [
  { label: 'Dashboard',        href: '/student',                icon: <LayoutDashboard size={18} /> },
  { label: 'Lessons',          href: '/student/lessons',        icon: <BookOpen size={18} /> },
  { label: 'Database Access',  href: '/student/database',       icon: <Database size={18} /> },
  { label: 'IP Registration',  href: '/student/ip-registration',icon: <Globe size={18} /> },
  { label: 'Messages',         href: '/student/messages',       icon: <MessageSquare size={18} /> },
  { label: 'Payments',         href: '/student/payments',       icon: <CreditCard size={18} /> },
  { label: 'Agreements',       href: '/student/agreements',     icon: <FileText size={18} /> },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const firstName = user?.firstName ?? '';
  const lastName  = user?.lastName  ?? '';

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        title="Tech2High"
        subtitle={`${firstName} ${lastName}`.trim() || 'Student'}
        navItems={navItems}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          firstName={firstName}
          lastName={lastName}
          role="student"
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
