'use client';

import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import api from '@/lib/api';
import Badge, { statusToBadgeVariant } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { formatDate } from '@/lib/utils';
import type { IpRequest } from '@/types';

export default function AdminIpRequestsPage() {
  const { data: requests, loading, error, refetch } = useApi<IpRequest[]>('/api/admin/ip-requests');
  const [processing, setProcessing] = useState<string | null>(null);
  const [rejectTarget, setRejectTarget] = useState<IpRequest | null>(null);
  const [notes, setNotes]               = useState('');
  const [rejecting, setRejecting]       = useState(false);

  const handleApprove = async (req: IpRequest) => {
    setProcessing(req.id);
    try {
      await api.post(`/api/admin/ip-requests/${req.id}/approve`);
      refetch();
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async () => {
    if (!rejectTarget) return;
    setRejecting(true);
    try {
      await api.post(`/api/admin/ip-requests/${rejectTarget.id}/reject`, { notes });
      setRejectTarget(null);
      setNotes('');
      refetch();
    } finally {
      setRejecting(false);
    }
  };

  const pending  = (requests ?? []).filter((r) => r.status === 'pending');
  const reviewed = (requests ?? []).filter((r) => r.status !== 'pending');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">IP Requests</h1>
        <p className="text-gray-500 text-sm mt-1">
          Approve or reject student IP whitelist requests
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
        Approving a request will automatically add the IP to the AWS Security Group via the backend API.
      </div>

      {loading && (
        <div className="h-64 bg-white rounded-xl border border-gray-200 animate-pulse" />
      )}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>
      )}

      {!loading && (
        <>
          {/* Pending */}
          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">
              Pending ({pending.length})
            </h2>
            {pending.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-sm bg-white rounded-xl border border-gray-200">
                No pending requests.
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100">
                {pending.map((req) => (
                  <div key={req.id} className="px-6 py-4 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900">{req.studentName ?? 'Student'}</p>
                      <p className="text-xs text-gray-400">{req.studentEmail}</p>
                      <p className="font-mono text-sm text-indigo-700 mt-1">{req.ipAddress}</p>
                      <p className="text-xs text-gray-400">Submitted {formatDate(req.submittedAt)}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        variant="primary"
                        size="sm"
                        loading={processing === req.id}
                        onClick={() => handleApprove(req)}
                      >
                        <CheckCircle size={14} />
                        Approve
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => { setRejectTarget(req); setNotes(''); }}
                      >
                        <XCircle size={14} />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Reviewed */}
          {reviewed.length > 0 && (
            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-3">History</h2>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        {['Student', 'IP Address', 'Status', 'Date'].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {reviewed.map((req) => (
                        <tr key={req.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <p className="font-medium text-gray-900">{req.studentName ?? '—'}</p>
                            <p className="text-xs text-gray-400">{req.studentEmail}</p>
                          </td>
                          <td className="px-4 py-3 font-mono text-gray-700">{req.ipAddress}</td>
                          <td className="px-4 py-3">
                            <Badge variant={statusToBadgeVariant(req.status)}>
                              {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-gray-500">{formatDate(req.reviewedAt ?? req.submittedAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Reject Modal */}
      <Modal open={!!rejectTarget} onClose={() => setRejectTarget(null)} title="Reject IP Request" size="sm">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Rejecting IP <strong className="font-mono">{rejectTarget?.ipAddress}</strong> for {rejectTarget?.studentName}.
          </p>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Notes (optional)</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Reason for rejection…"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setRejectTarget(null)}>Cancel</Button>
            <Button variant="danger" loading={rejecting} onClick={handleReject}>Reject</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
