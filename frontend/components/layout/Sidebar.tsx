'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  title: string;
  subtitle?: string;
  navItems: NavItem[];
  footer?: React.ReactNode;
}

export default function Sidebar({ title, subtitle, navItems, footer }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'flex flex-col h-screen bg-indigo-950 text-white transition-all duration-300 flex-shrink-0',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-indigo-800">
        {!collapsed && (
          <div className="min-w-0">
            <p className="font-bold text-sm truncate">{title}</p>
            {subtitle && <p className="text-indigo-300 text-xs truncate">{subtitle}</p>}
          </div>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="ml-auto rounded-lg p-1 text-indigo-300 hover:text-white hover:bg-indigo-800 transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-2">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                active
                  ? 'bg-indigo-700 text-white'
                  : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
              )}
              title={collapsed ? item.label : undefined}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {footer && !collapsed && (
        <div className="border-t border-indigo-800 px-4 py-4">{footer}</div>
      )}
    </aside>
  );
}
