import React, { Fragment } from 'react';
import spinner from '../../src/SquareLoading.gif';

//Spinner, this will be used while fetching data.
export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{
        width: '100px',
        margin: 'auto',
        marginTop: '200px',
        display: 'block',
      }}
      alt='Loading...'
    />
  </Fragment>
);
