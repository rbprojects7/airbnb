import DataType from 'sequelize';
import Model from '../sequelize';

const Cancellation = Model.define('Cancellation', {

  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },

  policyName: {
    type: DataType.STRING,
  },

  policyContent: {
    type: DataType.TEXT,
  },

  priorDays: {
    type: DataType.INTEGER,
  },

  accommodationPriorCheckIn: {
    type: DataType.FLOAT,
  },

  accommodationBeforeCheckIn: {
    type: DataType.FLOAT,
  },

  accommodationDuringCheckIn: {
    type: DataType.FLOAT,
  },

  guestFeePriorCheckIn: {
    type: DataType.FLOAT,
  },

  guestFeeBeforeCheckIn: {
    type: DataType.FLOAT,
  },

  guestFeeDuringCheckIn: {
    type: DataType.FLOAT,
  },

  hostFeePriorCheckIn: {
    type: DataType.FLOAT,
  },

  hostFeeBeforeCheckIn: {
    type: DataType.FLOAT,
  },

  hostFeeDuringCheckIn: {
    type: DataType.FLOAT,
  },

  isEnable: {
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  }

});

export default Cancellation;