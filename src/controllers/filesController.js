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

const uploadPractice = async (req, res) => {
  try {
    const filesName = req.files;
    const { id } = req.params;

    const result = await Promise.all(
      filesName.map(async (file) => {
        return await filesServices.uploadPractice(file.filename, id);
      })
    );

    return res.status(200).json(result);
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
  uploadPractice,
  getAllFiles,
};
