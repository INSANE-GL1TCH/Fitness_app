require('dotenv').config();
const express = require("express");
const app = express();
const { sequelize, connectDB } = require("./database/database")
const cors = require("cors")

// Import ALL your models
const RegisterUser = require("./models/userModels"); 
const WorkoutLog = require("./models/exeModels");
const BMI = require("./models/bmiModels"); 
const Meal = require("./models/mealModels");
const Badge = require("./models/badgeModels"); // 👈 NEW: Brought in the Badge model!

// Define the Relationships (Associations) explicitly!
RegisterUser.hasMany(BMI, { foreignKey: 'userId' });
BMI.belongsTo(RegisterUser, { foreignKey: 'userId' });

RegisterUser.hasMany(Meal, { foreignKey: 'userId' });
Meal.belongsTo(RegisterUser, { foreignKey: 'userId' });

RegisterUser.hasMany(WorkoutLog, { foreignKey: 'userId' });
WorkoutLog.belongsTo(RegisterUser, { foreignKey: 'userId' });

// 👇 NEW: Tell PostgreSQL to link Badges to Users!
RegisterUser.hasMany(Badge, { foreignKey: 'userId' });
Badge.belongsTo(RegisterUser, { foreignKey: 'userId' });

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

//middleware
app.use(express.json());

//userRoutes
app.use("/api/user", require('./routes/userRoutes'))

app.get("/",(req,res) =>{
    res.json({message: "Welcome to the Home Page"});
});

//start server
const startServer = async () => {
    const PORT = process.env.PORT || 3000;
    await connectDB();
    
    // This will now see the new Badge model and automatically create the table in your database!
    await sequelize.sync({alter: true}); 
    
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

startServer();