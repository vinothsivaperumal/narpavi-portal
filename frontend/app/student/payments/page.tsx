'use client';

import React from 'react';
import { CreditCard, ExternalLink } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import Badge, { statusToBadgeVariant } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { formatDate, formatCurrency } from '@/lib/utils';
import type { Payment } from '@/types';

export default function StudentPaymentsPage() {
  const { data: payments, loading, error } = useApi<Payment[]>('/api/student/payments');

  const totals = payments?.reduce(
    (acc, p) => ({
      paid: acc.paid + (p.status === 'paid' ? p.amount : 0),
      pending: acc.pending + (p.status === 'pending' || p.status === 'overdue' ? p.amount : 0),
    }),
    { paid: 0, pending: 0 }
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-500 text-sm mt-1">Your invoices and payment history</p>
      </div>

      {/* Summary */}
      {totals && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-sm text-green-700 font-medium">Total Paid</p>
            <p className="text-2xl font-bold text-green-800 mt-1">{formatCurrency(totals.paid)}</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <p className="text-sm text-yellow-700 font-medium">Pending / Overdue</p>
            <p className="text-2xl font-bold text-yellow-800 mt-1">{formatCurrency(totals.pending)}</p>
          </div>
        </div>
      )}

      {loading && (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 bg-white rounded-xl border border-gray-200 animate-pulse" />
          ))}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      {!loading && payments && payments.length === 0 && (
        <div className="text-center py-16 text-gray-400 text-sm">No invoices yet.</div>
      )}

      {!loading && payments && payments.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Invoices</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {payments.map((p) => (
              <div key={p.id} className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{p.description}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-400 font-mono">{p.invoiceNumber}</span>
                    <span className="text-xs text-gray-400">Due {formatDate(p.dueDate)}</span>
                    {p.paidAt && (
                      <span className="text-xs text-gray-400">Paid {formatDate(p.paidAt)}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(p.amount, p.currency)}
                  </span>
                  <Badge variant={statusToBadgeVariant(p.status)}>
                    {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                  </Badge>
                  {(p.status === 'pending' || p.status === 'overdue') && (
                    <Button variant="primary" size="sm">
                      <CreditCard size={14} />
                      Pay
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <ExternalLink size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
