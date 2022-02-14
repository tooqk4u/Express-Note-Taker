// Dependencies required
const express = require("express");
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");

// Allow Heroku to convert server to port 80 or run default
const PORT = process.env.PORT || 3001;

// Instantiate the server using express js
const app = express();

// Parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// Parse incoming JSON data
app.use(express.json());

// MIDDLEWARE
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// Runs the server on the port
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
