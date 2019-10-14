import DataType from 'sequelize';
import Model from '../sequelize';

const SessionTime = Model.define('SessionTime', {

  id: {
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV1,
  },

  reservationId: {
    type: DataType.INTEGER,
  },

  blockId: {
    type: DataType.UUID,
  },

  date: {
    type: DataType.STRING,
    allowNull: false
  },

  startTime: {
    type: DataType.STRING,
    allowNull: false
  },

  endTime: {
    type: DataType.STRING,
    allowNull: false
  },

  blockUniqueId: {
    type: DataType.INTEGER,
  },

  isPayoutCompleted: {
    type: DataType.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
 
});

export default SessionTime;
