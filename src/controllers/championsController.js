const championsServices = require('../services/championsServices');

const getAll = async(_req, res) => {
  try {
    const champions = await championsServices.getAll();

    return res.status(200).json({ champions });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};


module.exports = {
  getAll,
};
