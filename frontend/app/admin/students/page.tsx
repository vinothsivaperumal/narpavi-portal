'use client';

import React, { useState } from 'react';
import { UserPlus, Search, Pencil, Trash2 } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import api from '@/lib/api';
import Button from '@/components/ui/Button';
import Badge, { statusToBadgeVariant } from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import { formatDate } from '@/lib/utils';
import type { Student } from '@/types';

interface StudentForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  batchId: string;
}

const emptyForm: StudentForm = { firstName: '', lastName: '', email: '', phone: '', batchId: '' };

export default function AdminStudentsPage() {
  const { data: students, loading, error, refetch } = useApi<Student[]>('/api/admin/students');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);
  const [form, setForm] = useState<StudentForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Student | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = (students ?? []).filter((s) =>
    `${s.firstName} ${s.lastName} ${s.email}`.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit   = (s: Student) => {
    setEditing(s);
    setForm({ firstName: s.firstName, lastName: s.lastName, email: s.email, phone: s.phone ?? '', batchId: s.batchId ?? '' });
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing) {
        await api.put(`/api/admin/students/${editing.id}`, form);
      } else {
        await api.post('/api/admin/students', form);
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
      await api.delete(`/api/admin/students/${deleteTarget.id}`);
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
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-500 text-sm mt-1">Manage enrolled students</p>
        </div>
        <Button variant="primary" size="sm" onClick={openCreate}>
          <UserPlus size={16} />
          Add Student
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search students…"
          className="pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {loading && (
        <div className="h-64 bg-white rounded-xl border border-gray-200 animate-pulse" />
      )}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>
      )}

      {!loading && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {['Name', 'Email', 'Batch', 'Enrolled', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-gray-400">No students found.</td>
                  </tr>
                ) : (
                  filtered.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{s.firstName} {s.lastName}</td>
                      <td className="px-4 py-3 text-gray-600">{s.email}</td>
                      <td className="px-4 py-3 text-gray-600">{s.batchName ?? '—'}</td>
                      <td className="px-4 py-3 text-gray-500">{formatDate(s.enrollmentDate)}</td>
                      <td className="px-4 py-3">
                        <Badge variant={statusToBadgeVariant(s.status)}>
                          {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => openEdit(s)} className="p-1.5 rounded hover:bg-indigo-50 text-indigo-600 transition-colors">
                            <Pencil size={15} />
                          </button>
                          <button onClick={() => setDeleteTarget(s)} className="p-1.5 rounded hover:bg-red-50 text-red-500 transition-colors">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Student' : 'Add Student'}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="First Name" value={form.firstName} onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))} />
            <Input label="Last Name"  value={form.lastName}  onChange={(e) => setForm((f) => ({ ...f, lastName:  e.target.value }))} />
          </div>
          <Input label="Email"   type="email" value={form.email}   onChange={(e) => setForm((f) => ({ ...f, email:   e.target.value }))} />
          <Input label="Phone"   type="tel"   value={form.phone}   onChange={(e) => setForm((f) => ({ ...f, phone:   e.target.value }))} />
          <Input label="Batch ID"             value={form.batchId} onChange={(e) => setForm((f) => ({ ...f, batchId: e.target.value }))} />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" loading={saving} onClick={handleSave}>
              {editing ? 'Save Changes' : 'Add Student'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Student" size="sm">
        <p className="text-sm text-gray-600 mb-4">
          Are you sure you want to delete <strong>{deleteTarget?.firstName} {deleteTarget?.lastName}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button variant="danger" loading={deleting} onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
