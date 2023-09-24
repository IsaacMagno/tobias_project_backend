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

    const updatedChampBio = await championsServices.updateChampionBiography(
      id,
      championBio
    );

    return res.status(200).json({ updatedChampBio });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const updateChampionExp = async (req, res) => {
  try {
    const { id } = req.params;
    const championExp = req.body;

    const updatedChampionExp = await championsServices.updateChampionExp(
      id,
      championExp
    );

    return res.status(200).json({ updatedChampionExp });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const updateChampionDaystreak = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedChampionDaystreak =
      await championsServices.updateChampionDaystreak(id);

    return res.status(200).json({ updatedChampionDaystreak });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  getChampions,
  createChampion,
  championLogin,
  updateChampionBiography,
  updateChampionExp,
  updateChampionDaystreak,
};
