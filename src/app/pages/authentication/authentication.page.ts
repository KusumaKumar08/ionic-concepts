import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FingerprintAIO } from '@awesome-cordova-plugins/fingerprint-aio/ngx';
import { FilesUploadPage } from '../files-upload/files-upload.page';
import { ModalController } from '@ionic/angular/standalone';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AuthenticationPage implements OnInit {
  isAvailable: any;
  constructor(private biometric: FingerprintAIO,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  authenticateWithFingerprint() {
    this.isAvailable = this.biometric.isAvailable();
    console.log(this.isAvailable, "isAvailable");

    this.biometric.isAvailable().then((result) => {
      console.log(result, "result");
      this.isAvailable = result.toLocaleUpperCase();
      this.biometric.show({
        cancelButtonTitle: 'Cancel',
        description: 'Verify it is you',
        fallbackButtonTitle: 'FB Back Button',
        subtitle: 'Use fingerprint to continue',
        title: 'Sample',
      }).then((result) => {
        console.log(result);
      }).catch((error) => {
        if (error.code != -108) {
          alert('Fingerprint is not available');
        }
      })
    })
  }

  async open() {
    const modal = await this.modalCtrl.create({
      component: FilesUploadPage,
    });
     modal.present();
  }
}
