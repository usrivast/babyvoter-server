/**
 * Created by Utkarsh on 9/11/16.
 */
var mongoose = require('mongoose');

// Create the VoteSchema.
var VoteSchema = new mongoose.Schema({
    gender: {
        type: String,
        enum: ['boy', 'girl'],
        required: 'Please select the gender'
    },
    month: {
        type: String,
        required: 'Please select the month',
        default: 'January'
    },
    day: {
        type: Number,
        required: 'Please select the day',
        default: 1,
        min: 1
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    comment: {
        type: String,
        default: '',
        trim: true
    },
    // user: {
    //     type: String,
    //     trim: true,
    //     required: true
    //
    // }
    // ,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

VoteSchema.add({
        babyName: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BabyName'
        }]
    }
)



// Export the vote schema.
module.exports = VoteSchema;