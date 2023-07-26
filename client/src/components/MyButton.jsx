import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';
const MyButton = (props) => {
    const {buttonMessage,link} = props;
    return (
        <button className="custom-button">
            <Link to={link} className="button-link">
                {buttonMessage}
            </Link>
        </button>
    );
};

export default MyButton;