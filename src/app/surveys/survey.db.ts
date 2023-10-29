import { Injectable } from "@angular/core";
import { BusinessModel } from "../businesses/business.model";

@Injectable({
  providedIn: 'root'
})
export class SurveyDb {
  private db: IDBDatabase|null = null;

  loadDb(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (indexedDB) {
        const request = indexedDB.open('fidenza', 2);

        request.onsuccess = () => {
          this.db = request.result;
          console.log('OPEN', this.db);
          resolve();
        }

        request.onupgradeneeded = e => {
          this.db = request.result;

          if (e.oldVersion < 1) {
            console.log('creando table SURVEYS');
            this.db.createObjectStore('surveys', { keyPath: '_id' });
          }

          if (e.oldVersion < 2) {
            console.log('resetenando tabla SURVEYS');
            this.db.deleteObjectStore('surveys');
            this.db.createObjectStore('surveys', { keyPath: '_id' });
          }
        }

        request.onerror = (error) => {
          console.log('Error', error);
          reject();
        }
      } else {
        reject();
      }
    });
  }

  getSurveyObejctByDate(date: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.db !== null) {
        const transaction = this.db.transaction(['surveys'], 'readonly');
        const objectStore = transaction.objectStore('surveys');
        const request = objectStore.get(date);
  
        request.onsuccess = () => {
          resolve(request.result);
        }
      }
    });
  };

  create(businesses: BusinessModel[], date: Date) {
    if (this.db !== null) {
      const surveyObject = { _id: date.toLocaleDateString(), businessIds: businesses.map(e => e._id) }
      const transaction = this.db.transaction(['surveys'], 'readwrite');
      const objectStore = transaction.objectStore('surveys');
      objectStore.put(surveyObject);
    }
  }

}