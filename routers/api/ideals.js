const express = require("express");
const router = express.Router();
//we are going to be dealing with the database
const mongoose = require("mongoose");
//we are going to use passport   for protected routes
const passport = require("passport");
//Load Ideal model
const Ideal = require("../../models/Ideal");

//const validateBranchInput = require("../../validation/branches");

//@route GET api/ideals/
//@desc get all the ideals
//@access Public

router.get("/", (req, res) => {
  const errors = {};

  Ideal.find()
    .then(ideals => {
      if (!ideals) {
        errors.noideals = "There are no ideals";
        return res.status(404).json(errors);
      }

      res.json(ideals);
    })
    .catch(err => res.status(404).json(err));
});

//@route GET api/ideals/:id
//@desc Get ideal in order to edit it
//@access Private

//@route POST api/ideals
//@desc create an ideal
//@access Private

router.post(
  "/",
  //passport.authenticate('jwt', {session: false}),

  (req, res) => {
    //get branch fields:
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    const ideal_fields = {};
    if (req.body.name) {
      ideal_fields.name = req.body.name;
    }
    if (req.body.text) {
      ideal_fields.text = req.body.text;
    }

    //create a new Document

    //check to see if the handle exists
    /*Branch.findOne({handle: document_fields.handle}).then(branch => {
                              if (branch) {
                                  errors.handle = "the handle already exi"
                              }
                          })*/

    new Ideal(ideal_fields).save().then(ideal => res.json(ideal));
  }
);

//@route POST api/ideals/:id
//@desc Edit an ideal
//@access Private

router.post(
  "/:id",
  //passport.authenticate('jwt', {session: false}),

  (req, res) => {
    const ideal_fields = {};
    if (req.body.name) {
      ideal_fields.name = req.body.name;
    }

    if (req.body.text) {
      ideal_fields.text = req.body.text;
    }

    //Branch.findOne()
    //console.log(db.branches.find());

    //console.log(req.params);
    Ideal.findOne({ _id: req.params.id }).then(document => {
      if (document) {
        console.log("found");
        //let version = branch.versionKey;
        //if there is a branch it's mean we want to update:
        Ideal.findOneAndUpdate(
          { _id: req.params.id },
          //{versionKey: version},
          { $set: ideal_fields },
          { new: true }
          //return the branch after the update
        ).then(ideal => res.json(ideal));
      } else {
        console.log("not found");
        //create a new branch

        //check to see if the handle exists
        /*Branch.findOne({handle: branch_fields.handle}).then(branch => {
                                  if (branch) {
                                      errors.handle = "the handle already exi"
                                  }
                              })*/
        //TODO: don't let the admin create a new branch with the a branch name that already exists
        new Ideal(ideal_fields).save().then(ideal => res.json(ideal));
      }
    });
  }
);

module.exports = router;
