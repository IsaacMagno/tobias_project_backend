module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      goal: DataTypes.INTEGER,
      month: DataTypes.INTEGER,
      week: DataTypes.INTEGER,
      actual: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      underscored: true,
      tableName: "Tasks",
    }
  );

  Task.associate = (models) => {
    Task.belongsTo(models.Champion, {
      foreignKey: "champion_id",
      as: "champions",
    });
  };

  return Task;
};
