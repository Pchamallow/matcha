import React from 'react';
import "./buttonCust.css";

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	label: string;
	naviguate?: () => void;
}

function ButtonCust(props: Props) {
	 const { label, naviguate, ...rest } = props;

	return (
		<div className='buttonCust' onClick={naviguate}>
			{label}
		</div>
	);
}

export default ButtonCust;