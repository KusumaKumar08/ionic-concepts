import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, Platform } from '@ionic/angular/standalone';
import { StatusBar, Style } from '@capacitor/status-bar';
import { DbsevicesService } from './services/dbsevices.service';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private db: DbsevicesService) {
    this.intializeApp();
  }

  intializeApp() {
    this.platform.ready().then(async () => {
      StatusBar.setStyle({ style: Style.Light });
      StatusBar.setBackgroundColor({ color: "#a9edf7" });
      StatusBar.setOverlaysWebView({ overlay: false })
      await this.db.initializePlugin();
      SplashScreen.hide();
    });
  }
}
