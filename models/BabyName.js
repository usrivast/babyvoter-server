/**
 * Created by Utkarsh on 9/11/16.
 */
var mongoose = require('mongoose');

//Create the name schema
var BabyNameSchema = new mongoose.Schema({
    name: String,
    gender: {
        type: String,
        enum: ['boy', 'girl'],
    },
    upvotes: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vote: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vote'
    }


    // user: ['UserSchema']
});

// Export the vote schema.
module.exports = BabyNameSchema;