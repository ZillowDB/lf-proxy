module.exports = (title, initialState = {}, content = '') => {
  let scripts = '';
  if (content) {
    scripts = ` <script>
                  window.__STATE__ = ${JSON.stringify(initialState)}
                </script>
                <script src="http://localhost:3004/client/src/client.js"></script>
                `;
  } else {
    scripts = ' <script src="http://localhost:3004/dist/bundle.js></script>';
  }

  const page = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/cssnode">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous">
      <link rel="stylesheet" href="styles-homes.css">
    </head>
    <body>
      <div id='overview'>
          <div id="carousel"></div>
          <div id="root"></div>
          <div id="app"></div>
          <div id="homes"></div>
      </div>
      <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
      <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
      ${scripts}
    </body>
    </html>
    `;
  return page;
};
