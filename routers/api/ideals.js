const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Ideal = require("../../models/Ideal");

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

router.post("/", (req, res) => {
    const ideal_fields = {};
    if (req.body.name) {
      ideal_fields.name = req.body.name;
    }
    if (req.body.text) {
      ideal_fields.text = req.body.text;
    }
    new Ideal(ideal_fields).save().then(ideal => res.json(ideal));
  }
);

//@route POST api/ideals/:id
//@desc Edit an ideal
//@access Private

router.post("/:id", (req, res) => {
    const ideal_fields = {};
    if (req.body.name) {
      ideal_fields.name = req.body.name;
    }

    if (req.body.text) {
      ideal_fields.text = req.body.text;
    }

    Ideal.findOne({ _id: req.params.id }).then(document => {
      if (document) {
        console.log("found");
        Ideal.findOneAndUpdate(
          { _id: req.params.id },
          //{versionKey: version},
          { $set: ideal_fields },
          { new: true }
          //return the branch after the update
        ).then(ideal => res.json(ideal));
      } else {
        console.log("not found");

        //TODO: don't let the admin create a new branch with the a branch name that already exists
        new Ideal(ideal_fields).save().then(ideal => res.json(ideal));
      }
    });
  }
);

module.exports = router;
