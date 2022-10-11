module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("Champions", "username", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("Champions", "password", {
        type: Sequelize.STRING,
      }),
      queryInterface.removeColumn("Champions", "googleId"),
    ]);
  },

  down(queryInterface, _Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("Champions", "username"),
      queryInterface.removeColumn("Champions", "password"),
      queryInterface.addColumn("Champions", "googleId", {
        type: Sequelize.STRING,
      }),
    ]);
  },
};
