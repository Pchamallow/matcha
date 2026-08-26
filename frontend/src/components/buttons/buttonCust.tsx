import React from 'react';
import "./buttonCust.css";

type ButtonProps = {
  children: React.ReactNode;
};

function ButtonCust({ children }: ButtonProps) {
	return (
		<div className='buttonCust'>
			{children}
		</div>
	);
}

export default ButtonCust;