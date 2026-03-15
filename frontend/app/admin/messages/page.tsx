'use client';

import React, { useState } from 'react';
import { Send, Inbox, PenSquare, Users } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import api from '@/lib/api';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import { formatDate } from '@/lib/utils';
import type { Message, Student } from '@/types';

interface ComposeForm {
  recipientId: string;
  subject: string;
  body: string;
}

export default function AdminMessagesPage() {
  const [tab, setTab]             = useState<'inbox' | 'sent'>('inbox');
  const [composing, setComposing] = useState(false);
  const [sending, setSending]     = useState(false);
  const [selected, setSelected]   = useState<Message | null>(null);
  const [form, setForm]           = useState<ComposeForm>({ recipientId: '', subject: '', body: '' });

  const { data: inbox,   loading: loadingInbox,  refetch: refetchInbox }
    = useApi<Message[]>('/api/admin/messages/inbox');
  const { data: sent,    loading: loadingSent }
    = useApi<Message[]>('/api/admin/messages/sent');
  const { data: students } = useApi<Student[]>('/api/admin/students');

  const messages = tab === 'inbox' ? (inbox ?? []) : (sent ?? []);
  const loading  = tab === 'inbox' ? loadingInbox : loadingSent;

  const handleSend = async () => {
    if (!form.recipientId || !form.subject || !form.body) return;
    setSending(true);
    try {
      await api.post('/api/admin/messages', form);
      setComposing(false);
      setForm({ recipientId: '', subject: '', body: '' });
      refetchInbox();
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-500 text-sm mt-1">Communicate with students</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setComposing(true)}>
          <PenSquare size={16} />
          Compose
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {(['inbox', 'sent'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              tab === t ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t === 'inbox' ? <Inbox size={15} /> : <Send size={15} />}
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="space-y-px">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-16 bg-gray-50 animate-pulse" />
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm">No messages.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {messages.map((msg) => (
              <button
                key={msg.id}
                className={`w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors ${
                  !msg.read && tab === 'inbox' ? 'bg-indigo-50/40' : ''
                }`}
                onClick={() => setSelected(msg)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Users size={14} className="text-indigo-600" />
                    </div>
                    <div>
                      <p className={`text-sm truncate ${!msg.read && tab === 'inbox' ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                        {msg.subject}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {tab === 'inbox' ? `From: ${msg.senderName ?? 'Student'}` : `To: ${msg.recipientName ?? 'Student'}`}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{formatDate(msg.createdAt)}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* View Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.subject} size="lg">
        {selected && (
          <div className="space-y-3">
            <p className="text-xs text-gray-400">{formatDate(selected.createdAt)}</p>
            <div className="text-sm text-gray-700 whitespace-pre-wrap">{selected.body}</div>
          </div>
        )}
      </Modal>

      {/* Compose Modal */}
      <Modal open={composing} onClose={() => setComposing(false)} title="New Message" size="lg">
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">To (Student)</label>
            <select
              value={form.recipientId}
              onChange={(e) => setForm((f) => ({ ...f, recipientId: e.target.value }))}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select student…</option>
              {students?.map((s) => (
                <option key={s.id} value={s.userId ?? s.id}>
                  {s.firstName} {s.lastName} ({s.email})
                </option>
              ))}
            </select>
          </div>
          <Input
            label="Subject"
            value={form.subject}
            onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
          />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Message</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm min-h-[120px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.body}
              onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
              placeholder="Write your message…"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setComposing(false)}>Cancel</Button>
            <Button variant="primary" loading={sending} onClick={handleSend}>
              <Send size={14} />
              Send
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
