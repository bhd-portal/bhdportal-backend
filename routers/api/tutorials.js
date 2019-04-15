const express = require("express");
const router = express.Router();
//we are going to be dealing with the database
const mongoose = require("mongoose");
//we are going to use passport   for protected routes
const passport = require("passport");
//Load Document model
const Tutorial = require("../../models/Tutorial");

//const validateBranchInput = require("../../validation/branches");

//@route GET api/tutorials/categories
//@desc get all the tutorials categories
//@access Public


router.get("/category", (req, res) => {
    const errors = {};
    //console.log(req.params);
    console.log(req.body.category);
    //console.log(req.params);
    // console.log(req.query);
    Tutorial.find()
        .then(tutorial => {
            if (!tutorial) {
                errors.notutorial = "There are no tutorial";
                return res.status(404).json(errors);
            }
            console.log(req.params);
            const docs_category = tutorial.filter(
                doc => doc.category === req.body.category
            );
            //console.log(docs_category);

            res.json(docs_category);
            //console.log(req.params);
        })
        .catch(err => res.status(404).json(err));
});

//@route GET api/tutorials/
//@desc get all the tutorials
//@access Public

router.get("/", (req, res) => {
    const errors = {};

    Tutorial.find()
        .then(tutorial => {
            if (!tutorial) {
                errors.notutorial = "There are no tutorial";
                return res.status(404).json(errors);
            }

            res.json(tutorial);
        })
        .catch(err => res.status(404).json(err));
});

router.get("/test", (req, res) => res.json({msg: "tutorial Works"}));

//@route GET api/tutorials/:id
//@desc Get tutorial in order to edit it
//@access Private

router.get("/:id", (req, res) => {
    Tutorial.findById(req.params.id)
        .then(tutorial => res.json(tutorial))
        .catch(err =>
            res
                .status(404)
                .json({notutorialfound: "No tutorial found with that ID"})
        );
});

//@route POST api/tutorials/:id
//@desc EDIT a tutorial
//@access Private

router.post(
    "/:id",
    //passport.authenticate('jwt', {session: false}),

    (req, res) => {
        const tutorial_fields = {};
        if (req.body.name) {
            tutorial_fields.name = req.body.name;
        }

        if (req.body.category) {
            tutorial_fields.category = req.body.category;
        }

        if (req.body.avatar) {
            tutorial_fields.avatar = req.body.avatar;
        }

        if (req.body.featured) {
            tutorial_fields.featured = req.body.featured;
        }

        if (req.body.description) {
            tutorial_fields.description = req.body.description;
        }

        Tutorial.findOne({_id: req.params.id}).then(tutorial => {
            if (tutorial) {
                //let version = branch.versionKey;
                //if there is a branch it's mean we want to update:
                Tutorial.findOneAndUpdate(
                    {_id: req.params.id},
                    //{versionKey: version},
                    {$set: tutorial_fields},
                    {new: true}
                    //return the branch after the update
                ).then(tutorial => res.json(tutorial));
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
                new Tutorial(tutorial_fields)
                    .save()
                    .then(tutorial => res.json(tutorial));
            }
        });
    }
);

//@route POST api/tutorials/
//@desc create a tutorial
//@access Private

router.post(
    "/",
    //passport.authenticate('jwt', {session: false}),

    (req, res) => {
        const tutorial_fields = {};
        if (req.body.name) {
            tutorial_fields.name = req.body.name;
        }

        if (req.body.category) {
            tutorial_fields.category = req.body.category;
        }

        if (req.body.avatar) {
            tutorial_fields.avatar = req.body.avatar;
        }

        if (req.body.featured) {
            tutorial_fields.featured = req.body.featured;
        }

        if (req.body.description) {
            tutorial_fields.description = req.body.description;
        }

        //check to see if the handle exists
        /*Branch.findOne({handle: document_fields.handle}).then(branch => {
                                  if (branch) {
                                      errors.handle = "the handle already exi"
                                  }
                              })*/

        new Tutorial(tutorial_fields).save().then(tutorial => res.json(tutorial));
    }
);

//@route DELETE api/tutorials/:id
//@desc delete a tutorial
//@access Private

router.delete(
    "/:id",
    //passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Tutorial.findById(req.params.id)
            .then(tutorial => {
                tutorial.remove().then(() => res.json({success: true}));
            })
            .catch(err =>
                res
                    .status(404)
                    .json({tutorialnotfound: "No tutorial found with this ID"})
            );
    }
);
