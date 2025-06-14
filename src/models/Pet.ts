import {Schema, model, models, Types} from "mongoose";

const PetSchema = new Schema({
    owner: {type: Types.ObjectId, ref: "User", require: true},
    ticker: {type: String, required: true},
    nickname: {type: String, required: true},
    avgBuyPrice: {type: Number, required: true},
    quantity: {type: Number, default: 1},
    emotion: {type: String, default: "neutral"},
    level : {type: Number, default: 1},
    
},{timestamps: true});

const Pet = models.Pet || model('Pet', PetSchema);

export default Pet;