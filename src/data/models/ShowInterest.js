import DataType from 'sequelize';
import Model from '../sequelize';

const ShowInterest = Model.define('ShowInterest', {

  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement : true
  }, 
  listId: {
    type: DataType.INTEGER,
    allowNull: false
  },
  beforeSunday: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  middleSunday: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  afterSunday: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  beforeMonday: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  middleMonday: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  afterMonday: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  beforeTuesday: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  middleTuesday: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  afterTuesday: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  beforeWednesday: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  middleWednesday: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  afterWednesday: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  beforeThursday: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  middleThursday: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  afterThursday: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  beforeFriday: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  middleFriday: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  afterFriday: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  beforeSaturday: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  middleSaturday: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  afterSaturday: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
 
});

export default ShowInterest;