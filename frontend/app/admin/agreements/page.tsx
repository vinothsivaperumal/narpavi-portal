'use client';

import React, { useState } from 'react';
import { Send, ExternalLink } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import api from '@/lib/api';
import Button from '@/components/ui/Button';
import Badge, { statusToBadgeVariant } from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import { formatDate } from '@/lib/utils';
import type { Agreement } from '@/types';

interface SendForm {
  studentId: string;
  title: string;
  type: string;
}

const emptyForm: SendForm = { studentId: '', title: '', type: 'enrollment' };

export default function AdminAgreementsPage() {
  const { data: agreements, loading, error, refetch } = useApi<Agreement[]>('/api/admin/agreements');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm]           = useState<SendForm>(emptyForm);
  const [saving, setSaving]       = useState(false);

  const handleSend = async () => {
    setSaving(true);
    try {
      await api.post('/api/admin/agreements', form);
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
          <h1 className="text-2xl font-bold text-gray-900">Agreements</h1>
          <p className="text-gray-500 text-sm mt-1">Send and manage student agreements via BoldSign</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => { setForm(emptyForm); setModalOpen(true); }}>
          <Send size={16} />
          Send Agreement
        </Button>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-sm text-purple-700">
        Agreements are sent via <strong>BoldSign</strong>. Students receive an email with a signing link.
        Signing status is tracked in real-time via webhook.
      </div>

      {loading && <div className="h-64 bg-white rounded-xl border border-gray-200 animate-pulse" />}
      {error && <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>}

      {!loading && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {['Student', 'Agreement', 'Type', 'Sent', 'Signed', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {!agreements || agreements.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-gray-400">No agreements yet.</td>
                  </tr>
                ) : (
                  agreements.map((ag) => (
                    <tr key={ag.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{ag.studentName ?? '—'}</p>
                        <p className="text-xs text-gray-400">{ag.studentEmail}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{ag.title}</td>
                      <td className="px-4 py-3 capitalize text-gray-500">{ag.type}</td>
                      <td className="px-4 py-3 text-gray-500">{ag.sentAt ? formatDate(ag.sentAt) : '—'}</td>
                      <td className="px-4 py-3 text-gray-500">{ag.signedAt ? formatDate(ag.signedAt) : '—'}</td>
                      <td className="px-4 py-3">
                        <Badge variant={statusToBadgeVariant(ag.status)}>
                          {ag.status.charAt(0).toUpperCase() + ag.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        {ag.boldSignDocumentId && (
                          <button
                            onClick={() => window.open(`https://app.boldsign.com/document/${ag.boldSignDocumentId}`, '_blank')}
                            className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                          >
                            <ExternalLink size={15} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Send Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Send Agreement">
        <div className="space-y-4">
          <Input
            label="Student ID"
            value={form.studentId}
            onChange={(e) => setForm((f) => ({ ...f, studentId: e.target.value }))}
            helperText="Enter the student's ID"
          />
          <Input
            label="Agreement Title"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="e.g. Enrollment Agreement 2024"
          />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="enrollment">Enrollment Agreement</option>
              <option value="terms">Terms &amp; Conditions</option>
              <option value="nda">NDA</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" loading={saving} onClick={handleSend}>
              <Send size={14} />
              Send via BoldSign
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
