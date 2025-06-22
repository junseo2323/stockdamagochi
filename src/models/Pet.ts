import {Schema, model, models, Types} from "mongoose";

const QuestSchema = new Schema({
    questId: {type: String, required: true,},
    status: {
        type: String,
        enum: ['in_progress', 'completed', 'claimed'],
        required: true,
    },
    progress: {
        type: Number,
        required: false,
    },
});

/**
 emotion
 -50~0~50
 -5~+5 netural
 +6~50 Happy
 -50~-6 Sad
 */
const PetSchema = new Schema({
    owner: {type: Types.ObjectId, ref: "User", require: true},
    ticker: {type: String, required: true},
    nickname: {type: String, required: true},
    avgBuyPrice: {type: Number, required: true},
    quantity: {type: Number, default: 1},
    emotion: {type: Number, default: 0},
    level : {type: Number, default: 1},
    exp : {type: Number, default: 5},
    createdAt: {type: Date, default: Date.now},
    lastInteract: {
        type: Map,
        of: Date, // 값이 Date 타입
        default: {},
    },
    quests : {
        type: [QuestSchema],
        default: [],
    },
    statusEffect : {
        type: [String], default: [],
    }
},{timestamps: true});

const Pet = models.Pet || model('Pet', PetSchema);

export default Pet;