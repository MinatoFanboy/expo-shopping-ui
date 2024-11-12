import { FC, PropsWithChildren, createContext, useContext, useState } from 'react';

/** Typescript */
import { IUser } from '@/types/model';

const AuthContext = createContext<{
    setAuth?: (user: IUser | null) => void;
    setUserData?: (user: IUser) => void;
    user: IUser | null;
}>({ user: null });

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);

    const setAuth = (authUser: IUser | null) => {
        setUser(authUser);
    };

    const setUserData = (userData: IUser) => {
        setUser((prev) => ({ ...prev, ...userData }));
    };

    return <AuthContext.Provider value={{ setAuth, setUserData, user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
