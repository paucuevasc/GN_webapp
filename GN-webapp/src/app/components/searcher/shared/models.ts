
  // Class of a movie result of a search.
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

  // Class for a movie that belongs in a list.
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

  // Class for the different list.
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

  // Vote class with the votes of the first and second round.
  export class Votes {
    fRoundVotes: number;
    sRoundVotes: number;
    constructor (fRoundVotes: number, sRoundVotes: number) {
      this.fRoundVotes = fRoundVotes;
      this.sRoundVotes = sRoundVotes;
    }
  }

  // Voter class.
  export class Voter {
    voterID: string;
    voterState: boolean;
    votes: Votes;
    vote(round) {

    }
    constructor (voterID: string, voterState: boolean, votes: Votes ) {
      this.voterID = voterID;
      this.voterState = voterState;
      this.votes = votes;
    }
  }

  // Voters List class.
  export class VotersList {
    voters: Array<Voter>;
    addVoter(voter) {
      this.voters.push(voter);
    }

    constructor (voters: Array<Voter>) {
      this.voters = [];
    }
  }
