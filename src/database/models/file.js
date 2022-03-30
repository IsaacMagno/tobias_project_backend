module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define("File", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    image: DataTypes.STRING,
  },
  { 
    timestamps: false,
    underscore: true,
    tableName: "Files",
  });

  File.associate = (models) => {
    File.belongsTo(models.Champion,
      { foreignKey: "champion_id", as: "pictures" });
  };

  return File;
}
