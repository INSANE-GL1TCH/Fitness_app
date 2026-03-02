const Badge = require("../models/badgeModels");
const RegisterUser = require("../models/userModels");

// 🏆 TRAINER: Give a badge to a client
const awardBadge = async (req, res) => {
  try {
    const { clientId, title, description, icon } = req.body;
    const trainerId = req.user.id;

    if (!clientId || !title) {
      return res.status(400).json({ message: "Client ID and Badge Title are required" });
    }

    const trainer = await RegisterUser.findByPk(trainerId);

    const badge = await Badge.create({
      title,
      description,
      icon: icon || "🏆",
      trainerName: trainer.username,
      userId: clientId // Pin the badge to the user's chest!
    });

    return res.status(201).json({ success: true, message: "Badge awarded successfully!", data: badge });
  } catch (error) {
    console.error("Award Badge Error:", error);
    return res.status(500).json({ message: "Failed to award badge" });
  }
};

// 🏅 USER: Look at all my earned badges
const getMyBadges = async (req, res) => {
  try {
    const userId = req.user.id;

    const badges = await Badge.findAll({
      where: { userId: userId },
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json({ success: true, data: badges });
  } catch (error) {
    console.error("Fetch Badges Error:", error);
    return res.status(500).json({ message: "Failed to fetch badges" });
  }
};

module.exports = { awardBadge, getMyBadges };