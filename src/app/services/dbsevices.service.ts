import { Injectable, signal, WritableSignal } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

const DB_USERS = 'myuserdb';

export interface User {
  id: number;
  name: string;  // ✅ Fixed "String" to "string"
  active: number;
  isEdit: boolean
}

@Injectable({
  providedIn: 'root'
})
export class DbsevicesService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private users: WritableSignal<User[]> = signal<User[]>([]);

  constructor() { }

  async initializePlugin() {
    try {
      const existingConnection = await this.sqlite.isConnection(DB_USERS, false);
      console.log('Existing connection:', existingConnection.result);

      if (existingConnection.result) {
        // ✅ Reuse the existing connection
        this.db = await this.sqlite.retrieveConnection(DB_USERS, false);
      } else {
        // ✅ Create a new connection if it doesn't exist
        this.db = await this.sqlite.createConnection(DB_USERS, false, 'no-encryption', 1, false);
        await this.db.open();
      }

      console.log('Database initialized successfully');

      if (!this.db) {
        throw new Error('Database connection is not established.');
      }

      const schema = `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        active INTEGER DEFAULT 1,
        isEdit TEXT DEFAULT False
      );`;

      await this.db.execute(schema);
      await this.loadUsers();
    } catch (error: any) {
      console.error('DB Initialization Error:', error.message || error);
    }
  }

  getUsers() {
    return this.users;  // ✅ Return array, not signal
  }

  async loadUsers() {
    const users = await this.db.query('SELECT * FROM users');
    this.users.set(users.values || []);
  }

  async addUsers(name: string) {
    if (!this.db) {
      console.error('Database is not initialized');
      this.initializePlugin();
      return;
    }

    const query = `INSERT INTO users (name) VALUES (?)`;
    try {
      await this.db.run(query, [name]); // ✅ Use parameterized query
      await this.loadUsers();
    } catch (error) {
      console.error('Error inserting user:', error);
    }
  }

  async updateUserById(id: string, active: number) {
    const query = `UPDATE users SET active=? WHERE id=?`;  // ✅ Parameterized query
    await this.db.run(query, [active, id]);
    await this.loadUsers();
  }

  async deleteUserById(id: string) {
    const query = `DELETE FROM users WHERE id=?`;  // ✅ Parameterized query
    await this.db.run(query, [id]);
    await this.loadUsers();
  }

  async closeDB() {
    if (this.db) {
      await this.db.close();
      await this.sqlite.closeConnection('myuserdb', false);
      // this.db = null;
      console.log("Database connection closed.");
    }
  }

}
