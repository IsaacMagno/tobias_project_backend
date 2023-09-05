const championsServices = require("../services/championsServices");

const getAll = async (_req, res) => {
  try {
    const champions = await championsServices.getAll();

    return res.status(200).json({ champions });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const createChampion = async (req, res) => {
  try {
    const championData = req.body;

    const createdChampion = await championsServices.createChampion(
      championData
    );

    return res.status(200).json({ createdChampion });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const championLogin = async (req, res) => {
  try {
    const championData = req.body;

    const validLogin = await championsServices.validateChampionLogin(
      championData
    );

    return res.status(200).json({ validLogin });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  getAll,
  createChampion,
  championLogin,
};
