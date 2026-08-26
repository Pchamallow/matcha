import React from 'react';
import "./navBar.css";

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isLogin?: boolean;
}

function ButtonCust(props: Props) {
	 const { isLogin } = props;

	return (
		<div className='all'>
			<div className="navbar">
				<div className="navbar_image"></div>
				<div className="navbar_text">
					Clownder
				</div>
			</div>
		</div>
	);
}

export default ButtonCust;