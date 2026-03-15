'use client';

import React from 'react';
import { LogOut, Bell } from 'lucide-react';
import { getInitials } from '@/lib/utils';

interface HeaderProps {
  firstName: string;
  lastName: string;
  role?: string;
  onLogout: () => void;
}

export default function Header({ firstName, lastName, role, onLogout }: HeaderProps) {
  const initials = getInitials(firstName || '?', lastName || '?');
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 h-16">
      <div />
      <div className="flex items-center gap-4">
        <button
          className="relative p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Notifications"
        >
          <Bell size={18} />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
            {initials}
          </div>
          <div className="hidden sm:block text-sm">
            <p className="font-medium text-gray-900 leading-none">
              {firstName} {lastName}
            </p>
            {role && <p className="text-gray-400 text-xs capitalize mt-0.5">{role}</p>}
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
