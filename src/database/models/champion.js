const Champion = (sequelize, DataTypes) => {
  const Champion = sequelize.define(
    "Champion",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      bornDate: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      timestamps: false,
      underscore: true,
      tableName: "Champions",
    }
  );

  Champion.associate = (models) => {
    Champion.hasOne(models.Statistic, {
      foreignKey: "champion_id",
      as: "statistics",
    });
    Champion.hasOne(models.Activitie, {
      foreignKey: "champion_id",
      as: "activities",
    });
    Champion.hasOne(models.File, {
      foreignKey: "champion_id",
      as: "files",
    });
    Champion.hasOne(models.Calendar, {
      foreignKey: "champion_id",
      as: "calendars",
    });
    Champion.hasMany(models.Practice, {
      foreignKey: "champion_id",
      as: "practice",
    });
  };

  return Champion;
};

module.exports = Champion;
