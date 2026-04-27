'use client';

import React, { useState } from 'react';

export default function TestPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/test-sheet');
      const data = await res.json();
      setResult(data);
    } catch (error) {
      setResult({ success: false, error: 'Failed to fetch' });
    } finally {
      setLoading(false);
    }
  };

  const testOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: 'Test User',
          phone: '08012345678',
          email: 'test@example.com',
          color: 'Rose Gold',
          address: '123 Test Street, Lagos'
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      setResult({ success: false, error: 'Failed to submit test order' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-theme text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Google Sheets Connection Test</h1>

        <div className="space-y-4 mb-8">
          <button
            onClick={testConnection}
            disabled={loading}
            className="w-full bg-gold text-black py-4 rounded font-bold uppercase tracking-wider disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Connection'}
          </button>

          <button
            onClick={testOrder}
            disabled={loading}
            className="w-full bg-white text-black py-4 rounded font-bold uppercase tracking-wider disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Test Order'}
          </button>
        </div>

        {result && (
          <div className={`p-6 rounded-lg border ${result.success ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
            <h2 className="text-xl font-bold mb-4">
              {result.success ? '✅ Success' : '❌ Error'}
            </h2>
            <pre className="bg-black/50 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-8 p-4 border border-[#333] rounded text-grey text-sm">
          <h3 className="text-white font-bold mb-2">Troubleshooting Steps:</h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>Open your Google Sheet</li>
            <li>Click <strong>Extensions</strong> → <strong>Apps Script</strong></li>
            <li>Check that the code is pasted correctly</li>
            <li>Click <strong>Deploy</strong> → <strong>Manage deployments</strong></li>
            <li>Verify the Web App URL matches your .env.local</li>
            <li>Make sure &quot;Who has access&quot; is set to <strong>Anyone</strong></li>
          </ol>
        </div>

        <a href="/" className="inline-block mt-8 text-gold hover:underline">
          ← Back to Home
        </a>
      </div>
    </div>
  );
}
