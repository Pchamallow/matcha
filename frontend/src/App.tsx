import { Routes, Route } from "react-router-dom";

import AuthProvider from "./AuthProvider";
import ProtectedPages from "./ProtectedPages";
import PublicPages from "./PublicPages";
import PasswordChangePage from "./PasswordChangePage";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PasswordReset from "./pages/PasswordReset";
import PasswordChange from "./pages/PasswordChange";

function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route element={<PublicPages />}>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/passwordreset" element={<PasswordReset />} />
				</Route>
				<Route element={<PasswordChangePage />}>
					<Route path="/passwordchange" element={<PasswordChange />} />
				</Route>
				<Route element={<ProtectedPages />}>
					<Route path="/profile" element={<Profile />} />
				</Route>
			</Routes>
		</AuthProvider>
	);
}

export default App;
