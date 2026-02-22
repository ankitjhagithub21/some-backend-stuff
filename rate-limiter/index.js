const express = require("express");
const rateLimit = require("express-rate-limit");
const app = express();


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
    limit:2,
	message: async (req, res) => {
		res.json({message:"You have exceeded the limit of 2 requests per minute"})
	},
})

// app.use(limiter) for applying the rate limiter to all routes


app.get("/", limiter, (req, res) => {
    res.json({message:"Hello from the server."})
});

app.listen(8000, () => {
    console.log("Server started on port 8000");
});

