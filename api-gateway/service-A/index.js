const express = require("express");

const app = express();
const port = 8001;

app.get("/api/data", (req, res) => {
  console.log(`Received request to /api/data: ${req.method} ${req.url} `);
  res.status(200).json({message:"Response from Service A"});
  console.log("Server A ======")
});

app.listen(port, () => {
  console.log(`Service A listening on port ${port} `);
});
