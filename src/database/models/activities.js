module.exports = (sequelize, DataTypes) => {
  const Activitie = sequelize.define(
    "Activitie",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      kmRun: DataTypes.INTEGER,
      jumpRope: DataTypes.INTEGER,
      kmBike: DataTypes.INTEGER,
      upperLimb: DataTypes.INTEGER,
      abs: DataTypes.INTEGER,
      lowerLimb: DataTypes.INTEGER,
      meals: DataTypes.INTEGER,
      drinks: DataTypes.INTEGER,
      study: DataTypes.INTEGER,
      meditation: DataTypes.INTEGER,
      reading: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      underscored: true,
      tableName: "Activities",
    }
  );

  Activitie.associate = (models) => {
    Activitie.belongsTo(models.Champion, {
      foreignKey: "champion_id",
      as: "champions",
    });
  };

  return Activitie;
};
