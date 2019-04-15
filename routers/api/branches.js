/* const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "Orel & Dana" }));

module.exports = router;
 */

const express = require("express");
const router = express.Router();
//we are going to be dealing with the database
const mongoose = require("mongoose");
//we are going to use passport   for protected routes
const passport = require("passport");
//Load Branch model
const Branch = require("../../models/Branch");

const validateBranchInput = require("../../validation/branches");

router.get("/test", (req, res) => res.json({ msg: "Branches Works" }));

// //@route GET api/branches/
// //@desc get all the branches
// //@access Public
// router.get("/", (req, res) => {
//   Branch.find()
//     .then(branches =>
//       res.json(branches).json({ nobranchfound: "No branches found" })
//     )
//     .catch(err => res.status(404));
// });

//@route GET api/branches/
//@desc get all the branches
//@access Public
router.get("/", (req, res) => {
  const errors = {};

  Branch.find()
    .then(branches => {
      if (!branches) {
        errors.nobranches = "There are no branches";
        return res.status(404).json(errors);
      }

      res.json(branches);
    })
    .catch(err => res.status(404).json(err));
});

//@route GET api/branches/:id
//@desc Get branch in order to edit it
//@access Private
router.get("/:id", (req, res) => {
  Branch.findById(req.params.id)
    .then(branch => res.json(branch))
    .catch(err =>
      res.status(404).json({ nobranchfound: "No branch found with that ID" })
    );
});

router.post(
  "/",
  //passport.authenticate('jwt', {session: false}),

  (req, res) => {
    //get branch fields:
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    const branch_fields = {};
    if (req.body.name) {
      branch_fields.name = req.body.name;
    }
    if (req.body.avatar) {
      branch_fields.avatar = req.body.avatar;
    }

    //create a new branch

    //check to see if the handle exists
    /*Branch.findOne({handle: branch_fields.handle}).then(branch => {
                        if (branch) {
                            errors.handle = "the handle already exi"
                        }
                    })*/
    //TODO: don't let the admin create a new branch with the a branch name that already exists
    new Branch(branch_fields).save().then(branch => res.json(branch));
  }
);

router.post(
  "/:id",
  //passport.authenticate('jwt', {session: false}),

  (req, res) => {
    //get branch fields:
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    const branch_fields = {};
    if (req.body.name) {
      branch_fields.name = req.body.name;
    }
    if (req.body.avatar) {
      branch_fields.avatar = req.body.avatar;
    }

    //Branch.findOne()
    //console.log(db.branches.find());

    //console.log(req.params);
    Branch.findOne({ _id: req.params.id }).then(branch => {
      console.log("Before:");
      console.log(branch);
      if (branch) {
        console.log("found");
        //let version = branch.versionKey;
        //if there is a branch it's mean we want to update:
        Branch.findOneAndUpdate(
          { _id: req.params.id },
          //{versionKey: version},
          { $set: branch_fields },
          { new: true }
          //return the branch after the update
        ).then(branch => res.json(branch));
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
        new Branch(branch_fields).save().then(branch => res.json(branch));
      }
    });
  }
);

/*router.post(
    "/:id",
    //passport.authenticate('jwt', {session: false}),
    (req, res) => {
        //get branch fields:
        //console.log(req.body);
        //console.log(req.params);
        //console.log(req.query);


        const branch_fields = {};
        if (req.body.name) {
            branch_fields.name = req.body.name;
        }
        if (req.body.avatar) {
            branch_fields.avatar = req.body.avatar;
        }

        //Branch.findOne()
        //console.log(db.branches.find());
        console.log("got here");
        //console.log(req.params);
        Branch.findOne({_id: req.params.id})
            .then(branch => {
                console.log("Before:")
                console.log(branch);
                if (branch) {
                    console.log('found');
                    //let version = branch.versionKey;
                    //if there is a branch it's mean we want to update:
                    Branch.findOneAndUpdate(
                        {_id: req.params.id},
                        //{versionKey: version},
                        {$set: branch_fields},
                        {new: true}
                        //return the branch after the update
                    ).then(branch => res.json(branch));
                } else {
                    console.log('not found');
                    //create a new branch

                    //check to see if the handle exists
                    /!*Branch.findOne({handle: branch_fields.handle}).then(branch => {
                        if (branch) {
                            errors.handle = "the handle already exi"
                        }
                    })*!/
                    //TODO: don't let the admin create a new branch with the a branch name that already exists
                    new Branch(branch_fields).save().then(branch => res.json(branch));


                }
            })

    }
);*/

//@route POST api/branches/:id
//@desc create or edit a branch
//TODO: make edit work
//@access Private

/*router.post(
    '/:branch_id',
    //passport.authenticate('jwt', {session: false}),
    (req, res) => {
        //get branch fields:
        console.log(req.body);
        console.log(req.params.branch_id);


        const branch_fields = {};
        if (req.body.name) {
            branch_fields.name = req.body.name;
        }
        if (req.body.avatar) {
            branch_fields.avatar = req.body.avatar;
        }

        //Branch.findOne()


        //console.log(req.params);
        Branch.findOne({branch_id: req.params.branch_id})
            .then(branch => {
                if (branch) {
                    console.log('found');
                    //if there is a branch it's mean we want to update:
                    branch.findOneAndUpdate(
                        {branch_id: req.params.branch_id},
                        {$set: branch_fields},
                        {new: true}
                        //return the branch after the update
                    ).then(branch => res.json(branch));
                } else {
                    console.log('not found');
                    //create a new branch

                    //check to see if the handle exists
                    /!*Branch.findOne({handle: branch_fields.handle}).then(branch => {
                        if (branch) {
                            errors.handle = "the handle already exi"
                        }
                    })*!/
                    //TODO: don't let the admin create a new branch with the a branch name that already exists
                    new Branch(branch_fields).save().then(branch => res.json(branch));


                }
            })

    }
);*/

/*router.post(
  "/",
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateBranchInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const branchFields = {};
    if (req.body.name) branchFields.name = req.body.name;
    if (req.body.avatar) branchFields.avatar = req.body.avatar;

    // const newBranch = new Branch({
    //   name: req.body.name,
    //   avatar: req.body.avatar
    // });

    Branch.findById(req.params.id).then(branch => {
      if (branch) {
        //the branch exits, edit
        Branch.findOneAndUpdate(
          { id: request.params.id },
          { $set: branchFields },
          { new: true }
        ).then(branch => res.json(branch));
      } else {
        //the branch doesn't exist
        new Branch(branchFields)
          .save()
          .then(branch => res.json(branch))
          .catch(err => console.log(err));
      }
    });
  }
);*/

//@route DELETE api/branches/:id
//@desc delete a branch
//@access Private
router.delete(
  "/:id",
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Branch.findById(req.params.id)
      .then(branch => {
        branch.remove().then(() => res.json({ success: true }));
      })
      .catch(err =>
        res.status(404).json({ branchnotfound: "No branch found with this ID" })
      );
  }
);

module.exports = router;
