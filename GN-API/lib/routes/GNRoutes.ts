import {Request, Response} from "express";
import { MovieListController } from '../controllers/GNController';



export class Routes {

    public movieListController: MovieListController = new MovieListController();


    public routes(app): void {

        const cors = require('cors')
        const corsOptions = {
          origin: 'http://localhost:4200',
          optionsSuccessStatus: 200
        }
        app.use(cors(corsOptions))


        app.route('/')
        // GET endpoint
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request successful'
            })
        })

        //Movie

        app.route('/list')
        .get(this.movieListController.getMovieList)
        // POST enpoint
       .post(this.movieListController.addNewMovieList)
       .delete(this.movieListController.deleteMovieList);
       
        // Movie detail
        app.route('/list/:TypeList')
        // get specific movie
        .get(this.movieListController.getListWithID) 
        .put(this.movieListController.updateMovieList)
        .delete(this.movieListController.deleteMovieList)


    }
}