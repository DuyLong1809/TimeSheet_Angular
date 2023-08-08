import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { DialogFailedComponent } from './modules/dialog-failed/dialog-failed.component';
import { HomeComponent } from './modules/home/home.component';
import { HeaderComponent } from './modules/layout/header/header.component';
import { SidebarComponent } from './modules/layout/sidebar/sidebar.component';
import { ToKenAuth } from './core/interceptors/sample.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './shared/shared/shared.module';
import { TsProjectModule } from './modules/ts-project/ts-project.module';
import { TsTaskModule } from './modules/ts-task/ts-task.module';
import { SnackBarComponent } from './shared/snack-bar/snack-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogFailedComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    // SnackBarComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    SharedModule,
    TsProjectModule,
    TsTaskModule,
    
  ],  
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ToKenAuth,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
