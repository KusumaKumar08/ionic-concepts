import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule,CommonModule,FormsModule],
})
export class HomePage {
  data="";
  topics = [
    {
      menuLabel: "Biometric",
      url: "authentication"
    },
    {
      menuLabel: "Files upload",
      url: "files-upload"
    },
    {
      menuLabel: "Scanners",
      url: "scanners"
    },
    {
      menuLabel: "Database",
      url: "database"
    },
    {
      menuLabel: "",
      url: ""
    },
  ];
  constructor(private navCtrl: NavController) { }
  ngOnInit() {

  }

  _doNavigate(index: any) {
    this.navCtrl.navigateForward(this.topics[index].url);
  }
}
