'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import api from '@/lib/api';
import Button from '@/components/ui/Button';
import Badge, { statusToBadgeVariant } from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import { formatDate, formatCurrency } from '@/lib/utils';
import type { Payment } from '@/types';

interface InvoiceForm {
  studentId: string;
  description: string;
  amount: string;
  currency: string;
  dueDate: string;
}

const emptyForm: InvoiceForm = {
  studentId: '', description: '', amount: '', currency: 'USD', dueDate: '',
};

export default function AdminPaymentsPage() {
  const { data: payments, loading, error, refetch } = useApi<Payment[]>('/api/admin/payments');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm]           = useState<InvoiceForm>(emptyForm);
  const [saving, setSaving]       = useState(false);

  const [tab, setTab] = useState<'all' | 'pending' | 'paid' | 'overdue'>('all');

  const filtered = (payments ?? []).filter((p) => tab === 'all' || p.status === tab);

  const totals = payments?.reduce(
    (acc, p) => ({
      total:   acc.total   + p.amount,
      paid:    acc.paid    + (p.status === 'paid'    ? p.amount : 0),
      pending: acc.pending + (p.status === 'pending' ? p.amount : 0),
      overdue: acc.overdue + (p.status === 'overdue' ? p.amount : 0),
    }),
    { total: 0, paid: 0, pending: 0, overdue: 0 }
  );

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.post('/api/admin/payments', { ...form, amount: Number(form.amount) });
      setModalOpen(false);
      setForm(emptyForm);
      refetch();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-500 text-sm mt-1">Manage student invoices</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => { setForm(emptyForm); setModalOpen(true); }}>
          <Plus size={16} />
          Create Invoice
        </Button>
      </div>

      {/* Summary */}
      {totals && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total Invoiced', value: totals.total,   color: 'bg-gray-50 text-gray-800' },
            { label: 'Paid',           value: totals.paid,    color: 'bg-green-50 text-green-800' },
            { label: 'Pending',        value: totals.pending, color: 'bg-yellow-50 text-yellow-800' },
            { label: 'Overdue',        value: totals.overdue, color: 'bg-red-50 text-red-800' },
          ].map((s) => (
            <div key={s.label} className={`${s.color} rounded-xl p-4`}>
              <p className="text-xs font-medium opacity-70">{s.label}</p>
              <p className="text-xl font-bold mt-1">{formatCurrency(s.value)}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-gray-200 gap-1">
        {(['all', 'pending', 'paid', 'overdue'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors capitalize ${
              tab === t ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {loading && <div className="h-64 bg-white rounded-xl border border-gray-200 animate-pulse" />}
      {error && <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>}

      {!loading && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {['Invoice #', 'Student', 'Description', 'Amount', 'Due Date', 'Status'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-gray-400">No invoices found.</td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-xs text-gray-500">{p.invoiceNumber}</td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{p.studentName ?? '—'}</p>
                        <p className="text-xs text-gray-400">{p.studentEmail}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{p.description}</td>
                      <td className="px-4 py-3 font-semibold text-gray-900">{formatCurrency(p.amount, p.currency)}</td>
                      <td className="px-4 py-3 text-gray-500">{formatDate(p.dueDate)}</td>
                      <td className="px-4 py-3">
                        <Badge variant={statusToBadgeVariant(p.status)}>
                          {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                        </Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Invoice Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Create Invoice">
        <div className="space-y-4">
          <Input label="Student ID" value={form.studentId} onChange={(e) => setForm((f) => ({ ...f, studentId: e.target.value }))} />
          <Input label="Description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Amount" type="number" value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))} />
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Currency</label>
              <select
                value={form.currency}
                onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value }))}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>USD</option><option>EUR</option><option>GBP</option><option>INR</option>
              </select>
            </div>
          </div>
          <Input label="Due Date" type="date" value={form.dueDate} onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))} />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" loading={saving} onClick={handleSave}>Create Invoice</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
