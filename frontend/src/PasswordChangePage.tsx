import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { Outlet, Navigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";



export default function PasswordChangePage()
{
	const { user, loading } = useAuth();
	const [ validating, setValidating ] = useState(true);
	const [ valid, setValid ] = useState(false);
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');

	useEffect(() => {
		if (!token)
			setValidating(false);

		async function checkToken()
		{
			try
			{
				const response = await fetch(`/api/db/isPasswordResetTokenValid?token=${token}`);
				if (!response.ok)
				{
					alert("Link either expired or invalid.");
					setValid(false);
					return;
				}
				setValid(true);
			} catch {
				alert("Link either expired or invalid.");
				setValid(false);
			} finally {
				setValidating(false);
			}
		}

		checkToken();
	}, [token])

	if (loading || validating)
		return;

	if (!token || !valid)
		return <Navigate to="/" replace />;
	if (user)
	{
		alert("You are logged in! Log out to reset your password.");
		return <Navigate to="/" replace />;
	}

	return <Outlet />
}
