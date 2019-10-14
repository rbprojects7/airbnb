import DataType from 'sequelize';
import Model from '../sequelize';

const TransactionHistory = Model.define('TransactionHistory', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    reservationId: {
        type: DataType.INTEGER,
    },

    userId: {
        type: DataType.UUID,
        allowNull: false
    }, 

    payoutId: {
        type: DataType.INTEGER,
        allowNull: false
    },

    payoutEmail: {
        type: DataType.STRING,
        allowNull: false
    },

    amount: {
        type: DataType.FLOAT,
        allowNull: false,
    },

    fees: {
        type: DataType.FLOAT,
        allowNull: true,
    },

    currency: {
        type: DataType.STRING,
        allowNull: false,
    },

    transactionId: {
        type: DataType.STRING,
    },

    paymentMethodId: {
        type: DataType.INTEGER
    },

    blockId: {
        type: DataType.STRING,
    },

    sessionDate: {
        type: DataType.STRING,
    },

    learnersParticipated: {
        type: DataType.INTEGER,
    },

    listId: {
        type: DataType.INTEGER,
    },
    
});

export default TransactionHistory;  