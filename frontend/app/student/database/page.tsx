'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Database, Copy } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { maskString } from '@/lib/utils';
import Button from '@/components/ui/Button';

interface DbCredentials {
  host: string;
  port: number;
  username: string;
  password: string;
  databaseName: string;
  connectionString: string;
  ipApproved: boolean;
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <button
      onClick={copy}
      className="text-gray-400 hover:text-indigo-600 transition-colors"
      title="Copy to clipboard"
    >
      {copied ? (
        <span className="text-xs text-green-600 font-medium">Copied!</span>
      ) : (
        <Copy size={14} />
      )}
    </button>
  );
}

export default function StudentDatabasePage() {
  const { data: creds, loading, error } = useApi<DbCredentials>('/api/student/database-credentials');
  const [revealed, setRevealed] = useState(false);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="h-64 bg-white rounded-xl border border-gray-200 animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
        {error}
      </div>
    );
  }

  if (!creds || !creds.ipApproved) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Database Access</h1>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
          <Database size={40} className="mx-auto text-yellow-500 mb-3" />
          <h2 className="font-semibold text-yellow-800 mb-2">IP Not Approved</h2>
          <p className="text-yellow-700 text-sm max-w-sm mx-auto">
            Your IP address hasn&apos;t been approved yet. Please register your IP and wait for
            admin approval before accessing database credentials.
          </p>
          <a
            href="/student/ip-registration"
            className="inline-block mt-4 text-sm text-yellow-700 underline font-medium"
          >
            Go to IP Registration →
          </a>
        </div>
      </div>
    );
  }

  const fields: { label: string; value: string; mono?: boolean; sensitive?: boolean }[] = [
    { label: 'Host',              value: creds.host,             mono: true },
    { label: 'Port',              value: String(creds.port),     mono: true },
    { label: 'Database Name',     value: creds.databaseName,     mono: true },
    { label: 'Username',          value: creds.username,         mono: true },
    { label: 'Password',          value: creds.password,         mono: true, sensitive: true },
    { label: 'Connection String', value: creds.connectionString, mono: true, sensitive: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Database Access</h1>
          <p className="text-gray-500 text-sm mt-1">Your database connection credentials</p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setRevealed((v) => !v)}
        >
          {revealed ? <EyeOff size={16} /> : <Eye size={16} />}
          {revealed ? 'Hide' : 'Reveal'} Credentials
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100">
        {fields.map((f) => (
          <div key={f.label} className="px-6 py-4 flex items-center justify-between gap-4">
            <span className="text-sm text-gray-500 w-40 flex-shrink-0">{f.label}</span>
            <span className={`flex-1 text-sm text-gray-900 ${f.mono ? 'font-mono' : ''} break-all`}>
              {f.sensitive && !revealed ? maskString(f.value) : f.value}
            </span>
            {revealed && <CopyButton value={f.value} />}
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400">
        ⚠️ Keep your credentials secure. Do not share them with anyone.
      </p>
    </div>
  );
}
