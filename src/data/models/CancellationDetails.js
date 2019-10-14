import DataType from 'sequelize';
import Model from '../sequelize';

const CancellationDetails = Model.define('CancellationDetails', {

  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement : true
  },

  reservationId: {
    type: DataType.INTEGER,
    allowNull: false,
  },

  cancellationPolicy: {
    type: DataType.STRING,
  },

  refundToGuest: {
    type: DataType.FLOAT,
  },

  payoutToHost: {
    type: DataType.FLOAT,
  },

  guestServiceFee: {
    type: DataType.FLOAT,
  },

  hostServiceFee: {
    type: DataType.FLOAT,
  },

  total: {
    type: DataType.FLOAT,
    allowNull: false,
  },

  currency: {
    type: DataType.STRING,
    allowNull: false,
  },

  cancelledBy: {
    type: DataType.ENUM('host', 'guest'),
  },

  sessionId: {
    type: DataType.STRING,
    allowNull: false,
  },

  learnerId: {
    type: DataType.STRING,
    allowNull: false,
  },

  groupId: {
    type: DataType.INTEGER,
  },

  blockId: {
    type: DataType.STRING,
  },

  isRefunded: {
    type: DataType.INTEGER,
  },

  date: {
    type: DataType.STRING,
  },

});

export default CancellationDetails;