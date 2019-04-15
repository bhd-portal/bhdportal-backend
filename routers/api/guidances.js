const express = require("express");
const router = express.Router();
//we are going to be dealing with the database
const mongoose = require("mongoose");
//we are going to use passport   for protected routes
const passport = require("passport");
//Load Document model
const Guidance = require("../../models/Guidance");

//const validateBranchInput = require("../../validation/branches");

//@route GET api/guidances/categories
//@desc get all the guidances categories
//@access Public

router.get("/category", (req, res) => {
  const errors = {};
  //console.log(req.params);
  console.log(req.body.category);
  //console.log(req.params);
  // console.log(req.query);
  Guidance.find()
    .then(guidances => {
      if (!guidances) {
        errors.noguidances = "There are no guidances";
        return res.status(404).json(errors);
      }
      console.log(req.params);
      const docs_category = guidances.filter(
        doc => doc.category === req.body.category
      );
      //console.log(docs_category);

      res.json(docs_category);
      //console.log(req.params);
    })
    .catch(err => res.status(404).json(err));
});

//@route GET api/guidances/
//@desc get all the guidances
//@access Public

router.get("/", (req, res) => {
  const errors = {};

  Guidance.find()
    .then(guidances => {
      if (!guidances) {
        errors.noguidances = "There are no guidances";
        return res.status(404).json(errors);
      }

      res.json(guidances);
    })
    .catch(err => res.status(404).json(err));
});

//@route GET api/guidances/:id
//@desc Get guidance in order to edit it
//@access Private

router.get("/:id", (req, res) => {
  Guidance.findById(req.params.id)
    .then(guidance => res.json(guidance))
    .catch(err =>
      res
        .status(404)
        .json({ noguidancefound: "No guidance found with that ID" })
    );
});

//@route POST api/guidances/:id
//@desc edit a guidance
//@access Private

router.post(
  "/:id",
  //passport.authenticate('jwt', {session: false}),

  (req, res) => {
    //get branch fields:

    const guidance_fields = {};
    if (req.body.name) {
      guidance_fields.name = req.body.name;
    }

    if (req.body.category) {
      guidance_fields.category = req.body.category;
    }

    if (req.body.avatar) {
      guidance_fields.avatar = req.body.avatar;
    }

    //Branch.findOne()
    //console.log(db.branches.find());

    //console.log(req.params);
    Guidance.findOne({ _id: req.params.id }).then(guidance => {
      if (guidance) {
        console.log("found");
        //let version = branch.versionKey;
        //if there is a branch it's mean we want to update:
        Guidance.findOneAndUpdate(
          { _id: req.params.id },
          //{versionKey: version},
          { $set: guidance_fields },
          { new: true }
          //return the branch after the update
        ).then(guidance => res.json(guidance));
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
        new Document(guidance_fields)
          .save()
          .then(guidance => res.json(guidance));
      }
    });
  }
);

//@route POST api/guidances/
//@desc create a guidance
//@access Private

router.post(
  "/",
  //passport.authenticate('jwt', {session: false}),

  (req, res) => {
    //get branch fields:
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    const guidance_fields = {};
    if (req.body.name) {
      guidance_fields.name = req.body.name;
    }
    if (req.body.category) {
      guidance_fields.category = req.body.category;
    }
    if (req.body.avatar) {
      guidance_fields.avatar = req.body.avatar;
    }

    //create a new Document

    //check to see if the handle exists
    /*Branch.findOne({handle: document_fields.handle}).then(branch => {
                            if (branch) {
                                errors.handle = "the handle already exi"
                            }
                        })*/

    new Guidance(guidance_fields).save().then(guidance => res.json(guidance));
  }
);

//@route DELETE api/guidance/:id
//@desc delete a guidance
//@access Private

router.delete(
  "/:id",
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Guidance.findById(req.params.id)
      .then(guidance => {
        guidance.remove().then(() => res.json({ success: true }));
      })
      .catch(err =>
        res
          .status(404)
          .json({ guidancenotfound: "No guidance found with this ID" })
      );
  }
);

module.exports = router;
