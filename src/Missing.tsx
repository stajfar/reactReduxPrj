import React from 'react';
import { Link } from 'react-router-dom';


function Missing() {
    return (
        <main className="Missing">
          <p>Page not found!</p>
          <p>This is disappointing!</p>
          <p>
              <Link to="/">Visit out home page!</Link>
          </p>

      </main>
  );
}

export default Missing;