import React, { useEffect } from 'react';

const SuccessMessage = ({ message, setSuccessMessage, delay }) => {
    useEffect(() => setTimeout(() => setSuccessMessage(null), delay));
    if (message === null) {
        return null;
    }
    return <div className="success">{message}</div>;
};

export default SuccessMessage;
