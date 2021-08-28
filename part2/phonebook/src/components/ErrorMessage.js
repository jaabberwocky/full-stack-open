import React, { useEffect } from 'react';

const ErrorMessage = ({ message, setErrorMessage, delay }) => {
    useEffect(() => setTimeout(() => setErrorMessage(null), delay));
    if (message === null) {
        return null;
    }
    return <div className="error">{message}</div>;
};

export default ErrorMessage;
