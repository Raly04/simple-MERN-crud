const { addEmploye, getAllEmploye, updateEmploye, deleteEmploye, getEmployeStats } = require("../controllers/employe.controller")

const router = require("express").Router()

router.post("/add" , addEmploye)
router.get("/get-all" , getAllEmploye)
router.get("/get-stats" , getEmployeStats)
router.put("/update" , updateEmploye)
router.delete("/delete/:id" , deleteEmploye)

module.exports = router