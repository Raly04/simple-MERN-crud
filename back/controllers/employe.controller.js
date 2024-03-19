const Employe = require("../models/employe");

const addEmploye = async (req, res) => {
  try {
    const { name, salary } = req.body;
    const addedEmploye = await Employe.create({ name: name, salary: salary });
    res.status(201).json({ success: true, content: addedEmploye });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllEmploye = async (req, res) => {
  try {
    const employes = await Employe.find();
    const employesWithObs = employes.map((item) => {
        if (item.salary < 1000) {
          return { ...item._doc, obs: "mediocre" };
        } else if (item.salary > 5000) {
          return { ...item._doc, obs: "grand" };
        } else {
          return { ...item._doc, obs: "moyen" };
        }
      })
    res.status(200).json({ success: true, content: employesWithObs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateEmploye = async (req, res) => {
  try {
    const { id, name, salary } = req.body;
    const updatedEmploye = await Employe.findByIdAndUpdate(
      id,
      { name: name, salary: salary },
      { new: true }
    );
    res.status(200).json({ success: true, content: updatedEmploye });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteEmploye = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedEmploye = await Employe.findByIdAndDelete(id);
    res.status(200).json({ success: true, content: deletedEmploye });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getEmployeStats = async (req, res) => {
    try {
        const stats = await Employe.aggregate([
            {
                $group: {
                    _id: null,
                    totalSalary: { $sum: "$salary" },
                    minSalary: { $min: "$salary" },
                    maxSalary: { $max: "$salary" }
                }
            }
        ]);

        if (stats.length === 0) {
            return res.status(404).json({ message: "No employees found" });
        }

        res.status(200).json({success : true , content : stats[0]}); // Return the aggregated statistics
    } catch (err) {
        res.status(500).json({ message: err.message , success : false });
    }
};
module.exports = {
  addEmploye,
  getAllEmploye,
  updateEmploye,
  deleteEmploye,
  getEmployeStats
};
