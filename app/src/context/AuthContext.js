import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [authMessage, setAuthMessage] = useState('');
  const [signInMessage, setSignInMessage] = useState('');
  const [signOutMessage, setSignOutMessage] = useState('');

  useEffect(() => {
    (async function() {
      try {
        const endpoint = 'http://localhost:5000/saveinn_user/user/auth';

        const options = {
          method: 'GET',
          credentials: 'include',
        };
  
        const res = await fetch(endpoint, options);
        const data = await res.json();
  
        setUser(data.user);
        setAuthMessage(data.message);
        setIsAuthenticating(false);
      } catch(error) {
        console.log(error);
      }
    }());
  }, []);

  async function signIn(email, password) {
    try {
      const endpoint = 'http://localhost:5000/saveinn_user/user/sign_in';

      const body = {
        email,
        password,
      };

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'include',
      };

      const res = await fetch(endpoint, options);
      const data = await res.json();

      setUser(data.user);
      setSignInMessage(data.message);
    } catch(error) {
      console.log(error);
    }
  }

  async function signOut() {
    try {
      const endpoint = 'http://localhost:5000/saveinn_user/user/sign_out';

      const options = {
        method: 'DELETE',
        credentials: 'include',
      };

      const res = await fetch(endpoint, options);
      const data = await res.json();

      setUser(data.user);
      setSignOutMessage(data.message);
      setSignInMessage('');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticating, authMessage, signInMessage, signOutMessage, signIn, signOut, setAuthMessage, setSignInMessage, setSignOutMessage }}>
      { children }
    </AuthContext.Provider>
  );
}