import React from 'react';

const Button = ({text, onClick}) => {

    const buttonStyle = {
        fontSize: '15px',
        cursor: 'pointer',
        fontWeight: 500,
        color: '#E89F71',
        border: '1px solid #E89F71',
        width: '245px',
        height: '48px',
        backgroundColor: '#fff'
   
    };

    return (
        <button style={buttonStyle} onClick={onClick}>{text}</button>
    );
};



export default Button;