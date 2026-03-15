'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Globe, Plus } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import api from '@/lib/api';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Badge, { statusToBadgeVariant } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import type { IpRequest } from '@/types';

interface IpForm {
  ipAddress: string;
}

export default function IpRegistrationPage() {
  const { data: requests, loading, error, refetch } = useApi<IpRequest[]>('/api/student/ip-requests');
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IpForm>();

  const onSubmit = async (data: IpForm) => {
    setSubmitting(true);
    setServerError('');
    try {
      await api.post('/api/student/ip-requests', data);
      reset();
      setShowForm(false);
      refetch();
    } catch (err: unknown) {
      setServerError(
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
          'Failed to submit IP request.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">IP Registration</h1>
          <p className="text-gray-500 text-sm mt-1">
            Register your public IP to get database access
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setShowForm((v) => !v)}>
          <Plus size={16} />
          Register IP
        </Button>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
        <p className="font-medium mb-1 flex items-center gap-2">
          <Globe size={16} /> How it works
        </p>
        <p>
          Submit your current public IP address. An admin will review and approve your request,
          which will add your IP to the AWS security group for database access.
        </p>
      </div>

      {/* Submit Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Submit New IP Request</h2>
          {serverError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {serverError}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 items-start flex-wrap">
            <div className="flex-1 min-w-48">
              <Input
                label="Public IP Address"
                placeholder="e.g. 203.0.113.42"
                error={errors.ipAddress?.message}
                {...register('ipAddress', {
                  required: 'IP address is required',
                  pattern: {
                    value: /^(\d{1,3}\.){3}\d{1,3}$/,
                    message: 'Enter a valid IPv4 address',
                  },
                })}
              />
            </div>
            <div className="flex gap-2 pt-6">
              <Button type="submit" variant="primary" loading={submitting}>
                Submit
              </Button>
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Requests List */}
      {loading && (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-16 bg-white rounded-xl border border-gray-200 animate-pulse" />
          ))}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      {!loading && requests && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Your IP Requests</h2>
          </div>
          {requests.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-sm">
              No IP requests yet. Submit one above.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {requests.map((req) => (
                <div key={req.id} className="px-6 py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-mono text-sm text-gray-900">{req.ipAddress}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Submitted {formatDate(req.submittedAt)}
                    </p>
                  </div>
                  <Badge variant={statusToBadgeVariant(req.status)}>
                    {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
