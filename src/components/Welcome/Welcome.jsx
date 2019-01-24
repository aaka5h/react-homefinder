import React from 'react';
import { Link } from 'react-router-dom';

const welcome = () => (
  <div>
    <h1>Welcome to Home finder</h1>
    <ul>
      <Link to="/home-finder">home finder</Link>
    </ul>
  </div>
);

export default welcome;
