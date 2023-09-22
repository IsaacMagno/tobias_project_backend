const championsServices = require("../services/championsServices");

const getChampions = async (req, res) => {
  try {
    const { id } = req.params;

    const champions = await championsServices.getChampions(id);

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

const updateChampionBiography = async (req, res) => {
  try {
    const { id } = req.params;
    const championBio = req.body;

    const updateChampBio = await championsServices.updateChampionBiography(
      championBio
    );

    return res.status(200).json({ validLogin });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  getChampions,
  createChampion,
  championLogin,
  updateChampionBiography,
};
