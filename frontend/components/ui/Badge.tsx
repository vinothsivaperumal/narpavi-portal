import React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger:  'bg-red-100 text-red-800',
  info:    'bg-blue-100 text-blue-800',
  default: 'bg-gray-100 text-gray-700',
};

export function statusToBadgeVariant(
  status: string
): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    active: 'success',
    approved: 'success',
    paid: 'success',
    signed: 'success',
    completed: 'success',
    graduated: 'success',
    pending: 'warning',
    sent: 'info',
    upcoming: 'info',
    overdue: 'danger',
    rejected: 'danger',
    failed: 'danger',
    cancelled: 'danger',
    declined: 'danger',
    inactive: 'default',
  };
  return map[status.toLowerCase()] ?? 'default';
}

export default function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
