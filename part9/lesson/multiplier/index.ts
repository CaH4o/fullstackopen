//const express = require('express');
import express from 'express';
const app = express();

//app.get('/ping', (req, res) => {
app.get('/ping', (_req, res) => {
  res.send('pong');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
