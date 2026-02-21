const { app, PORT } = require('./app');

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
