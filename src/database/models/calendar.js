const Calendar = (sequelize, DataTypes) => {
  const Calendar = sequelize.define(
    "Calendar",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      red_day: DataTypes.INTEGER,
      yellow_day: DataTypes.INTEGER,
      green_day: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      underscore: true,
      tableName: "Calendars",
    }
  );

  Calendar.associate = (models) => {
    Calendar.belongsTo(models.Champion, {
      foreignKey: "champion_id",
      as: "champions",
    });
    Calendar.hasMany(models.Event, { foreignKey: "calendar_id", as: "events" });
  };

  return Calendar;
};

module.exports = Calendar;
