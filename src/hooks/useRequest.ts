import { useSession } from './useSession';
import { apiHost } from '../config';

function useAuthedRequest() {

  const session = useSession();

  function getHeader() {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    if (session.token) headers.Authorization = session.token;
    return headers;
  }

  function put(url: string, data: any) {
    return fetch(apiHost + url, {
      method: 'PUT',
      headers: getHeader(),
      body: JSON.stringify(data),
    });
  }

  function del(url: string) {
    return fetch(apiHost + url, {
      method: 'DELETE',
      headers: getHeader(),
    });
  }

  function post(url: string, data: any) {
    return fetch(apiHost + url, {
      method: 'POST',
      headers: getHeader(),
      body: JSON.stringify(data),
    });
  }

  return {
    put,
    post,
    del
  };
}

export default useAuthedRequest;
