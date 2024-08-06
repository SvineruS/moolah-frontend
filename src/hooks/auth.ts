import { useState, useEffect } from 'react';

export default function useAuth(key = 'auth') {
    const [auth, setAuth] = useState(() => localStorage.getItem(key));

    useEffect(() => {
        if (auth) {
            localStorage.setItem(key, auth);
        } else {
            localStorage.removeItem(key);
        }
    }, [auth, key]);

    return {auth, setAuth};
}
