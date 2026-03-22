const express                        = require("express");
const { getBudget, updateBudget }    = require("../controllers/budgetController");

const router = express.Router();

router.get("/",  getBudget);
router.put("/",  updateBudget);

module.exports = router;
