const express = require("express");
const router = express.Router();
//we are going to be dealing with the database
const mongoose = require("mongoose");
//we are going to use passport   for protected routes
const passport = require("passport");
//Load Document model
const Game = require("../../models/Game");

//const validateBranchInput = require("../../validation/branches");

//@route GET api/games/categories
//@desc get all the games categories
//@access Public

router.get("/category", (req, res) => {
  const errors = {};
  //console.log(req.params);
  console.log(req.body.category);
  //console.log(req.params);
  // console.log(req.query);
  Game.find()
    .then(games => {
      if (!games) {
        errors.nogames = "There are no games";
        return res.status(404).json(errors);
      }
      console.log(req.params);
      const docs_category = games.filter(
        game => game.category === req.body.category
      );
      //console.log(docs_category);

      res.json(docs_category);
      //console.log(req.params);
    })
    .catch(err => res.status(404).json(err));
});

//@route GET api/games/
//@desc get all the games
//@access Public

router.get("/", (req, res) => {
  const errors = {};

  Game.find()
    .then(games => {
      if (!games) {
        errors.nogames = "There are no games";
        return res.status(404).json(errors);
      }

      res.json(games);
    })
    .catch(err => res.status(404).json(err));
});

//@route POST api/games/
//@desc create (ONLY) a game
//@access Private
router.post(
  "/",
  //passport.authenticate('jwt', {session: false}),

  (req, res) => {
    //get game fields:
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    const games_fields = {};
    if (req.body.name) {
      games_fields.name = req.body.name;
    }
    if (req.body.category) {
      games_fields.category = req.body.category;
    }
    if (req.body.description) {
      games_fields.description = req.body.description;
    }
    if (req.body.avatar) {
      games_fields.avatar = req.body.avatar;
    }

    //create a new Document

    //check to see if the handle exists
    /*Branch.findOne({handle: games_fields.handle}).then(branch => {
                            if (branch) {
                                errors.handle = "the handle already exi"
                            }
                        })*/

    new Game(games_fields).save().then(game => res.json(game));
  }
);

//@route GET api/games/:id
//@desc Get game in order to edit it
//@access Private

router.get("/:id", (req, res) => {
  Game.findById(req.params.id)
    .then(game => res.json(game))
    .catch(err =>
      res.status(404).json({ nogamefound: "No game found with that ID" })
    );
});

//@route POST api/games/:id
//@desc edit a game
//@access Private

router.post(
  "/:id",
  //passport.authenticate('jwt', {session: false}),

  (req, res) => {
    //get branch fields:
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    const game_fields = {};
    if (req.body.name) {
      game_fields.name = req.body.name;
    }

    if (req.body.category) {
      game_fields.category = req.body.category;
    }

    if (req.body.avatar) {
      game_fields.avatar = req.body.avatar;
    }

    if (req.body.description) {
      game_fields.description = req.body.description;
    }

    //Branch.findOne()
    //console.log(db.branches.find());

    //console.log(req.params);
    Game.findOne({ _id: req.params.id }).then(game => {
      console.log("Before:");
      console.log(game);
      if (game) {
        console.log("found");
        //let version = branch.versionKey;
        //if there is a branch it's mean we want to update:
        Game.findOneAndUpdate(
          { _id: req.params.id },
          //{versionKey: version},
          { $set: game_fields },
          { new: true }
          //return the branch after the update
        ).then(game => res.json(game));
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
        new Game(game_fields).save().then(game => res.json(game));
      }
    });
  }
);

//@route DELETE api/games/:id
//@desc delete a game
//@access Private

router.delete(
  "/:id",
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Game.findById(req.params.id)
      .then(game => {
        game.remove().then(() => res.json({ success: true }));
      })
      .catch(err =>
        res.status(404).json({ gamenotfound: "No game found with this ID" })
      );
  }
);

module.exports = router;
