import { useSession } from './useSession';
import { apiHost } from '../config';

function useAuthedRequest() {

  const session = useSession();

  function getHeader() {
    const headers: HeadersInit = { Accept: 'application/json', };
    if (session.token) headers.Authorization = 'Bearer ' + session.token;
    return headers;
  }

  function put(url: string, data: any) {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    return fetch(apiHost + url, {
      method: 'PUT',
      headers: getHeader(),
      body: formData,
    });
  }

  function del(url: string) {
    return fetch(apiHost + url, {
      method: 'DELETE',
      headers: getHeader(),
    });
  }

  function post(url: string, data: any) {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    return fetch(apiHost + url, {
      method: 'POST',
      headers: getHeader(),
      body: formData,
    });
  }

  return {
    put,
    post,
    del
  };
}

export default useAuthedRequest;
