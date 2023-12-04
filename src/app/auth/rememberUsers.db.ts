import { Injectable } from "@angular/core";
import { DatabaseDb } from "../database.db";
import { RememberUserModel } from "./remember-user.model";

@Injectable({
    providedIn: 'root'
})
export class RememberUsersDb extends DatabaseDb {
    
    getRememberUser(userId: string): Promise<RememberUserModel> {
        return new Promise((resolve, reject) => {
          if (this.db !== null) {
            const transaction = this.db.transaction(['rememberUsers'], 'readonly');
            const objectStore = transaction.objectStore('rememberUsers');
            const request = objectStore.get(userId);
      
            request.onsuccess = () => {
              resolve(request.result);
            }
          }
        })
      }
    
      onUpdateRememberUser(user: RememberUserModel) {
        if (this.db) {
          const transaction = this.db.transaction(['rememberUsers'], 'readwrite');
          const objectStore = transaction.objectStore('rememberUsers');
          objectStore.put(user);
        }
      }
    
      onDeleteRememberUser(userId: string): Promise<void> {
        return new Promise((resolve, reject) => {
            // event.stopPropagation();
            // const ok = confirm('Esta seguro de eliminar?...');
            if (this.db) {
              const transaction = this.db.transaction(['rememberUsers'], 'readwrite');
              const objectStore = transaction.objectStore('rememberUsers');
              const request = objectStore.delete(userId);
              request.onsuccess = () => {
                resolve()
              }
            }
        })
      }
    
      loadRememberUsers(): Promise<RememberUserModel[]> {
        return new Promise((resolve, reject) => {
            if (this.db !== null) {
              const transaction = this.db.transaction(['rememberUsers'], 'readonly');
              const objectStore = transaction.objectStore('rememberUsers');
              const request = objectStore.openCursor();
              const rememberUsers: RememberUserModel[] = [];
              request.onsuccess = (e: any) => {
                const cursor = e.target.result;
                if (cursor) {
                  rememberUsers.push(cursor.value);
                  cursor.continue();
                } else {
                    resolve(rememberUsers);
                }
              }
            }
        })
      }

}