import DataType from 'sequelize';
import Model from '../sequelize';

const UserCancellationType = Model.define('UserCancellationType', {

    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    listId: {
        type: DataType.INTEGER,
        allowNull: false
    },

    cancellationType: {
        type:DataType.INTEGER,
        allowNull: false,
    }

});

export default UserCancellationType;