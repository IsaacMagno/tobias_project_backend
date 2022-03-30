// const statisticsServices = require('../services/statisticsServices');


const updateStatistics = async(req, res) => {
  try {
    // const { id } = req.params;
    // const stats = Object.keys(req.body);
    // const { [stats]: value } = req.body;
    
    // const updateChampStatistics = await statisticsServices.updateStatistic(id, stats, value);

    return res.status(200).json({ updateChampStatistics })
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  updateStatistics
};