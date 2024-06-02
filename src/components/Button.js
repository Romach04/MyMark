import React from 'react';

const Button = ({text, disabled = false, ...props}) => {

    const buttonStyle = {
        fontSize: '15px',
        cursor: 'pointer',
        fontWeight: 500,
        color:  disabled ? '#E89F54' : '#E89E71',
        border: '1px solid #E89F71',
        width: '245px',
        height: '48px',

        backgroundColor: '#fff'
   
    };

    return (
        <button style={buttonStyle}  disabled={disabled} {...props}>{text}</button>
    );
};




export default Button;

