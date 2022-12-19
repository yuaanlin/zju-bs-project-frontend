import { useSession } from './useSession';
import { apiHost } from '../config';
import { useCallback, useEffect } from 'react';
import useSWR, { useSWRConfig } from 'swr';

function useGet<T>(url: string, condition?: boolean) {
  const session = useSession();
  const fetcher = useCallback((url: string) => {
    const headers: HeadersInit = {};
    if (session.token) headers.Authorization = session.token;
    return fetch(url, { headers }).then(res => {
      if (res.status === 403) session.clearToken();
      return res.json();
    });
  }, [session.token]);

  function getUrl() {
    const u = apiHost + url;
    if (condition === undefined || condition) return u;
    return undefined;
  }

  const swr = useSWR<T | any>(getUrl(), fetcher);

  useEffect(() => {
    swr.mutate();
  }, [session.token]);

  return swr;
}

export function useRevalidate() {
  const config = useSWRConfig();
  return (url: string) => config.mutate(apiHost + url);
}

export default useGet;
