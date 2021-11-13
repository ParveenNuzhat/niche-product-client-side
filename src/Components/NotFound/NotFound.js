import React from 'react';
import './NotFound.css'

const NotFound = () => {
    return (
        <div className='error-style'>
            <h2>404</h2>
            <h5>Page Not Found!</h5>
            <p>Looks like you've followed a broken link or entered a URL that doesn't exist on this site.
                <br />Go back to Homepage~</p>
        </div>
    );
};

export default NotFound;