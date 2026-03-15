import React from 'react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: { value: number; label: string };
  color?: 'indigo' | 'green' | 'yellow' | 'red' | 'blue';
  className?: string;
}

const colorMap = {
  indigo: 'bg-indigo-50 text-indigo-600',
  green:  'bg-green-50 text-green-600',
  yellow: 'bg-yellow-50 text-yellow-600',
  red:    'bg-red-50 text-red-600',
  blue:   'bg-blue-50 text-blue-600',
};

export default function MetricCard({
  label,
  value,
  icon,
  trend,
  color = 'indigo',
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex items-start gap-4',
        className
      )}
    >
      <div className={cn('p-3 rounded-xl flex-shrink-0', colorMap[color])}>{icon}</div>
      <div className="min-w-0">
        <p className="text-sm text-gray-500 truncate">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
        {trend && (
          <p
            className={cn(
              'text-xs mt-1',
              trend.value >= 0 ? 'text-green-600' : 'text-red-600'
            )}
          >
            {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}% {trend.label}
          </p>
        )}
      </div>
    </div>
  );
}
