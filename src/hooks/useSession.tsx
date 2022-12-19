import { createContext, useContext, useEffect, useState } from 'react';

interface Session {
  isLoading: boolean;
  token: string | undefined;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const SessionContext = createContext<Session>({
  isLoading: true,
  token: '',
  setToken: () => {
  },
  clearToken: () => {
  }
});

function useSession() {
  return useContext(SessionContext);
}

export function SessionProvider(props: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [token, _setToken] = useState<string>();

  function setToken(t: string) {
    _setToken(t);
    localStorage.setItem('token', t);
  }

  function clearToken() {
    _setToken(undefined);
    localStorage.removeItem('token');
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }
    setIsLoading(false);
  }, []);

  return (
    <SessionContext.Provider
      value={{
        isLoading,
        token,
        setToken,
        clearToken
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
}

export { SessionContext, useSession };

