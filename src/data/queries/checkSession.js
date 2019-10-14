import CheckSessionType from '../types/CheckSessionType';

const checkSession = {

    type: CheckSessionType,

    async resolve({ request, response }) {
        if (request.user) {
            return { status: 200 };
        } else {
            return { status: 400 };
        }
    },
};

export default checkSession;