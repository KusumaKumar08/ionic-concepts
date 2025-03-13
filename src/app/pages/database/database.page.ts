import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DbsevicesService, User } from 'src/app/services/dbsevices.service';
import { IonHeader, IonList, IonContent, IonLabel, IonItem, IonButton, IonIcon, IonToolbar, IonTitle, IonCheckbox, IonInput } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { trash, pencil } from 'ionicons/icons';
@Component({
  selector: 'app-database',
  templateUrl: './database.page.html',
  styleUrls: ['./database.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  imports: [IonInput, IonCheckbox, IonTitle, IonToolbar, IonIcon, IonButton, IonItem, CommonModule, FormsModule,
    IonLabel, IonContent, IonList, IonHeader]
})
export class DatabasePage implements OnInit {
  users!: Signal<User[]>; // ✅ Define as a Signal
  newUserName: string = '';

  constructor(private dbService: DbsevicesService) {
    addIcons({ trash, pencil, });
  }

  async ngOnInit() {
    this.users = computed(() => this.dbService.getUsers()()); // ✅ Convert signal

    // 
  }

  async createUser() {
    await this.dbService.addUsers(this.newUserName);
    this.newUserName = '';
    console.log(this.users());
  }

  async updateUser(user: User) {
    const active = user.active ? 1 : 0;
    await this.dbService.updateUserById(user.id.toString(), active);
  }

  async deleteUser(user: User) {
    await this.dbService.deleteUserById(user.id.toString());
  }

}
