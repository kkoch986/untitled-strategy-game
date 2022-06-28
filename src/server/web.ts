import express from 'express';
import path from 'path';

const app = express();

// TODO: get this from some kind of config
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});
app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
