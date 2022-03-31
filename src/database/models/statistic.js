module.exports = (sequelize, DataTypes) => {
  const Statistic = sequelize.define(
    "Statistic",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      strength: DataTypes.INTEGER,
      agility: DataTypes.INTEGER,
      inteligence: DataTypes.INTEGER,
      vitality: DataTypes.INTEGER,
      wisdow: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      underscored: true,
      tableName: "Statistics",
    }
  );

  Statistic.associate = (models) => {
    Statistic.belongsTo(models.Champion, {
      foreignKey: "champion_id",
      as: "champions",
    });
  };

  return Statistic;
};
