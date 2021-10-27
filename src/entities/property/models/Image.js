const sequelize = require('../../../database');
const {DataTypes} = require('sequelize');

const Image = sequelize.define('Images', {
  id: {
    type: DataTypes.STRING(24),
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Image;
