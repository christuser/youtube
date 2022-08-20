const router = require("express").Router();
const https = require("https");
var http = require("http");
const { v4: uuidv4 } = require("uuid");
const ytdl = require("ytdl-core");

router.get("/view", async (req, res) => {
	try {
		if (!req.query.url) {
			return res.send({
				message:
					"Append the url, example: christyoutube.herokuapp.com/?url=https://www.youtube.com/watch?v=Vw6utYElVFg",
			});
		}
		const filename = uuidv4();
		var client = https;

		const v_id = req.query.url.split("v=")[1];
		const info = await ytdl.getInfo(req.query.url);
		const format = info.formats.filter(
			(f) => f.itag === parseInt(req.query.itag)
		);

		var url = new URL(format[0].url);
		client = url.protocol == "https:" ? client : http;

		client.get(url, async function (resp) {
			try {
				// chunk received from the server
				const contentType = resp.headers["content-type"].split("/")[1];
				// console.log("content-length:", res.headers["content-length"]);

				res.set({
					"Content-Type": "video/mp4",
					// "Content-Disposition": `attachment;  Filename= ${filename}.${contentType}`, // Enable this to download as file
					"Content-Length": resp.headers["content-length"],
				});

				resp.pipe(res);
			} catch (error) {
				res.send({ message: error.message });
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message });
	}
});

module.exports = router;
