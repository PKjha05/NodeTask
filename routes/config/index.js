import Passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from './../../model/userModel.js';
const jwtOptions = {
  secretOrKey: 'your_secret_key',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

Passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));


export default Passport;
