const activitiesServices = require('../services/activitiesServices');
const statisticsServices = require('../services/statisticsServices');


const updateActivities = async(req, res) => {
  try {
    const { id } = req.params;
    const stats = Object.keys(req.body);
    const { [stats]: value } = req.body;

    const updateChampActivities = await activitiesServices.updateActivities(id, stats, value);
    await statisticsServices.updateStatistic(updateChampActivities);

    return res.status(200).json({ updateChampActivities })
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  updateActivities
};