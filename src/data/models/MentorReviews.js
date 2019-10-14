import DataType from 'sequelize';
import Model from '../sequelize';

const MentorReviews = Model.define('MentorReviews', {

    mentorReviewId: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    blockId: {
        type: DataType.STRING,
    },

    blockUniqueId:
    {
        type: DataType.INTEGER,
    },

    reservationId: {
        type: DataType.INTEGER,
        allowNull: true,
    },

    listId: {
        type: DataType.INTEGER,
        allowNull: true,
    },

    mentorId: {
        type: DataType.UUID,
        allowNull: true,
    },

    parentId: {
        type: DataType.UUID,
        allowNull: true,
    },

    childId: {
        type: DataType.INTEGER,
        allowNull: true,
    },

    reservationlearningId: {
        type: DataType.INTEGER,
        allowNull: false,
    },

    learningAimReviewRating: {
        type: DataType.INTEGER,
        allowNull: false,
    },

    learningAimsReviewContent: {
        type: DataType.TEXT,
    },
    
    isParentEnable: {
        type: DataType.BOOLEAN,
        defaultValue: false,
    },
    isReviewed: {
        type: DataType.BOOLEAN,
        defaultValue: false,
    },
});

export default MentorReviews;  