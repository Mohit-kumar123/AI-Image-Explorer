import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:5173/'); // or send user info as JSON
  }
);

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

router.get('/current_user', (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.json(null);
  }
});

export default router;