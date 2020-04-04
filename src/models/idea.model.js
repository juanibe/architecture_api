const mongoose = require('mongoose')
const { Schema } = mongoose

const IdeaSchema = new Schema({
    idea: { type: String, required: true },
    description: { type: String },
    upVotes: [{ type: Boolean }],
    downVotes: [{ type: Boolean }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        autopopulate: true
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Model',
            required: true,
            autopopulate: true
        },
    ]
})

IdeaSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model("Idea", IdeaSchema)