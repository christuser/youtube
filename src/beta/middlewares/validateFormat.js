const ytdl = require("ytdl-core");

validateFormat = async function (req, res, next) {
	try {
		// Get ID from URL
		let id = ytdl.getVideoID(req.query.url);

		// Get Video Info
		let info = await ytdl.getInfo(id);
		req.info = info;

		// Check if itag is available
		let format = ytdl.chooseFormat(info.formats, {
			quality: parseInt(req.query.itag),
		});
		req.format = format;
		next();
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

module.exports = validateFormat;
