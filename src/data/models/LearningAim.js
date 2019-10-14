import DataType from 'sequelize';
import Model from '../sequelize';

const LearningAim = Model.define('LearningAim', {

  id: {
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV1,
  },

  listId: {
    type: DataType.INTEGER,
    allowNull: false
  },

  value: {
    type: DataType.STRING,
  },

  learningAimId: {
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true
  }

});

export default LearningAim;
