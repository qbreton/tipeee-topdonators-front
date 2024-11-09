import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const server = http.createServer(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve les fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Démarrer le serveur
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Serveur démarré : http://localhost:${PORT}`);
});
