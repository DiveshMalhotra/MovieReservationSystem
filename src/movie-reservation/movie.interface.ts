export interface MovieTemplate {
    title: string;
    genre: string;
    language: string;
    image: string;
    imageLarge: string;
    actor: string[];
    director: string;
    rating: number;
    imageStack: string[];
}

export interface MovieTheatreTimings {
    theatre: string;
    location: string;
    timings: string[];
}

export interface CornerRowSeats {
    row: string;
    seats: Seats[];
}

export interface Seats {
    middleArea: boolean;
    seatNumber: string;
    seatStatus: string;
    seatSelected: boolean;
}
