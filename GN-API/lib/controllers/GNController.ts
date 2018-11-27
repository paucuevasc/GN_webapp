import * as mongoose from 'mongoose';
import { MovieListSchema } from '../models/NGModel';
import { Request, Response } from 'express';

const MovieList = mongoose.model('MovieList', MovieListSchema);

export class MovieListController{

    public addNewMovieList (req: Request, res: Response) {
        let newMovieList = new MovieList(req.body);

        newMovieList.save((err, movie) => {
            if(err){
                res.send(err);
            }
            res.json(movie);
        });
    }

    public getMovieList (req: Request, res: Response) {
        MovieList.find({}, (err, movieList) => {
            if(err){
                res.send(err);
            }
            res.json(movieList);
        })
    }
    public getListWithID (req: Request, res: Response) {           
        MovieList.findById(req.params.TypeList, (err, movieList) => {
            if(err){
                res.send(err);
            }
            res.json(movieList);
        });
    }

    public updateMovieList (req: Request, res: Response) {           
        MovieList.findOneAndUpdate({ _id: req.params.ListId }, req.body, { new: true }, (err, movieList) => {
            if(err){
                res.send(err);
            }
            res.json(movieList);
        });
    }

    public deleteMovieList (req: Request, res: Response) {           
        MovieList.remove({ _id: req.params.ListId }, (err, movieList) => {
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted movie list!'});
        });
    }


}