const path = require("path");
const router = require("express").Router();

// GET request for index.html page
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

// GET request for note.html page
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/notes.html"));
});

// GET request for default index.html if 2 previous requests fail
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

// export router
module.exports = router;
