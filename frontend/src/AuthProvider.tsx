import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";

export type User = {
	username: string,
	first_name: string,
	last_name: string,
	email: string,
	gender: string,
	city: string,
};

type AuthContext = {
	user: User | null,
	loading: boolean;
	setUser: (user: User | null) => void;
	setLoading: (loading: boolean) => void;
};

const Context = createContext<AuthContext | undefined>(undefined);

export function AuthProvider({children} : {children: ReactNode}) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		checkSession();
	}, [])

	async function checkSession()
	{
		const cookies = new Cookies();
		const token = cookies.get("sessionToken");

		if (!token)
		{
			setLoading(false);
			return;
		}
		const user = await getSession(token);
		if (user)
			setUser(user);
		setLoading(false);
	}

	async function getSession(token: string) : Promise<User | undefined>
	{
		const response = await fetch(`/api/db/getSession?token=${token}`);
		if (!response.ok)
		{
			console.error(response.text());
			return undefined;
		}
		const user: User = await response.json();
		return user;
	}

	return (
		<Context.Provider value={{ user, loading, setUser, setLoading }}>
			{children}
		</Context.Provider>
	);
}

export function useAuth(): AuthContext {
	const context = useContext(Context);
	if (!context)
		throw "Context not found: Misplacement of the AuthContext element in your App.tsx.";
	return context;
}

export default AuthProvider;
