const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
    {
        body: {
            type: String,
            unique: true,
            required: true,
        },
        likes: {
            type: [String],
            required: false,
        },
        userID: {
            type: String,
            required: true,
            unique: true,
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("post", postSchema)