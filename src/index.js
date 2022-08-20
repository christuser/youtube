const express = require("express");
const app = express();

const apiRouter = require("./api");
app.use(apiRouter);

const ytdlRouter = require("./beta/ytdl");
app.use(ytdlRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("Server is running on port", port);
});

// Demo URL
// http://localhost:3000/download?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DcQ_b9i2j0n8
