export class Result {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
  inList: boolean;
  constructor(Poster: string, Title: string, Type: string, Year: string, imdbID: string, inList: boolean) {
    this.Poster = Poster;
    this.Title = Title;
    this.Type = Type;
    this.Year = Year;
    this.imdbID = imdbID;
    this.inList = inList;

  }
}

export class ListItem {
    title: string;
    year: string;
    poster: string;
    imdbID: string;
    constructor(title: string, year: string, poster: string, imdbID: string) {
      this.title = title;
      this.year = year;
      this.poster = poster;
      this.imdbID = imdbID;
    }}

  export class List {
    listID: string;
    TypeList: string;
    movies: Array<ListItem>;
    addMovie(movie) {
      this.movies.push(movie);
    }
    deleteMovie(movieName) {
      for (let i = 0; i < this.movies.length; i++ ) {
        if (movieName === this.movies[i].title) {
          this.movies.splice(i, 1);
        }
      }
    }
    constructor (movies: Array<ListItem>) {
      this.movies = [];
    }
  }
