const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const { logger } = require("../services/global/globalHelpers");
const authRouter = require('../services/auth/authRouter');

const server = express();
const { secure, origin } = require('./config');

server.use(helmet());
server.use(cors({
  origin,
  credentials: true // cookies?
}));
server.use(express.json());
server.use(logger);

server.get("/", (req, res) => {
	res.status(200).json({ message: "Server is running" });
});

server.use("/api/auth", authRouter);

module.exports = server;
