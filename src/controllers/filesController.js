const filesServices = require("../services/filesServices");

const uploadFile = async (req, res) => {
  try {
    const fileName = req.file.filename;

    const fakeId = 14;

    const fileUploaded = await filesServices.uploadFile(fileName, fakeId);

    return res.status(200).json(fileUploaded);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const uploadPractice = async (req, res) => {
  try {
    const fileName = req.file.filename;
    const { id } = req.params;

    const practiceUpload = await filesServices.uploadPractice(fileName, id);

    return res.status(200).json(practiceUpload);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getPractice = async (req, res) => {
  try {
    const { id } = req.params;

    const allPractice = await filesServices.getPracticeById(id);

    return res.status(200).json(allPractice);
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
  getPractice,
  getAllFiles,
};
