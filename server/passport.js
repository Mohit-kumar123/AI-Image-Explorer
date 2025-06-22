import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from './mongodb/models/User.js';

// Configure Google OAuth Strategy


import fs from 'fs';

// console.log('Exists .env?', fs.existsSync('.env')); 
// console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID , // Load from environment variables
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Load from environment variables
      callbackURL: '/auth/google/callback', // OAuth2 callback URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // Create a new user if not found
          user = await User.create({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0]?.value, // Ensure email is valid
            photo: profile.photos[0]?.value, // Ensure photo URL is valid
          });
        }

        return done(null, user); // Pass the user to the done callback
      } catch (err) {
        console.error('Error in GoogleStrategy:', err);
        return done(err, null); // Handle errors gracefully
      }
    }
  )
);

// Serialize the user to store their ID in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize the user by finding them from the database using their ID
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    console.error('Error in deserializeUser:', err);
    done(err, null); // Handle errors gracefully
  }
});

export default passport;
