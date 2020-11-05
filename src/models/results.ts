import {Schema, model, Document} from 'mongoose';

export interface IResults extends Document{
    competition: string;
    date: Date;
    oponent: string;
    result: string;
    score: number;
}

const ResultsSchema = new Schema ({
    id:{
        type: Number,
        required: true,
        unique: true
    },
    competition:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true,
        unique: true
    },
    oponent:{
        type: String,
        required: true
    },
    result:{
        type: String,
        require: true
    },
    score:{
        type: String,
        required: true
    }
})


export default model<IResults>('Results', ResultsSchema);