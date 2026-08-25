import { useAuth } from '../AuthProvider'

function Profile() {
	const { user } = useAuth();
	if (!user)
		return;

	return (
		<>
			<header>
				<div className="banner">
					<div className="banner__text">
						Clownder
					</div>
				</div>
			</header>
			<div className="background">
				<div id="profile">
					<p>Profile</p>
					<div>Username: {user.username}</div>
					<div>First name: {user.first_name}</div>
					<div>Last name: {user.last_name}</div>
					<div>Email: {user.email}</div>
					<div>Gender: {user.gender}</div>
					<div>City: {user.city}</div>
				</div>
			</div>
		</>
	);
}

export default Profile;
