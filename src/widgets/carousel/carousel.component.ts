import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MovieTemplate } from 'src/movie-reservation/movie.interface';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html'
})
export class CarouselComponent {

    @Input() public images: MovieTemplate[];

    @Output() readonly movieTitle: EventEmitter<MovieTemplate>;

    constructor() {
        this.movieTitle = new EventEmitter<MovieTemplate>();
    }

    public gotoTitle(movie: MovieTemplate) {
        this.movieTitle.emit(movie);
    }

}
