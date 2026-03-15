'use client';

import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import Badge, { statusToBadgeVariant } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import type { Agreement } from '@/types';

export default function StudentAgreementsPage() {
  const { data: agreements, loading, error } = useApi<Agreement[]>('/api/student/agreements');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Agreements</h1>
        <p className="text-gray-500 text-sm mt-1">
          Your enrollment and legal agreements
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
        <p>
          Agreements are sent by your admin and signed electronically via{' '}
          <strong>BoldSign</strong>. Click &quot;Sign Now&quot; on any pending agreement to
          complete the signing process.
        </p>
      </div>

      {loading && (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 bg-white rounded-xl border border-gray-200 animate-pulse" />
          ))}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      {!loading && agreements && agreements.length === 0 && (
        <div className="text-center py-16 text-gray-400 text-sm">
          No agreements have been sent to you yet.
        </div>
      )}

      {!loading && agreements && agreements.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100">
          {agreements.map((ag) => (
            <div key={ag.id} className="px-6 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 bg-indigo-50 rounded-lg flex-shrink-0">
                  <FileText size={18} className="text-indigo-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{ag.title}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-gray-400 capitalize">{ag.type}</span>
                    {ag.sentAt && (
                      <span className="text-xs text-gray-400">Sent {formatDate(ag.sentAt)}</span>
                    )}
                    {ag.signedAt && (
                      <span className="text-xs text-green-600">Signed {formatDate(ag.signedAt)}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Badge variant={statusToBadgeVariant(ag.status)}>
                  {ag.status.charAt(0).toUpperCase() + ag.status.slice(1)}
                </Badge>
                {(ag.status === 'sent' || ag.status === 'pending') && ag.boldSignDocumentId && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() =>
                      window.open(
                        `https://app.boldsign.com/document/sign?id=${ag.boldSignDocumentId}`,
                        '_blank'
                      )
                    }
                  >
                    <ExternalLink size={14} />
                    Sign Now
                  </Button>
                )}
                {ag.status === 'signed' && (
                  <Button variant="ghost" size="sm">
                    <ExternalLink size={14} />
                    View
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
