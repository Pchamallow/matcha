import React from 'react';
import "./buttonCust.css";

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	name: string;
	naviguate?: () => void;
}

function ButtonCust(props: Props) {
	 const { name, naviguate, ...rest } = props;

	return (
		<div className='buttonCust' onClick={naviguate}>
			{name}
		</div>
	);
}

export default ButtonCust;