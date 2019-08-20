import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Router, RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RoutesModule} from './df/routes/routes.module';
import {LayoutModule} from './df/layout/layout.module';
import {CoreModule} from './df/core/core.module';
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';

@NgModule({
    declarations: [
        AppComponent
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot({
            name: '__mydb',
            driverOrder: [ 'indexeddb', 'websql' ]
        }),
        CoreModule,
        LayoutModule,
        RoutesModule,
        AppRoutingModule
    ],
    providers: [
        {provide: ErrorHandler, useClass: ErrorHandler},
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    // Diagnostic only: inspect router configuration
    constructor(router: Router) {
        // Use a custom replacer to display function names in the route configs
        const replacer = (key, value) => (typeof value === 'function') ? value.name : value;

        console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
        window.localStorage.setItem("appModule" , new Date().toISOString());
    }
}
