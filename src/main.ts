import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MovieReservationSystemModule } from './movie-reservation/movie-reservation.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(MovieReservationSystemModule)
  .catch(err => console.log(err));
