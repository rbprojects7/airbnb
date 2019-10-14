// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import userLoginType from '../types/userLoginType';

// Authentication Utils
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { auth } from '../../config';

// Sequelize models
import { User, UserLogin, UserClaim, UserProfile, AdminUser, UserVerifiedInfo, EmailToken } from '../../data/models';
import { sendEmail } from '../../core/email/sendEmail';

const userLogin = {

  type: userLoginType,

  args: {
    email: { type: new NonNull(StringType) },
    password: { type: new NonNull(StringType) },
    isNewsLetterAccepted: { type: IntType },
  },

  async resolve({ request, response }, {
    email,
    password,
    isNewsLetterAccepted
  }) {

    let loginName = 'email';
    // Check if user already logged in
    if (!request.user) {
      // Check if the user is already exists
      const userLogin = await User.findOne({
        attributes: ['id', 'email', 'password'],
        where: { email: email },
      });

      // Let the user in
      if (userLogin) {
        if (bcrypt.compareSync(password, userLogin.password)) {
          const expiresIn = 60 * 60 * 24 * 180; // 180 days
          const token = jwt.sign({ id: userLogin.id, email: userLogin.email }, auth.jwt.secret, { expiresIn });
          response.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
          return {
            status: "success",
          };
        } else {
          return {
            status: "password",
          };
        }
      } else {
        // Check email is used by admin users
        // const getAdminUserId = await AdminUser.find({
        //   where: { email: email },
        // });

        // if (getAdminUserId) {
        //   return {
        //     status: 'email'
        //   };
        // }
        // // Create new User & Profile
        // const createUser = await User.create({
        //   email: email,
        //   emailConfirmed: true,
        //   password: User.generateHash(password),
        //   type: loginName,
        //   profile: {
        //     // displayName,
        //     // firstName: updatedFirstName,
        //     // lastName: updatedLastName,
        //     // dateOfBirth,
        //     isNewsLetterAccepted
        //   },
        //   userVerifiedInfo: {
        //     isEmailConfirmed: false
        //   },
        //   emailToken: {
        //     token: Date.now(),
        //     email
        //   }
        // }, {
        //     include: [
        //       { model: UserProfile, as: "profile" },
        //       { model: UserVerifiedInfo, as: 'userVerifiedInfo' },
        //       { model: EmailToken, as: 'emailToken' },
        //     ],
        //   });

        // if (createUser) {
        //   const expiresIn = 60 * 60 * 24 * 180; // 180 days
        //   const token = jwt.sign({ id: createUser.id, email: createUser.email }, auth.jwt.secret, { expiresIn });
        //   response.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
        //   const getToken = await EmailToken.findOne({ where: { userId: createUser.id } });
        //   let content = {
        //     token: getToken.dataValues.token,
        //     email: createUser.email
        //   };

        //   await sendEmail(createUser.email, 'welcomeEmail', content);
        //   return {
        //     emailToken: getToken.dataValues.token,
        //     status: "user created",
        //   };
        // } else {
        //   return {
        //     status: "failed",
        //   };
        // }
        return {
          status: "email",
        };
      }


    } else {
      if (request.user.admin == true) {
        return {
          status: "adminLoggedIn",
        };
      } else {
        return {
          status: "loggedIn",
        };
      }
    }
  },
};

export default userLogin;
