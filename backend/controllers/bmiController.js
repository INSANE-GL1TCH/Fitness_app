const BMI = require("../models/bmiModels");

const addBMI = async (req, res) => {
  const { weight, height } = req.body;

  // Validation
  if (!weight || !height) {
    return res.status(400).json({
      message: "Please provide weight and height",
    });
  }

  try {
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    const bmi = await BMI.create({
      weight,
      height,
      bmi: bmiValue,
    });

    return res.status(201).json({
      message: "BMI added successfully",
      data: bmi,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getBMI = async (req, res) => {
  try {
    const bmi = await BMI.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      data: bmi,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteBMI = async (req, res) => {
  const { id } = req.params;

  try {
    const bmi = await BMI.findOne({ where: { id } });

    if (!bmi) {
      return res.status(404).json({
        message: "BMI record not found",
      });
    }

    await BMI.destroy({ where: { id } });

    return res.status(200).json({
      message: "BMI deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addBMI,
  getBMI,
  deleteBMI,
};
