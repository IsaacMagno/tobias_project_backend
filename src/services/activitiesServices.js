const { Activitie } = require("../database/models");

const updateActivities = async (champion_id, stats, value) => {
  const oldStats = await Activitie.findAll({
    where: { champion_id },
    raw: true,
  });

  const { [stats]: oldStat } = oldStats[0];

  const statsUpdated = await Activitie.update(
    { [stats]: value + oldStat },
    { where: { champion_id } }
  ).then(() => Activitie.findAll({ where: { champion_id }, raw: true }));

  return statsUpdated;
};

module.exports = {
  updateActivities,
};
