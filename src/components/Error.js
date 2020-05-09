import React from 'react';

const Error = ({message}) => {
    return (
        <div className="ui negative message">
            <div className="header">
               {message || "Page doesn't exist!"}
            </div>
        </div>
    );
}

export default Error;