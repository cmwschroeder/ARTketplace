const router = require('express').Router();
const { User } = require('../../models');

//route that creates a user
router.post('/', async (req, res) => {
    try{
        //create a user instance in the database
        const userData = await User.create({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        //save the fact that we are logged in and the user id to session storage
        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;
      
            res.status(200).json(userData);
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//route that handles login
router.post('/login', async (req, res) => {
    try{
        //get the user that matches the email we recieved
        const userData = await User.findOne({where: { email: req.body.email}});
    
        //send a response back if the user doesn't exist in the database
        if(!userData) {
            res.status(400).json("Incorrect email or password, please try again");
            return;
        }

        const validPassword = userData.checkPassword(req.body.password);
        //now that we have the number we need to check the password
        if(!validPassword) {
            res.status(404).json("Incorrect email or password, please try again");
            return;
        }
    
        //login was valid, save username and logged in status to session storage
        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;
          
            res.json("Logged in");
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//Route that handles logout
router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;