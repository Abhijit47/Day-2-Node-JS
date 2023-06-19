const express = require('express');
const users = require('./Users');
const data = require('./data.json');

// Initiate app with express
const app = express();

//Define a port
const PORT = 9999;

// Middleware to parse incoming request
// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

app.get('/users', (req, res) => {
  res.status(200).json({ "data": users });
});

app.get('/users/:id', (req, res) => {
  const id = Number(req.params.id);

  const user = users.filter(user => user.id === id);

  res.status(200).json({ "data": user });
});

app.post('/users', async (req, res) => {
  const user = users.push(req.body);
  // console.log(user);
  res.status(201).json({ message: "Data created successfully.", users });
});

app.put('/users/:id', async (req, res) => {
  const id = Number(req.params.id);

  let user = data.filter(user => user.id === id);

  user = req.body;

  res.status(202).json({ "message": "Updated Successfully.", user });

});

app.delete("/users/:id", async (req, res) => {
  const id = Number(req.params.id);

  const user = users.filter(user => user.id === id).pop();

  res.status(200).json({ message: "Deleted successfully.", user });
});

app.all("*", (req, res) => {
  res.status(400).json({ "message": `Can't get ${req.originalUrl}` });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})

