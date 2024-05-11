const express = require('express');
const pool = require('./db');

const app = express();
const port = 3000;

app.get('/:pair', async (req, res) => {
    const pair = req.params.pair.toLowerCase();
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    if (!isValidDate(startDate) || !isValidDate(endDate)) {
        return res.status(400).json({ error: 'Invalid date format' });
    }

    try {
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM ${pair} WHERE date BETWEEN $1 AND $2`, [startDate, endDate]);
        const data = result.rows;

        // Calculate highestDifference, lowestPrice, and highestPrice
        let highestDifference = 0;
        let lowestPrice = Infinity;
        let highestPrice = 0;

        data.forEach(row => {
            const price = parseFloat(row.price);
            const open = parseFloat(row.open);
            const difference = (price - open) / open
            if (difference > highestDifference) {
                highestDifference = difference;
            }
            if (price < lowestPrice) {
                lowestPrice = price;
            }
            if (price > highestPrice) {
                highestPrice = price;
            }
        });

        const responseData = {
            highestDifference,
            lowestPrice,
            highestPrice,
            data
        };

        res.json(responseData);
        client.release();
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Function to validate date format
function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
