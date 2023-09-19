module.exports = (sequelize, DataTypes) => {
  const Activitie = sequelize.define(
    "Activitie",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      kmRun: DataTypes.FLOAT,
      jumpRope: DataTypes.FLOAT,
      kmBike: DataTypes.FLOAT,
      upperLimb: DataTypes.FLOAT,
      abs: DataTypes.FLOAT,
      lowerLimb: DataTypes.FLOAT,
      meals: DataTypes.FLOAT,
      drinks: DataTypes.FLOAT,
      sleep: DataTypes.FLOAT,
      study: DataTypes.FLOAT,
      meditation: DataTypes.FLOAT,
      reading: DataTypes.FLOAT,
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
