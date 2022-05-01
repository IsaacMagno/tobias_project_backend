module.exports = (sequelize, DataTypes) => {
  const Practice = sequelize.define(
    "Practice",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      image: DataTypes.STRING,
    },
    {
      timestamps: false,
      underscore: true,
      tableName: "Practice",
    }
  );

  Practice.associate = (models) => {
    Practice.belongsTo(models.Champion, {
      foreignKey: "champion_id",
      as: "champions",
    });
  };

  return Practice;
};
