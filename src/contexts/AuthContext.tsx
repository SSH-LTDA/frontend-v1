import React, { createContext, useState, useEffect, ReactNode, useContext, useCallback } from "react";
import { User } from "../types/User.ts";

interface AuthContextType {
	user: User | null;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const logout = useCallback(() => {
		localStorage.removeItem("user");
		setUser(null);
	}, []);

	return <AuthContext.Provider value={{ user, logout }}>{children}</AuthContext.Provider>;
};

const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export { AuthProvider, useAuth };
