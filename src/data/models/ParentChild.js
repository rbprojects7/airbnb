import DataType from 'sequelize';
import Model from '../sequelize';

const ParentChild = Model.define('ParentChild', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataType.UUID,
        allowNull: false
    },
    reservationId: {
        type: DataType.INTEGER,
    },
    isParent: {
        type: DataType.BOOLEAN,
        defaultValue: false,
    },
    childId: {
        type: DataType.UUID,
        allowNull: true
    },
    blockUniqueId:
    {
        type: DataType.INTEGER
    },
    isReview: {
        type: DataType.BOOLEAN,
        defaultValue: false, 
    }
    
});

export default ParentChild;
