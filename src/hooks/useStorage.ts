import React, { useState, useEffect } from 'react';

export default function useStorage(key = 'auth'): [string, React.Dispatch<React.SetStateAction<string>>] {
    const [auth, setAuth] = useState(() => localStorage.getItem(key));

    useEffect(() => {
        if (auth) {
            localStorage.setItem(key, auth);
        } else {
            localStorage.removeItem(key);
        }
    }, [auth, key]);

    return [auth, setAuth];
}
