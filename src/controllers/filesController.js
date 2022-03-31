const filesServices = require("../services/filesServices");

const uploadFile = async (req, res) => {
  try {
    const fileName = req.file.filename;

    const fakeId = 3;

    const fileUploaded = await filesServices.uploadFile(fileName, fakeId);

    return res.status(200).json(fileUploaded);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getAllFiles = async (_req, res) => {
  try {
    const allFiles = await filesServices.getAllFiles();

    return res.status(200).json(allFiles);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  uploadFile,
  getAllFiles,
};
