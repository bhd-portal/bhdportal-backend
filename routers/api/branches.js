/* const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "Orel & Dana" }));

module.exports = router;
 */

const express = require("express");
const router = express.Router();
const Branch = require("../../controllers/Branch");

router.post("/", Branch.addBranch);
router.patch("/", Branch.patchBranch);
router.delete("/", Branch.deleteBranch);
router.get("/", Branch.getBranchs);

module.exports = router;
