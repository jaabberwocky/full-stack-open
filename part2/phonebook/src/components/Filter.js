import React from 'react';

const Filter = ({ filterTerm, setFilterTerm }) => {
    const handleFilterChange = (event) => {
        setFilterTerm(event.target.value);
    };

    return (
        <React.Fragment>
            filter shown with{' '}
            <input value={filterTerm} onChange={handleFilterChange} />
        </React.Fragment>
    );
};
export default Filter;
