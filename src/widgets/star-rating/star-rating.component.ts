import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-star-rating',
    templateUrl: './star-rating.component.html'
})
export class StarRatingComponent implements OnInit {

    @Input() public currentRate: number;

    constructor() {}

    public ngOnInit() {}

    public updateRating(rating: number): void {
        this.currentRate = rating;
    }
}
