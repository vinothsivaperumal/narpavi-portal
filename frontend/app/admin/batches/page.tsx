'use client';

import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import api from '@/lib/api';
import Button from '@/components/ui/Button';
import Badge, { statusToBadgeVariant } from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import { formatDate } from '@/lib/utils';
import type { Batch } from '@/types';

interface BatchForm {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

const emptyForm: BatchForm = { name: '', description: '', startDate: '', endDate: '' };

export default function AdminBatchesPage() {
  const { data: batches, loading, error, refetch } = useApi<Batch[]>('/api/admin/batches');
  const [modalOpen, setModalOpen]     = useState(false);
  const [editing, setEditing]         = useState<Batch | null>(null);
  const [form, setForm]               = useState<BatchForm>(emptyForm);
  const [saving, setSaving]           = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Batch | null>(null);
  const [deleting, setDeleting]       = useState(false);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit   = (b: Batch) => {
    setEditing(b);
    setForm({ name: b.name, description: b.description ?? '', startDate: b.startDate.slice(0, 10), endDate: b.endDate.slice(0, 10) });
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing) {
        await api.put(`/api/admin/batches/${editing.id}`, form);
      } else {
        await api.post('/api/admin/batches', form);
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
      await api.delete(`/api/admin/batches/${deleteTarget.id}`);
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
          <h1 className="text-2xl font-bold text-gray-900">Batches</h1>
          <p className="text-gray-500 text-sm mt-1">Manage bootcamp batches</p>
        </div>
        <Button variant="primary" size="sm" onClick={openCreate}>
          <Plus size={16} />
          Create Batch
        </Button>
      </div>

      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-40 bg-white rounded-xl border border-gray-200 animate-pulse" />
          ))}
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>
      )}

      {!loading && batches && batches.length === 0 && (
        <div className="text-center py-16 text-gray-400 text-sm">No batches created yet.</div>
      )}

      {!loading && batches && batches.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {batches.map((b) => (
            <div key={b.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{b.name}</h3>
                <Badge variant={statusToBadgeVariant(b.status)}>
                  {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                </Badge>
              </div>
              {b.description && (
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{b.description}</p>
              )}
              <div className="text-xs text-gray-400 space-y-1 mb-4">
                <div>Start: {formatDate(b.startDate)}</div>
                <div>End:   {formatDate(b.endDate)}</div>
                <div>Students: {b.studentCount}</div>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => openEdit(b)}>
                  <Pencil size={13} />
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => setDeleteTarget(b)}>
                  <Trash2 size={13} />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Batch' : 'Create Batch'}>
        <div className="space-y-4">
          <Input label="Batch Name"   value={form.name}        onChange={(e) => setForm((f) => ({ ...f, name:        e.target.value }))} />
          <Input label="Description"  value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          <Input label="Start Date" type="date" value={form.startDate} onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))} />
          <Input label="End Date"   type="date" value={form.endDate}   onChange={(e) => setForm((f) => ({ ...f, endDate:   e.target.value }))} />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" loading={saving} onClick={handleSave}>
              {editing ? 'Save Changes' : 'Create'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirm */}
      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Batch" size="sm">
        <p className="text-sm text-gray-600 mb-4">
          Delete batch <strong>{deleteTarget?.name}</strong>? All associated data will be affected.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button variant="danger" loading={deleting} onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
