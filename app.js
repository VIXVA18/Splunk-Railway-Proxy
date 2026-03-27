const express = require("express");
const app = express();

// Railway requires this
const PORT = process.env.PORT || 8001;

// 🔁 Proxy to your original app (EC2)
const TARGET = "http://65.0.20.171:8001";

// Basic proxy
app.use("/", async (req, res) => {
  try {
    const url = TARGET + req.originalUrl;

    const response = await fetch(url);
    const data = await response.text();

    res.send(data);
  } catch (err) {
    res.status(500).send("Proxy error: " + err.message);
  }
});

// MUST use 0.0.0.0 (not your IP)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Proxy running on port ${PORT}`);
});
