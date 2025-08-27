"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/quotes")
      .then((res) => res.json())
      .then((data) => {
        setQuotes(data.quotes || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load quote requests.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Quote Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="h-6 w-6 animate-spin text-orange-600" />
            </div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : quotes.length === 0 ? (
            <div className="text-gray-500">No quote requests found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {quotes.map((q) => (
                    <tr key={q._id}>
                      <td className="px-4 py-2 whitespace-nowrap font-medium text-gray-900">{q.name}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-gray-700">{q.email}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-gray-700">{q.phone}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-gray-700">{q.product}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-gray-700 max-w-xs truncate">{q.message}</td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <Badge>{q.status}</Badge>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-gray-500 text-xs">{new Date(q.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 