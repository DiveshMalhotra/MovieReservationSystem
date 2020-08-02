import { Component, OnInit, } from '@angular/core';
import { MovieTemplate } from './movie.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-reservation-system',
  templateUrl: './movie-reservation.component.html',
  styles: []
})
export class MovieReservationSystemComponent implements OnInit {

  public movieTemplate: MovieTemplate[];

  public searchString: string;

  public searchedMovies: string[];

  public locationOptions: string[];

  public bookTicket: boolean;

  public selectedTitle: MovieTemplate[];

  public currentRating: number;

  public amount: number;

  constructor(private router: Router) { }

  public ngOnInit() {
    this.searchedMovies = [];
    this.locationOptions = [];
    this.selectedTitle = [];
    this.movieTemplate = [
      {
        title: 'abc',
        genre: 'Action',
        language: 'English',
        image: 'https://picsum.photos/id/944/250/125',
        imageLarge: 'https://picsum.photos/id/944/600/250',
        actor: ['New Arrival', 'Fresh Arrival'],
        director: 'John Doe',
        rating: 4,
        imageStack: ['https://picsum.photos/id/944/600/250', 'https://picsum.photos/id/1011/600/250',
          'https://picsum.photos/id/984/600/250', 'https://picsum.photos/id/1000/600/250']
      },
      {
        title: 'abcd',
        genre: 'Action',
        language: 'English',
        image: 'https://picsum.photos/id/1011/250/125',
        imageLarge: 'https://picsum.photos/id/1011/600/250',
        actor: ['New Arrival', 'Fresh Arrival'],
        director: 'John Doe',
        rating: 3,
        imageStack: ['https://picsum.photos/id/944/600/250', 'https://picsum.photos/id/1011/600/250',
          'https://picsum.photos/id/984/600/250', 'https://picsum.photos/id/1000/600/250']
      },
      {
        title: 'pqr',
        genre: 'Comedy',
        language: 'English',
        image: 'https://picsum.photos/id/984/250/125',
        imageLarge: 'https://picsum.photos/id/984/600/250',
        actor: ['New Arrival', 'Fresh Arrival'],
        director: 'John Doe',
        rating: 5,
        imageStack: ['https://picsum.photos/id/944/600/250', 'https://picsum.photos/id/1011/600/250',
          'https://picsum.photos/id/984/600/250', 'https://picsum.photos/id/1000/600/250']
      },
      {
        title: 'xyz',
        genre: 'RomCom',
        language: 'Hindi',
        image: 'https://picsum.photos/id/1000/250/125',
        imageLarge: 'https://picsum.photos/id/1000/600/250',
        actor: ['New Arrival', 'Fresh Arrival'],
        director: 'John Doe',
        rating: 2,
        imageStack: ['https://picsum.photos/id/944/600/250', 'https://picsum.photos/id/1011/600/250',
          'https://picsum.photos/id/984/600/250', 'https://picsum.photos/id/1000/600/250']
      }
    ];
  }

  public setSearchString(enteredText: any): void {
    this.searchedMovies = [];
    enteredText = enteredText.toLocaleLowerCase();
    this.movieTemplate.forEach((searchValue: MovieTemplate) => {
      const searchedValue = searchValue.title.toLocaleLowerCase();
      const template = searchedValue.substring(0, enteredText.length);
      if (template === enteredText && enteredText.length > 0) {
        this.searchedMovies.push(searchValue.title);
      } else if (enteredText === '') {
        this.searchedMovies = [];
      }
    });
  }

  public carouselMovie(event: MovieTemplate) {
    this.selectedMovie(event);
  }

  public selectedMovie(selectedMovie: MovieTemplate) {
    this.searchString = selectedMovie.title;
    this.currentRating = selectedMovie.rating;
    this.selectedTitle = [selectedMovie];
    this.searchedMovies = [];
    this.router.navigate(['movie-detail']);
  }

  public searchedMovie(selectedMovie: string) {
    this.searchString = selectedMovie;
    this.movieTemplate.forEach((searchedMovie: MovieTemplate) => {
      if (searchedMovie.title === selectedMovie) {
        this.selectedTitle = [searchedMovie];
      }
    });
    this.searchedMovies = [];
  }

  public login() {
    this.router.navigate(['/login']);
  }

  public openDropdown() {
    this.locationOptions = ['Delhi NCR', 'Chandigarh', 'Haryana'];
  }

  public bookTickets() {
    this.bookTicket = true;
  }

  public paymentAmount(amount: number) {
    this.amount = amount;
  }

  public navigateHome() {
    this.searchString = '';
    this.bookTicket = false;
    this.amount = 0;
    this.router.navigate(['/home']);
  }
}
