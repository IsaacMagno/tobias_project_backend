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

const getPracticeById = async (champion_id) => {
  const allPractice = await Practice.findAll({
    where: { champion_id },
    raw: true,
  });

  return allPractice;
};

const getAllFiles = async () => {
  const allFiles = await Files.findAll();

  return allFiles;
};

module.exports = {
  uploadFile,
  uploadPractice,
  getPracticeById,
  getAllFiles,
};
