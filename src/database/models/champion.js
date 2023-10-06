const Champion = (sequelize, DataTypes) => {
  const Champion = sequelize.define(
    "Champion",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      bornDate: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      title: DataTypes.STRING,
      xp: DataTypes.FLOAT,
      xpBoost: DataTypes.FLOAT,
      level: DataTypes.INTEGER,
      daystreak: DataTypes.INTEGER,
      lastDaystreakUpdate: DataTypes.DATE,
      biography: DataTypes.TEXT,
      daystreakShield: DataTypes.INTEGER,
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
    Champion.hasMany(models.Task, {
      foreignKey: "champion_id",
      as: "task",
    });
  };

  return Champion;
};

module.exports = Champion;
