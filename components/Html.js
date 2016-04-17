import React from 'react';

function Html() {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="stylesheet" href="https://code.getmdl.io/1.1.3/material.indigo-pink.min.css" />
      </head>
      <body>
        <div id="root"></div>
        <script src="https://code.getmdl.io/1.1.3/material.min.js" />
        <script src="/bundle.js" />
      </body>
    </html>
  );
}

export default Html;
