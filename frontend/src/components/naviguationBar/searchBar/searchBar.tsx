import React, { useState } from'react';
import { debounce } from 'lodash.debounce';
import "./searchBar.css";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
	initialQuery?: string;
}

// // Query is search at every entry in input, bounce fix a limit
// const SearchBarWithProps: React.FC<SearchBarProps> = ({ initialQuery = '' }) => {
// 	const [searchQuery, setSearchQuery] = useState(initialQuery);
// 	// const [debouncedQuery, setDebouncedQuery] = useState('');

// 	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		setSearchQuery(e.target.value);
// 	};

// 	// const debouncedSearch = debounce((query: string) => {
// 	// 	setDebouncedQuery(query);
// 	// }, 300);

// 	return (
// 		<div className='wrapper'>
// 		<input
// 			type="text"
// 			placeholder="Search..."
// 			value={searchQuery}
// 			onChange={handleSearchChange}
// 			aria-label="Search input"
// 		/>
// 			{/* <p>You are searching for: {searchQuery}</p> */}
// 			{/* <p>Debounced search query: {debouncedQuery}</p> */}
// 		</div>
// 	);
// };

interface User {
    username: string;
    first_name: string;
    last_name: string;
    gender: string;
    email: string;
    city: string;
}

export const SearchBar = () => {
	const [ input, setInput ] = useState("");
	const [ users, setUsers ] = useState<User[]>([]);

	async function fetchData(value: string)
	{

		const fetchUser = await fetch (`http://localhost:3000/api/db/getUsers?input=${value}`);
		// const users = await fetchUser.json();
		 console.log("Réponse reçue :", fetchUser);
		const users: User[] = await fetchUser.json();
		// console.log("JSON reçu :", users);
		// console.log("Type :", typeof users);
		// console.log("Array ?", Array.isArray(users));
		console.log(users);
		setUsers(users);

	}

	const handleChange = (value: string) => {
		setInput(value);
		fetchData(value);
	}

	return (
		<div className='wrapper'>
			<FaSearch id="searh-icon"/>
			<input
				// type="text"
				placeholder="Search..."
				value={input}
				// onChange={(e) => setInput(e.target.value)}
				onChange={(e) => handleChange(e.target.value)}
				// aria-label="Search input"
			/>
			{/* <p>You are searching for: {searchQuery}</p> */}
			{/* <p>Debounced search query: {debouncedQuery}</p> */}
		</div>
	);
};

export default SearchBar;