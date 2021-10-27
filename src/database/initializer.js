const User = require('../entities/users/models/Users');
const Property = require('../entities/property/models/Property');
const Image = require('../entities/property/models/Image');
const sequelize = require('./index');

// The purpose of this file is to initialize the tables relations and sync them
// with the DB
Image.belongsTo(Property);
Property.hasMany(Image, {
  onDelete: 'cascade',
  onUpdate: 'cascade',
  hooks: true,
});

Property.belongsTo(User);
User.hasMany(Property, {
  onDelete: 'cascade',
  onUpdate: 'cascade',
  hooks: true,
});

// force - This creates the table, dropping it first if it already existed
// alter - This checks what is the current state of the table in the  database,
// and then performs the necessary changes in the table to make it match the
// model.
sequelize
  .sync({alter: false})
  .then(() => {
    console.log('Criou tudo');
  })
  .catch((err) => console.log(err));

module.exports = {
  User,
  Property,
  Image,
};
