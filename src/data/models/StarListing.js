import DataType from 'sequelize';
import Model from '../sequelize';

const StarListing = Model.define('StarListing', {

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

    verbalStrength: {
        type: DataType.INTEGER,
    },

    logicStrength: {
        type: DataType.INTEGER,
    },

    visualStrength: {
        type: DataType.INTEGER,
    },

    musicalStrength: {
        type: DataType.INTEGER,
    },

    bodyStrength: {
        type: DataType.INTEGER,
    },

    peopleStrength: {
        type: DataType.INTEGER,
    },

    innerStrength: {
        type: DataType.INTEGER,
    },

    nauralisticStrength: {
        type: DataType.INTEGER,
    },

    verbalDescription: {
        type: DataType.TEXT,
    },

    logicDescription: {
        type: DataType.TEXT,
    },

    visualDescription: {
        type: DataType.TEXT,
    },

    musicalDescription: {
        type: DataType.TEXT,
    },

    bodyDescription: {
        type: DataType.TEXT,
    },

    peopleDescription: {
        type: DataType.TEXT,
    },

    innerDescription: {
        type: DataType.TEXT,
    },

    nauralisticDescription: {
        type: DataType.TEXT,
    },


});

export default StarListing; 