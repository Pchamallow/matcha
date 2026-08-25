import { Routes, Route } from "react-router-dom";

import AuthProvider from "./AuthProvider";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProtectedPages from "./ProtectedPages";
import PublicPages from "./PublicPages";

function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route element={<PublicPages />}>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
				</Route>
				<Route element={<ProtectedPages />}>
					<Route path="/profile" element={<Profile />} />
				</Route>
			</Routes>
		</AuthProvider>
	);
}

export default App;
