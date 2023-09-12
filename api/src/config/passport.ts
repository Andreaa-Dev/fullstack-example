import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import GoogleTokenStrategy from "passport-google-id-token";

import UserServices from "../services/users";

import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;
const clientId = process.env.GOOGLE_CLIENT_ID as string;

export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload, done) => {
    const userEmail = payload.email;
    const foundUser = await UserServices.findUserByEmail(userEmail);
    done(null, foundUser);
  }
);

//google passport
export const googleStrategy = new GoogleTokenStrategy(
  {
    clientID: clientId,
  },
  // after the credential send from front end match from Google system
  async function (parsedToken: any, googleId: string, done: any) {
    const userPayload = {
      email: parsedToken?.payload?.email,
      firstName: parsedToken?.payload?.given_name,
      lastName: parsedToken?.payload?.family_name,
      avatar: parsedToken?.payload?.picture,
    };
    const foundUser = await UserServices.findOrCreate(userPayload);
    done(null, foundUser);
  }
);
