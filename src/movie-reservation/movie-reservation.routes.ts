import { Routes } from '@angular/router';
import { MovieReservationSystemComponent } from './movie-reservation.component';
import { LoginComponent } from './login-page/login.component';
import { CarouselComponent } from 'src/widgets/carousel/carousel.component';

export const MOVIE_RESERVATION_ROUTES: Routes = [
    {
        path: 'home',
        component: MovieReservationSystemComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'movie-detail',
        component: CarouselComponent
    }
];
