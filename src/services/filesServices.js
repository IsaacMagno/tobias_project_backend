const { File, Practice } = require("../database/models");

const uploadFile = async (fileName, champion_id) => {
  const file = await File.create({
    image: fileName,
    champion_id,
  });

  return file;
};

const uploadPractice = async (fileName, champion_id) => {
  const file = await Practice.create({
    image: fileName,
    champion_id,
  });

  return file;
};

const getAllFiles = async () => {
  const allFiles = await File.findAll();

  return allFiles;
};

module.exports = {
  uploadFile,
  uploadPractice,
  getAllFiles,
};
