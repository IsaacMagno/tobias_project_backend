module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: DataTypes.STRING,
      date: DataTypes.STRING,
      display: DataTypes.STRING,
      backgroundColor: DataTypes.STRING,
    },
    {
      timestamps: false,
      underscored: true,
      tableName: "Events",
    }
  );

  Event.associate = (models) => {
    Event.belongsTo(models.Calendar, {
      foreignKey: "calendar_id",
    });
  };

  return Event;
};
