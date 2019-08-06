const express = require('express');
const app = express();
const port = 3000;

console.log(__dirname + '/../dist');
app.use(express.static('../dist'));
app.get('/', (req, res) => res.send('Hello World from Express'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
