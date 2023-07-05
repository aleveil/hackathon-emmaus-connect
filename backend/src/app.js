// import some node modules for later

const fs = require("node:fs");
const path = require("node:path");

// create express app

const express = require("express");

const app = express();

// use some application-level middlewares

app.use(express.json());

const cors = require("cors");

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

// serve the `backend/public` folder for public resources

app.use(express.static(path.join(__dirname, "../public")));

// import and mount the API routes

const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const phoneRouter = require("./routes/phones");
const securityMiddleware = require("./middleware/securityMiddleware");
const isAdminMiddleware = require("./middleware/isAdminMiddleware");

app.use("/login", authRouter);
app.use(securityMiddleware); // Comment this line when creating a new user
app.use("/phones", phoneRouter);
app.use(isAdminMiddleware); // Comment this line when creating a new user
app.use("/users", userRouter);

// serve REACT APP

const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  // serve REACT resources

  app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

  // redirect all requests to the REACT index file

  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

// ready to export

module.exports = app;
