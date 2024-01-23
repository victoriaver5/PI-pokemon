const server = require('./src/app.js');
const { conn } = require('./src/db.js');


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  console.log('Tablas sincronizadas correctamente');
  server.listen(3001, () => {
    console.log('listening at 3001'); // eslint-disable-line no-console
  });
});
