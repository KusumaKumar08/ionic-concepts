import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Camera, CameraDirection, CameraResultType, CameraSource, GalleryImageOptions, ImageOptions } from '@capacitor/camera';
import { IonicModule } from '@ionic/angular';
import { Filesystem } from '@capacitor/filesystem';

@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.page.html',
  styleUrls: ['./files-upload.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class FilesUploadPage implements OnInit {
  files: Array<any> = [];
  image: any = "";
  constructor() { }

  ngOnInit() {
  }


  takePicture() {
    return new Promise(async (resolve, reject) => {
      let option: ImageOptions = {
        direction: CameraDirection.Front,
        resultType: CameraResultType.Base64,
        saveToGallery: false,
        source: CameraSource.Camera,
        quality: 70,
        width: 512,
        height: 512,
      }
      Camera.getPhoto(option).then((res) => {
        resolve(res);
        console.log(res, "result");
        this.image = 'data:image/;base64,' + res.base64String;
        console.log(this.image, "image");

      }).catch((err) => {
        reject(err)
      })
    })
  }

  uploadMultipleImages() {
    return new Promise(async (resolve, reject) => {
      let option: GalleryImageOptions = {
        limit: 10,
        quality: 70,
        width: 512,
        height: 512,
      }
      Camera.pickImages(option).then((res) => {
        resolve(res);
        console.log(res, "result");
        this.files = res.photos;
        console.log(this.files, "files");
        if (this.files.length > 0) {
          this.convert();
        }
      }).catch((err) => {
        reject(err)
      })
    })
  }

  convert() {
    this.files.forEach(async(element) => {
      console.log(element.path, "element.dat");

      element.path =await this.convertImageToBase64(element.path);
      console.log(element.path, "element.path");
    });
  }

  async convertImageToBase64(imagePath: string) {
    try {
      const file = await Filesystem.readFile({
        path: imagePath
      });
      // file.data contains the Base64 string
      console.log('Base64:', file.data);
      let base64 = 'data:image/;base64,' + file.data;
      console.log(base64,"base64");
      
      return base64;
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return null;
    }
  }


}
