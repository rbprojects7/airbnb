import DataType from 'sequelize';
import Model from '../sequelize';

const Reservation = Model.define('Reservation', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    listId: {
        type: DataType.INTEGER,
        allowNull: false
    },

    hostId: {
        type: DataType.STRING,
        allowNull: false
    },

    guestId: {
        type: DataType.STRING,
        allowNull: true
    },

    checkIn: {
        type: DataType.DATE,
        allowNull: true,
    },

    checkOut: {
        type: DataType.DATE,
        allowNull: true,
    },

    guests: {
        type: DataType.INTEGER,
        defaultValue: 1,
    },

    message: {
        type: DataType.TEXT,
    },

    basePrice: {
        type: DataType.FLOAT,
        allowNull: false,
    },

    cleaningPrice: {
        type: DataType.FLOAT,
    },

    currency: {
        type: DataType.STRING,
        allowNull: false,
    },

    discount: {
        type: DataType.FLOAT,
    },

    discountType: {
        type: DataType.STRING,
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

    confirmationCode: {
        type: DataType.INTEGER,
    },

    payoutId: {
        type: DataType.INTEGER,
    },

    reservationState: {
        type: DataType.ENUM('pending', 'expired', 'approved', 'declined', 'completed', 'cancelled'),
        defaultValue: 'pending',
    },

    paymentState: {
        type: DataType.ENUM('pending', 'completed'),
        defaultValue: 'pending',
    },

    paymentMethodId: {
        type: DataType.INTEGER
    },
    isParentEnable: {
        type: DataType.BOOLEAN,
        defaultValue: false,
    },
    startTime: {
        type: DataType.STRING,
        allowNull: false
    },
    endTime: {
        type: DataType.STRING,
        allowNull: false
    },
    blockId: {
        type: DataType.UUID,
    },
    blockUniqueId: {
        type: DataType.INTEGER
    },
    totalSessionHours: {
        type: DataType.FLOAT,
    },
    isSent: {
        type: DataType.BOOLEAN,
        defaultValue: false,
    },
});

export default Reservation; 