// GrpahQL
import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLFloat as FloatType,
} from 'graphql';
import sequelize from '../../sequelize';
import { ParentChild, UserProfile, Child } from '../../models';
import ParentChildType from '../../types/ParentChildType';


const getParentChild = {

    type: ParentChildType,

    args: {
        blockUniqueId: { type: new NonNull(IntType) },
        id: { type: IntType },
    },

    async resolve({ request }, { blockUniqueId, id }) {
        if (request.user) {
            let where = { blockUniqueId };
            let learnerName, learnerDOB;
            let parentEnable = false;

            const getAllData = await ParentChild.findAll({
                where,
                order: [['id', 'ASC']]
            });

            if (id) {
                where = {
                    blockUniqueId,
                    id,
                };
            }

            const data = await ParentChild.findOne({
                where,
                order: [['id', 'ASC']],
                raw: true
            });

            if (data) {

                parentEnable = data.isParent;

                if (parentEnable) {
                    //console.log("userId==",data.userId);
                    const parentData = await UserProfile.findOne({
                        where: { userId: data.userId }
                    });
                    //console.log("parentData==",parentData);
                    if (parentData) {
                        learnerName = parentData.displayName;
                        learnerDOB = parentData.dateOfBirth;
                    }

                }
                else {
                    const childData = await Child.findOne({
                        where: { childId: data.childId }
                    });
                    //console.log("childData==",childData.dateOfBirth);
                    if (childData) {
                        learnerName = childData.firstName + ' ' + childData.lastName;
                        learnerDOB = childData.birthday;
                    }

                }

            }
            // console.log("learnerDOB==",learnerDOB);
            let selectedIndex = getAllData.findIndex(o => (o.id === data.id));
            let prevId = getAllData[selectedIndex - 1] ? getAllData[selectedIndex - 1].id : null;
            let nextId = getAllData[selectedIndex + 1] ? getAllData[selectedIndex + 1].id : null;

            return {
                id: data.id,
                userId: data.userId,
                reservationId: data.reservationId,
                isParent: data.isParent,
                childId: data.childId,
                blockUniqueId: data.blockUniqueId,
                prevId: prevId,
                nextId: nextId,
                learnerName: learnerName,
                learnerDOB: learnerDOB,
                isReview: data.isReview
            }

        } else {
            return {
                status: 'notLoggedIn'
            };
        }
    },
};

export default getParentChild;

/**
query getParentChild ($blockUniqueId: Int!,$id: Int){
  getParentChild(blockUniqueId: $blockUniqueId, id: $id){
   id
   userId
   reservationId
   isParent
   childId
   blockUniqueId
   prevId
   nextId
   learnerName
   learnerDOB
   
}
}
**/