require('dotenv').config();
const mongoose = require('mongoose');
const { Types } = mongoose;
const Subject = require('../models/Subject');

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const subjects = await Subject.find({ 'challenges.0': { $exists: true } });

  for (const subj of subjects) {
    let changed = false;

    subj.challenges.forEach((ch, index) => {
      if (!ch._id) {
        ch._id = new Types.ObjectId();
        subj.markModified(`challenges.${index}`); // ✅ Important!
        changed = true;
      }
    });

    if (changed) {
      await subj.save(); // ✅ Must call save
      console.log(`✔ Added IDs to: ${subj.name}`);
    } else {
      console.log(`• ${subj.name} already OK`);
    }
  }

  await mongoose.disconnect();
})();
