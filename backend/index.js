import express from "express";
import { body, validationResult } from "express-validator";
import { myPathRead, myPathWrite } from "./functions.js";
import dotenv from "dotenv";

const PORT = 9009;
dotenv.config();
const app = express();
app.use(express.json());

// Cors middleware alternative zu app.use(cors)
app.use((_, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});
// logging middleware
app.use((req, _, next) => {
    console.log("New Request: ", req.method, req.url);
    next();
});
// Get all Posts Endpunkt
app.get("/api/v8/g-book/posts", (req, res) => {
    myPathRead()
        .then((allPosts) => res.status(200).json(allPosts))
        .catch((err) => {
            res.status(500).json({ err, message: "Could not read all Posts" });
        });
});
// Post One Endpunkt
app.post("/api/v8/g-book/posts", body("firstName").isString().notEmpty(), body("lastName").isString().notEmpty(), body("email").isEmail(), body("message").isString().notEmpty(), (req, res) => {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
        return res.status(400).json({ errors: validationError.array(), message: "Could not validate data" });
    }
    myPathRead()
        .then((allPosts) => {
            let maxValue = 0;
            allPosts.map((post) => {
                maxValue = Math.max(maxValue, post.id);
            });
            console.log("max ID: ", maxValue);
            const newPost = {
                id: maxValue + 1,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                message: req.body.message,
                timeStamp: Date.now(),
            };
            return newPost;
        })
        .then((newPost) => {
            myPathRead()
                .then((allPosts) => [newPost, ...allPosts])
                .then((allPostsPlusNew) => myPathWrite(allPostsPlusNew))
                .then((allPostsPlusNew) => res.status(200).json(allPostsPlusNew))
                .catch((err) => res.status(500).json({ err, message: "Could not write post" }));
        })
        .catch((err) => console.log("An error has occured: ", err));
});

app.delete("/api/v8/g-book/posts/:id", (req, res) => {
    const deletePostId = req.params.id;
    const password = req.body.password;
    if (password !== process.env.PW) {
        return res.status(401).json({ message: "Wrong password." });
    }
    myPathRead()
        .then((allPosts) => allPosts.filter((post) => post.id.toString() !== deletePostId))
        .then((allPosts) => myPathWrite(allPosts))
        .then((allPosts) => res.status(200).json(allPosts))
        .catch((err) => res.status(200).json({ err, message: "Could not delete post" }));
});

app.listen(PORT, () => console.log("Server listens at PORT: ", PORT));
