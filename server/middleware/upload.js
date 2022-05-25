const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-any-name-${file.orginalname}`;
      return filename;
    }

    return {
      buckerName: "photos",
      filename: `${Date.now()}-any-name-${file.orginalname}`,
    };
  },
});

module.exports = multer({ storage });
