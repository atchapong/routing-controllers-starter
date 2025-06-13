
import { model, Schema, Document } from 'mongoose';
import { Games } from '@interfaces/game.interface';

const gameSchema: Schema = new Schema({
    name: String,
    detail: String,
    image : String,
    url : String,
    bet_rate : [],
    bet_price_min : Number,
    bet_price_max : Number,
    max_round : Number,
    round_per_min : Number,
    is_active: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },

});

const gamesModel = model<Games & Document>('games', gameSchema);

export default gamesModel;

