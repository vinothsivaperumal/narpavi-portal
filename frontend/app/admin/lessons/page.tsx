'use client';

import React, { useState } from 'react';
import { Plus, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import api from '@/lib/api';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import type { Lesson, Batch } from '@/types';

interface LessonForm {
  title: string;
  description: string;
  youtubeUrl: string;
  batchId: string;
  order: number;
}

const emptyForm: LessonForm = { title: '', description: '', youtubeUrl: '', batchId: '', order: 1 };

export default function AdminLessonsPage() {
  const { data: batches } = useApi<Batch[]>('/api/admin/batches');
  const [selectedBatch, setSelectedBatch] = useState('');
  const url = selectedBatch ? `/api/admin/lessons?batchId=${selectedBatch}` : '/api/admin/lessons';
  const { data: lessons, loading, error, refetch } = useApi<Lesson[]>(url);

  const [modalOpen, setModalOpen]       = useState(false);
  const [editing, setEditing]           = useState<Lesson | null>(null);
  const [form, setForm]                 = useState<LessonForm>(emptyForm);
  const [saving, setSaving]             = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Lesson | null>(null);
  const [deleting, setDeleting]         = useState(false);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm, batchId: selectedBatch });
    setModalOpen(true);
  };
  const openEdit = (l: Lesson) => {
    setEditing(l);
    setForm({ title: l.title, description: l.description, youtubeUrl: l.youtubeUrl, batchId: l.batchId, order: l.order });
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing) {
        await api.put(`/api/admin/lessons/${editing.id}`, form);
      } else {
        await api.post('/api/admin/lessons', form);
      }
      setModalOpen(false);
      refetch();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/api/admin/lessons/${deleteTarget.id}`);
      setDeleteTarget(null);
      refetch();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lessons</h1>
          <p className="text-gray-500 text-sm mt-1">Manage batch curriculum</p>
        </div>
        <Button variant="primary" size="sm" onClick={openCreate}>
          <Plus size={16} />
          Add Lesson
        </Button>
      </div>

      {/* Batch Filter */}
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-gray-700">Filter by batch:</label>
        <select
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Batches</option>
          {batches?.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 bg-white rounded-xl border border-gray-200 animate-pulse" />
          ))}
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>
      )}

      {!loading && lessons && lessons.length === 0 && (
        <div className="text-center py-16 text-gray-400 text-sm">No lessons found.</div>
      )}

      {!loading && lessons && lessons.length > 0 && (
        <div className="space-y-3">
          {lessons
            .sort((a, b) => a.order - b.order)
            .map((l) => (
              <div key={l.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-700 font-bold text-sm flex-shrink-0">
                  {l.order}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{l.title}</p>
                  <p className="text-sm text-gray-500 truncate">{l.description}</p>
                  {l.batchName && (
                    <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full mt-1 inline-block">
                      {l.batchName}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {l.youtubeUrl && (
                    <button
                      onClick={() => window.open(l.youtubeUrl, '_blank')}
                      className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                    >
                      <ExternalLink size={15} />
                    </button>
                  )}
                  <button onClick={() => openEdit(l)} className="p-1.5 rounded hover:bg-indigo-50 text-indigo-600">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => setDeleteTarget(l)} className="p-1.5 rounded hover:bg-red-50 text-red-500">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Form Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Lesson' : 'Add Lesson'} size="lg">
        <div className="space-y-4">
          <Input label="Title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
          </div>
          <Input label="YouTube URL" type="url" value={form.youtubeUrl} onChange={(e) => setForm((f) => ({ ...f, youtubeUrl: e.target.value }))} />
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Batch</label>
              <select
                value={form.batchId}
                onChange={(e) => setForm((f) => ({ ...f, batchId: e.target.value }))}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select batch…</option>
                {batches?.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
            <Input label="Order" type="number" value={String(form.order)} onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))} />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" loading={saving} onClick={handleSave}>
              {editing ? 'Save Changes' : 'Add Lesson'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirm */}
      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Lesson" size="sm">
        <p className="text-sm text-gray-600 mb-4">
          Delete lesson <strong>{deleteTarget?.title}</strong>?
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button variant="danger" loading={deleting} onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
