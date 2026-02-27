
const Meal = require("../models/mealModels");

const addMeal = async (req, res) => {
  const { type, protein, carbs, fats } = req.body;

  // Validation
  if (!type) {
    return res.status(400).json({
      message: "Please provide meal type",
    });
  }

  try {
    // Calculate total calories (rough estimate: protein=4cal/g, carbs=4cal/g, fats=9cal/g)
    const calories = (protein || 0) * 4 + (carbs || 0) * 4 + (fats || 0) * 9;

    const meal = await Meal.create({
      type,
      protein: protein || 0,
      carbs: carbs || 0,
      fats: fats || 0,
    });

    return res.status(201).json({
      message: "Meal added successfully",
      data: meal,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getMeals = async (req, res) => {
  try {
    const meals = await Meal.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      data: meals,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteMeal = async (req, res) => {
  const { id } = req.params;

  try {
    const meal = await Meal.findOne({ where: { id } });

    if (!meal) {
      return res.status(404).json({
        message: "Meal not found",
      });
    }

    await Meal.destroy({ where: { id } });

    return res.status(200).json({
      message: "Meal deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addMeal,
  getMeals,
  deleteMeal,
};