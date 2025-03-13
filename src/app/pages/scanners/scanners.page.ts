import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter } from '@ionic/angular/standalone';
import { BarcodeFormat, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-scanners',
  templateUrl: './scanners.page.html',
  styleUrls: ['./scanners.page.scss'],
  standalone: true,
  imports: [IonFooter, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ScannersPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  qrcodeScanner() {
    this.installGoogleModule().then((value) => {

    });
  }

  async installGoogleModule(): Promise<void> {
    await BarcodeScanner.scan({ formats: [BarcodeFormat.QrCode] }).then(res => {
      let Id = JSON.parse(JSON.stringify(res));
      let data = Id.barcodes[0];
      if (data !== null || data !== undefined || data !== '') {
        BarcodeScanner.stopScan();
      }
    }).catch(err => {
    });
  }

  barcodeScanner() {

  }

}
