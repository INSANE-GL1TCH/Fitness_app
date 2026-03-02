const Meal = require("../models/mealModels");

const addMeal = async (req, res) => {
  const { type, protein, carbs, fats } = req.body;
  const userId = req.user.id; // Grab the logged-in user's ID

  // Validation
  if (!type) {
    return res.status(400).json({
      message: "Please provide meal type",
    });
  }

  try {
    const calories = (protein || 0) * 4 + (carbs || 0) * 4 + (fats || 0) * 9;

    const meal = await Meal.create({
      type,
      protein: protein || 0,
      carbs: carbs || 0,
      fats: fats || 0,
      calories: calories, // 👇 FIXED: Actually save the calories to the database!
      userId: userId, // 👇 NEW: Save this Meal explicitly to the logged-in user!
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
    const userId = req.user.id; 

    const meals = await Meal.findAll({
      where: { userId: userId }, // 👇 NEW: Only fetch rows belonging to THIS user!
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
  const userId = req.user.id;

  try {
    // 👇 NEW: Ensure they can only delete it if they own it!
    const meal = await Meal.findOne({ where: { id, userId } });

    if (!meal) {
      return res.status(404).json({
        message: "Meal not found or unauthorized",
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