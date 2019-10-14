import DataType from 'sequelize';
import Model from '../sequelize';

const ReservationLearningAim = Model.define('ReservationLearningAim', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    hostId: {
        type: DataType.STRING,
        allowNull: false
    },

    guestId: {
        type: DataType.STRING,
        allowNull: true
    },

    reservationId:
    {
        type: DataType.INTEGER,
        allowNull: false
    },

    listId: {
        type: DataType.INTEGER,
        allowNull: false
    },

    value: {
        type: DataType.TEXT,
    },

    blockId:
    {
        type: DataType.STRING
    },

    blockUniqueId: {
        type: DataType.INTEGER,
    }
});

export default ReservationLearningAim;
