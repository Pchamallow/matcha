import { useAuth } from "./AuthProvider";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedPages()
{
	const { user, loading } = useAuth();

	if (loading)
		return;
	if (!user)
		return <Navigate to="/" replace />;

	return <Outlet />
}
