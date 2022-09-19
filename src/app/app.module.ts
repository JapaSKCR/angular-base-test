import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AvatarModule } from './common/components/avatar/avatar.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SpinnerInterceptor } from './common/interceptors/spinner.interceptor';
import { SpinnerComponent } from './common/components/spinner/spinner.component';
import { DeleteConfirmationComponent } from './common/components/dialog/delete-confirmation/delete-confirmation.component';

export const maskOptions: Partial<IConfig> | (() => Partial<IConfig>) = {};
@NgModule({
  declarations: [ AppComponent, SpinnerComponent ],
  imports: [
    BrowserModule,
    AppRouting,
    HttpClientModule,
    NgxMaskModule.forRoot(maskOptions),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    AvatarModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/configurations/i18n/', '.json');
}
