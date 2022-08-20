const ytdl = require("ytdl-core");
const express = require("express");
const router = express.Router();

// Public Directory
const path = require("path");
const publicPath = path.join(__dirname + "/public");
router.use(express.static(publicPath));

const validateFormat = require("./middlewares/validateFormat");
const validateURL = require("./middlewares/validateId");

// Download Page
router.get("/watch", validateURL, async (req, res) => {
	try {
		res.sendFile(publicPath + "/download.html");
	} catch (error) {
		res.sendFile(publicPath + "/index.html");
	}
});

router.get("/info", async (req, res) => {
	try {
		const info = await ytdl.getInfo(req.query.url);

		res.send({ formats: info.formats, videoDetails: info.videoDetails });
	} catch (error) {
		res.send({ message: error.message });
	}
});

router.get("/download", validateURL, validateFormat, async (req, res) => {
	const info = req.info;
	const format = req.format;
	try {
		// https://expressjs.com/en/4x/api.html#res.attachment
		res.attachment(info.videoDetails.title + "." + format.container);

		// Stream Download to client
		ytdl
			.downloadFromInfo(info, {
				quality: format.itag,
			})
			.pipe(res)
			.on("pipe", (e) => {
				res.send({ message: "Stream started" });
			});
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
});

module.exports = router;
