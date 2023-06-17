const router = require('express').Router();
const passport = require('passport');

router.get('/logout', (req, res) => {
    // handle with passport
    res.send('logging out');
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile');
});


module.exports = router;