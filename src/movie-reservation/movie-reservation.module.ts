import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MovieReservationSystemComponent } from './movie-reservation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownComponent } from '../widgets/dropdown/dropdown.component';
import { CarouselComponent } from '../widgets/carousel/carousel.component';
import { RouterModule } from '@angular/router';
import { MOVIE_RESERVATION_ROUTES } from './movie-reservation.routes';
import { SelectedMovieComponent } from '../movie-reservation/selected-movie/selected-movie.component';
import { SelectedSeatsComponent } from '../movie-reservation/selected-seats/selected-seats.component';
import { DateTimePickerComponent } from '../widgets/date-time-picker/date-time-picker.component';
import { StarRatingComponent } from '../widgets/star-rating/star-rating.component';
import { PaymentPageComponent } from '../movie-reservation/payment-page/payment-page.component';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule, AuthConfig, ValidationHandler, OAuthStorage, OAuthModuleConfig } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { LoginComponent } from '../movie-reservation/login-page/login.component';

const config: AuthConfig = {
  issuer: 'https://localhost:9443/oauth2/oidcdiscovery',
  clientId: '0DcXmT4BuWFtUNvgg7p8w21Q4cEa',
  customQueryParams: {
    audience: 'https://auth0-demo-001.indus.acc'
  },
  redirectUri: window.location.origin + '/index.html',
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  scope: 'openid profile email offline_access api',
  strictDiscoveryDocumentValidation: false,
  skipIssuerCheck: true,
};

const authModuleConfig: OAuthModuleConfig = {
  // Inject "Authorization: Bearer ..." header for these APIs:
  resourceServer: {
    allowedUrls: ['http://localhost:8080'],
    sendAccessToken: true,
  },
};

@NgModule({
  declarations: [
    MovieReservationSystemComponent,
    DropdownComponent,
    CarouselComponent,
    SelectedMovieComponent,
    SelectedSeatsComponent,
    DateTimePickerComponent,
    StarRatingComponent,
    PaymentPageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    OAuthModule.forRoot(authModuleConfig),
    RouterModule.forRoot(MOVIE_RESERVATION_ROUTES),
  ],
  providers: [
    { provide: OAuthModuleConfig, useValue: authModuleConfig },
    { provide: ValidationHandler, useClass: JwksValidationHandler },
    { provide: OAuthStorage, useValue: localStorage },
    { provide: AuthConfig, useValue: config }
  ],
  bootstrap: [MovieReservationSystemComponent]
})
export class MovieReservationSystemModule { }
