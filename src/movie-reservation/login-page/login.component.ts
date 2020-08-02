import { Component, OnInit, } from '@angular/core';
import { OAuthService, OAuthErrorEvent } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  public username: string;

  get token() {
    return this.oauthService.getAccessToken();
  }
  get claims() {
    return this.oauthService.getIdentityClaims();
  }

  constructor(private oauthService: OAuthService,
              private http: HttpClient) {
    oauthService.events.subscribe(e => e instanceof OAuthErrorEvent ? console.error(e) : console.warn(e));

    // Load information from Auth0 (could also be configured manually)
    oauthService.loadDiscoveryDocument()

      // See if the hash fragment contains tokens (when user got redirected back)
      .then(() => oauthService.tryLogin())

      // If we're still not logged in yet, try with a silent refresh:
      .then(() => {
        if (!oauthService.hasValidAccessToken()) {
          return oauthService.silentRefresh();
        }
      })

      // Get username, if possible.
      .then(() => {
        if (oauthService.getIdentityClaims()) {
          this.username = oauthService.getIdentityClaims()['sub'];
        }
      });

    oauthService.setupAutomaticSilentRefresh();
  }

  public ngOnInit() {
    this.username = '';
    this.getClientList();
  }

  login() {
    this.oauthService.initImplicitFlow();
  }
  logout() {
    this.oauthService.logOut();
    this.username = '';
  }
  refresh() {
    this.oauthService.silentRefresh();
  }

  public getClientList() {
    this.http.get(
      'url'
    ).subscribe((response) => {
    });
  }
}
