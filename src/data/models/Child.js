import DataType from 'sequelize';
import Model from '../sequelize';

const Child = Model.define('Child', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },

  parentId: {
    type: DataType.STRING,
    defaultValue: DataType.STRING,
    allowNull: false,
  },

  firstName: {
    type: DataType.STRING(255),
    allowNull: false,
  },

  lastName: {
    type: DataType.STRING(255),
    allowNull: false,
  },

  preferredName: {
    type: DataType.STRING(255),
    allowNull: true,
  },

  birthday: {
    type: DataType.STRING(255),
    allowNull: false,
  },

  email: {
    type: DataType.STRING(255),
    validate: { isEmail: true },
    allowNull: true,
  },

  preferences: {
    type: DataType.STRING(1024),
    allowNull: true,
  },

  status: {
    type: DataType.STRING(1024),
    allowNull: true,
  },

  childId: {
    type: DataType.INTEGER,
    unique: true,
    autoIncrement : true
  }

});

export default Child;
