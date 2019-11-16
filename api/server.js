require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const { logger } = require("../services/global/globalHelpers");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger);
server.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	next();
});

server.get("/", (req, res) => {
	res.status(200).json({ message: "Server is running" });
});

module.exports = server;
