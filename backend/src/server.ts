import 'dotenv/config';
import { app, PORT } from './app';

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
