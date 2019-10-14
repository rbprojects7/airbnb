import DataType from 'sequelize';
import Model from '../sequelize';

const Block = Model.define('Block', {

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

  price: {
    type: DataType.STRING,
    allowNull: false
  },

  blockUniqueId: {
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true
  },

  blockState: {
    type: DataType.ENUM('pending', 'booked', 'expired', 'approved', 'declined', 'completed', 'cancelled'),
    defaultValue: 'pending',
  },

});

export default Block;
