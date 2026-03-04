const router = require('express').Router();
const multer = require('multer');
const upload = multer();

// 🛡️ Import your Auth Guard (The Bouncer!)
const authGuard = require('../utlis/authGuard'); 

const { registerUser, userLogin, updateProfile, updatePassword, getTrainerClients, getClientHistory } = require("../controllers/userController");
const { verifyEmail } = require('../utlis/verifyEmail');
const bmiController = require("../controllers/bmiController");
const mealController = require("../controllers/mealController");
const workoutController = require("../controllers/exeController");

// 👇 NEW: Import the Badge Controller!
const badgeController = require("../controllers/badgeController");

// ==========================================
// 🔓 PUBLIC ROUTES (No login required)
// ==========================================
router.post("/register", upload.none(), registerUser);
router.post("/login", userLogin);
router.get("/verify-email", verifyEmail);


// ==========================================
// 🔒 PROTECTED ROUTES (Login required)
// ==========================================

// ----- Profile & Trainer Routes -----
router.put("/profile", authGuard, updateProfile);
router.put("/password", authGuard, updatePassword);
router.get("/trainer/clients", authGuard, getTrainerClients);
router.get("/trainer/client/:clientId/history", authGuard, getClientHistory); 

// ----- Badge Routes (Gamification!) -----
// 👇 NEW: Ready to award and fetch badges!
router.post("/trainer/award-badge", authGuard, badgeController.awardBadge);
router.get("/my-badges", authGuard, badgeController.getMyBadges);

// ----- Meal Routes -----
router.post("/meals", authGuard, mealController.addMeal);
router.get("/meals", authGuard, mealController.getMeals);
router.delete("/meals/:id", authGuard, mealController.deleteMeal);

// ----- BMI Routes -----
router.post("/bmi", authGuard, bmiController.addBMI);
router.get("/bmi", authGuard, bmiController.getBMI);
router.delete("/bmi/:id", authGuard, bmiController.deleteBMI);

//  ----- Workout Routes -----
router.post("/workouts/save", authGuard, workoutController.saveWorkout);
router.get("/workouts/:userId", authGuard, workoutController.getWorkouts);

module.exports = router;