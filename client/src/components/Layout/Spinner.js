import React from 'react';
import spinner from './spinner.gif.gif';

export default () => (

    <React.Fragment>
        <img src={spinner} style={{ width: '200', margin: 'auto', display: 'block' }} alt='Loading...' />
    </React.Fragment>
)