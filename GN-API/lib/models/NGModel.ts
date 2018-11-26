import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const MovieListSchema = new Schema({
    ListID: {
        type: String
    }, 
    TypeList: {
        type: String
    },
    Movies:[{
    imdbID: {
        type: String
    },
    title: {
        type: String
    },
    poster: {
        type: String
    },
    year: {
        type: String
    }
}]
})
