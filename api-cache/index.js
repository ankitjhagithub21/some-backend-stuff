import express from "express";
import apicache from "apicache";

const app   = express();
let cache = apicache.middleware

const PORT = 8000;


app.get("/", cache("5 minutes"), (req, res) => {
    setTimeout(() => {
        res.json({
            message: "some big task in backend."
        })
    }, 5000);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));