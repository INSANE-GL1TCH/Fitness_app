const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");

const WorkoutLog = sequelize.define(
    "WorkoutLog",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // This links the workout to a specific user
            references: {
                model: 'users', 
                key: 'id'
            }
        },
        dateString: {
            type: DataTypes.STRING,
            allowNull: false,
            // Example: 'Fri Feb 27 2026' (Matches your frontend perfectly)
        },
        completedExercises: {
            type: DataTypes.JSON, 
            defaultValue: []
            // Saves your array of IDs: [1, 2, 4, 5]
        },
        dailyGoal: {
            type: DataTypes.STRING,
            allowNull: true
            // Saves 'Lose Weight', 'Gain Mass', etc.
        }
    },
    {
        timestamps: true,
        tableName: "workout_logs"
    }
);

module.exports = WorkoutLog;