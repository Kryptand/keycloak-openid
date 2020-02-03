import {Component} from '@angular/core';
import {AuthConfig, OAuthService} from "angular-oauth2-oidc";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private oauthService: OAuthService) {
    const config = new AuthConfig();
    config.skipIssuerCheck = true;
    config.issuer = 'http://localhost:8080';
    config.clientId = 'angular-app-1';
    config.redirectUri = window.location.origin + '/index.html';
    config.scope = 'openid profile email';

    this.oauthService.configure(config);
    this.oauthService.loadDiscoveryDocument('http://localhost:8080/auth/realms/kryptand/.well-known/openid-configuration').then((doc) => {
      // Eventuelle Tokens aus Url entnehmen
      this.oauthService.tryLogin({});
    });
  }

}
