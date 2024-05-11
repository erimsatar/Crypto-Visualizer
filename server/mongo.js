require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;

const logSchema = new mongoose.Schema({
    beginDate: Date,
    endDate: Date,
    requestDate: { type: Date, default: Date.now }
  });

const Log = mongoose.model('log', logSchema);

async function logDataRange(beginDate, endDate) {
    try {
        await mongoose.connect(MONGO_URL);

        const newLog = new Log({
        beginDate,
        endDate
        });

        await newLog.save();

    } catch (error) {
        console.error('Error logging data range:', error);
        throw error;
    }
}

module.exports = { logDataRange };