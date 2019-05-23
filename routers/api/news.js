const express = require("express");
const router = express.Router();
//we are going to be dealing with the database
const mongoose = require("mongoose");
//we are going to use passport   for protected routes
const passport = require("passport");
//Load Document model
const News = require("../../models/News");

//const validateBranchInput = require("../../validation/branches");

//@route GET api/news/
//@desc get all the news
//@access Public

router.get("/", (req, res) => {
  const errors = {};

  News.find()
    .then(news => {
      if (!news) {
        errors.nonews = "There are no news";
        return res.status(404).json(errors);
      }

      res.json(news);
    })
    .catch(err => res.status(404).json(err));
});

//@route GET api/news/:id
//@desc Get news in order to edit it
//@access Private

router.get("/:id", (req, res) => {
  News.findById(req.params.id)
    .then(news => res.json(news))
    .catch(err =>
      res.status(404).json({ nonewsfound: "No news found with that ID" })
    );
});

//@route POST api/news/:id
//@desc EDIT a new
//@access Private

router.post(
  "/:id",
  //passport.authenticate('jwt', {session: false}),

  (req, res) => {
    const news_fields = {};
    if (req.body.name) {
      news_fields.name = req.body.name;
    }

    if (req.body.text) {
      news_fields.text = req.body.text;
    }

    if(req.body.date) {
      news_field.date = req.body.date;
    }

    //Branch.findOne()
    //console.log(db.branches.find());

    //console.log(req.params);
    News.findOne({ _id: req.params.id }).then(news => {
      if (news) {
        //let version = branch.versionKey;
        //if there is a branch it's mean we want to update:
        News.findOneAndUpdate(
          { _id: req.params.id },
          //{versionKey: version},
          { $set: news_fields },
          { new: true }
          //return the branch after the update
        ).then(news => res.json(news));
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
        new News(news_fields).save().then(news => res.json(news));
      }
    });
  }
);

//@route POST api/news/
//@desc create a new
//@access Private

router.post(
  "/",
  //passport.authenticate('jwt', {session: false}),

  (req, res) => {
    const { name, text } = req.body;
    if (!name || !text) {
      return res.status(422).send({ error: "חסר פרטים" });
    }

    //create a new Document

    //check to see if the handle exists
    /*Branch.findOne({handle: document_fields.handle}).then(branch => {
                              if (branch) {
                                  errors.handle = "the handle already exi"
                              }
                          })*/

    new News({ name, text }).save().then(news => res.json(news));
  }
);

//@route DELETE api/news/:id
//@desc delete a news
//@access Private

router.delete(
  "/:id",
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    News.findById(req.params.id)
      .then(news => {
        news.remove().then(() => res.json({ success: true }));
      })
      .catch(err =>
        res.status(404).json({ newsnotfound: "No news found with this ID" })
      );
  }
);

module.exports = router;
