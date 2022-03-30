const Champion = (sequelize, DataTypes) => {
  const Champion = sequelize.define("Champion", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    bornDate: DataTypes.STRING
  }, {
    timestamps: false,
    underscore: true,
    tableName: "Champions",
  })

  Champion.associate = (models) => {
    Champion.hasOne(models.Statistic,
      { foreignKey: "champion_id", as: "statistics" });
    Champion.hasOne(models.Activitie,
      { foreignKey: "champion_id", as: "activities" });
  };

  return Champion;
};

module.exports = Champion;