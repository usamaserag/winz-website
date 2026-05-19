import { useState, useEffect } from 'react';
import { fetchAndParseCSV } from '../services/csvService';

/**
 * Custom React Hook to fetch and parse CSV data dynamically.
 * Provides data, loading, and error states. Supports automatic cleanup.
 * 
 * @param {string} csvUrl The URL or path of the CSV file to load.
 * @returns {{ data: Record<string, string>[] | null, headers: string[] | null, loading: boolean, error: string | null, reload: () => void }}
 */
export function useCSVData(csvUrl) {
  const [data, setData] = useState(null);
  const [headers, setHeaders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trigger, setTrigger] = useState(0);

  const reload = () => setTrigger(prev => prev + 1);

  useEffect(() => {
    if (!csvUrl) return;

    const abortController = new AbortController();
    setLoading(true);
    setError(null);

    fetchAndParseCSV(csvUrl, abortController.signal)
      .then((parsed) => {
        setData(parsed.data);
        setHeaders(parsed.headers);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          // Request was cancelled, do not update state
          return;
        }
        setError(err.message || 'An error occurred while loading CSV data');
        setLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, [csvUrl, trigger]);

  return { data, headers, loading, error, reload };
}
