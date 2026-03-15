'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Layers,
  BookOpen,
  Globe,
  CreditCard,
  FileText,
  MessageSquare,
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useAuth } from '@/hooks/useAuth';

const navItems = [
  { label: 'Dashboard',    href: '/admin',                icon: <LayoutDashboard size={18} /> },
  { label: 'Students',     href: '/admin/students',       icon: <Users size={18} /> },
  { label: 'Batches',      href: '/admin/batches',        icon: <Layers size={18} /> },
  { label: 'Lessons',      href: '/admin/lessons',        icon: <BookOpen size={18} /> },
  { label: 'IP Requests',  href: '/admin/ip-requests',    icon: <Globe size={18} /> },
  { label: 'Payments',     href: '/admin/payments',       icon: <CreditCard size={18} /> },
  { label: 'Agreements',   href: '/admin/agreements',     icon: <FileText size={18} /> },
  { label: 'Messages',     href: '/admin/messages',       icon: <MessageSquare size={18} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const firstName = user?.firstName ?? 'Admin';
  const lastName  = user?.lastName  ?? '';

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar title="Admin Portal" subtitle="Tech2High" navItems={navItems} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          firstName={firstName}
          lastName={lastName}
          role="admin"
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
