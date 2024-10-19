import express from "express";

const app = express();
app.get("/", (req, res) => {
  res.send("Hello Bun Express!");
});
app.listen(3000);