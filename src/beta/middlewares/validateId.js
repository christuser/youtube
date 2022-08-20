const ytdl = require("ytdl-core");

const validateURL = (req, res, next) => {
	try {
		const validurl = ytdl.validateURL(req.query.url);
		if (validurl) {
			next();
		} else {
			throw Error("Invalid YouTube URL.");
		}
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};

module.exports = validateURL;
