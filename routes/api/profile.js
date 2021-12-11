const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const request = require('request');
const config = require('config');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//GET api/profile/me
// GET api/profiles - all profile users
//me - user id thats in the token
router.get('/me', auth, async (req, res) => {

    try {

        const profile = await Profile.findOne({ user: req.user.id }).populate({model: 'User', path: 'user', select: ['name', 'avatar']});

        if(!profile) {

            return res.status(400).json({ message: 'There is no profile for this user' });
        }

        res.send(profile);


    }catch(err) {

        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// POST api/profile
// Create or update user profile
router.post('/', [auth, [

 check('status', 'Status is required').not().isEmpty(),
 check('skills', 'Skills is required').not().isEmpty()

]], async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array() });
    }

    const {company, website, location, bio, status, githubusername, skills, facebook, twitter, instagram, linkedin } = req.body;

    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills) {

        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    //Bield social object
    profileFields.social = {};
    
    if(facebook) profileFields.social.facebook = facebook;
    if(twitter) profileFields.social.twitter = twitter;
    if(instagram) profileFields.social.instagram = instagram;
    if(linkedin) profileFields.social.linkedin = linkedin;

     try {

        let profile = await Profile.findOne({ user: req.user.id });

        if(profile) {

            //Update
            profile = await Profile.findOneAndUpdate(
                
                {user: req.user.id}, 
                {$set: profileFields},
                {new: true}
            )

            return res.send(profile);
        }

        //Create Profile
        profile = new Profile(profileFields);

        await profile.save();

        res.send(profile);


     }catch(err) {

        console.error(err.message);
        res.status(500).send('Server Error');
     }


})


//GET api/profile
// Get all profiles
router.get('/', async (req, res) => {

    try {

        const profiles = await Profile.find().populate({model: 'User', path: 'user', select: ['name', 'avatar']});

        if(!profiles) {

            return res.status(400).json({ message: 'There is no profiles for this user' });
        }

        res.send(profiles);


    }catch(err) {

        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


// GET api/profile/user/:user_id
// Get profile by user ID
router.get('/user/:user_id', async (req, res) => {

    try {

        const profile = await Profile.findOne({user: req.params.user_id}).populate({ model: 'User', path: 'user', select: ['name', 'avatar']});

        if(!profile) {

            return res.status(400).json({message: 'There is no profile for this user'});
        }

        res.send(profile);


    }catch(err) {

        console.error(err.message);

        if(err.kind == 'ObjectId') {

            return res.status(400).json({ message: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
})


// GET api/profile/github/:username
// Get user repos from Github
router.get('/github/:username', async (req, res) => {

    try {

        const options = {

          uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubClientSecret')}`,

          method: 'GET',
          headers: { 'user-agent': 'node.js' }
        }

        request(options, (error, response, body) => {

            if(error) console.error(error);

            if(response.statusCode !== 200) {

               return res.status(404).json({ message: 'No Github profile found' });
            }

            res.send(JSON.parse(body));
        })
        
    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server Error');
        
    }


})



// PUT api/profile/experience
// Add profile experience
router.put('/experience', [auth, [

   check('title', 'Title is required').not().isEmpty(),
   check('company', 'Company is required').not().isEmpty(),
  // check('to', 'To date is required').not().isEmpty(),
   check('from', 'From date is required').not().isEmpty()


]], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array() });
    }

    const {title, company, location, from, to, current, description } = req.body;

    const newExperience = {

        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {

        const profile = await Profile.findOne({ user: req.user.id });

        profile.experience.unshift(newExperience);

        await profile.save();

        res.send(profile);


    }catch(err) {

        console.error(err.message);
        res.status(500).send('Server Error');
    }

})


// PUT api/profile/education
// Add profile education
router.put('/education', [auth, [

check('school', 'School is required').not().isEmpty(),
check('degree', 'Degree is required').not().isEmpty(),
check('fieldofstudy', 'Field of study is required').not().isEmpty(),
check('from', 'From date is required').not().isEmpty()

]], async (req, res) => {

   const errors = validationResult(req);
   if(!errors.isEmpty()) {

    return res.status(400).json({ errors: errors.array() })
   }

   const {school, degree, fieldofstudy, from , to, current, description} = req.body;

   const newEducation = {

    school,
    degree,
    fieldofstudy, 
    from,
    to,
    current,
    description
   }


   try {

    const profile = await Profile.findOne({ user: req.user.id });

    profile.education.unshift(newEducation);

    await profile.save();

    res.send(profile);
       
   } catch (err) {

    console.error(err.message);
    res.status(500).send('Server Error');
       
   }
})

//DELETE api/education
// Delete education
router.delete('/education/:edu_id', auth, async (req, res) => {

    try {

        const profile = await Profile.findOne({ user: req.user.id });

        //Get removeIndex
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.send(profile);
        
    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server Error');
        
    }
})


// DELETE api/profile
// Delete profile, user & posts
router.delete('/', auth, async (req, res) => {

    try {
  //Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id });

   //Remove User
    await User.findOneAndRemove({_id: req.user.id})



    res.send({ message: 'User deleted successfully' });
    }catch(err) {

        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


// DELETE api/profile/experience/:exp_id
// Delete experience from profile
router.delete('/experience/:exp_id', auth, async (req, res) => {

    try {

        const profile = await Profile.findOne({ user: req.user.id });

        //Get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.send(profile);
        
    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server Error');
        
    }
})


module.exports = router;