const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../../config/keys");
const passport = require("passport");

//load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//load admin model - we need to check if the email is already exist in DB
//now we can use any mongoose methods
const Admin = require("../../models/Admin");

// @route GET /api/admins/test
// @des: test admin route
// @access: Public
router.get("/test", (req, res) => res.json({msg: "Admins works"}));

//register admin
// @route POST /api/admins/register
// @des: test admin route
// @access: Public
router.post("/register", (req, res) => {
    //we want to pull out the errors from isValid
    //req.body containes anything that sent to this route, which in our case will be the name and the password
    const {errors, isValid} = validateRegisterInput(req.body);

    //check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    //we can use req.body thanks to bodyParser
    Admin.findOne({name: req.body.name}).then(admin => {
        if (admin) {
            errors.name = "name is already exists";

            //there is an admin with that email already
            return res.status(400).json(errors);
        } else {
            const avatar = gravatar.url(req.body.name, {
                s: "200", //size
                r: "pg", //Rating
                d: "mm" //Default
            });

            const newAdmin = new Admin({
                email: "",
                name: req.body.name,
                password: req.body.password,
                avatar
            });

            //a ‘salt’ adds a very long string of bytes to the password
            //hacker should not be able to guess the ‘salt’ string
            bcrypt.genSalt(10, (err, salt) => {
                //a callback to be fired once the salt has been generated
                bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                    // a callback to be fired once the data has been encrypted
                    if (err) throw err;
                    newAdmin.password = hash;
                    newAdmin
                        .save()
                        .then(admin => res.json(admin)) //send back successful response
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route GET /api/admins/login
// @des: Login user - returning the Jason Web Token
// @access: Public

router.post("/login", (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);

    //check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    //get the email the user entered
    const name = req.body.name;
    const password = req.body.password;

    //find email:
    Admin.findOne({name: name}).then(admin => {
        //check for user
        if (!admin) {
            errors.name = "Admin's name is not found";
            //if email is not found in DB return status 400
            return res.status(404).json(errors);
        }

        console.log(admin);


        //if the user exists in DB we have to check the password
        //we need to use bycript to check since the password the user entered is not hashed like the one in thr DB
        bcrypt.compare(password, admin.password).then(isMatch => {
            if (isMatch) {
                //User Matched

                //payload it's what we want to include inthe token
                const payload = {id: admin.id, name: admin.name};

                //Sign Token

                jwt.sign(
                    payload,
                    key.secretOrKey,
                    {expiresIn: 3600},
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
                // res.json({ msg: "Success" });
            } else {
                errors.password = "Password is incorrect";
                return res.status(400).json(errors);
            }
        });
    });
});

// @route GET /api/admins/current
// @des: return current adm in
// @access: Private
router.get(
    "/current",
    //passport.authenticate("jwt", {session: false}),
    (req, res) => {
        res.json({msg: 'success'});
        //res.json(req.user);// contains the authenticated user.
        /*  res.json({
            id: req.user.id,
            name: req.user.name
          });*/
    }
);
module.exports = router;
