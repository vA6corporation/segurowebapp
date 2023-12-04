import { Injectable } from "@angular/core";
import { BusinessModel } from "../businesses/business.model";
import { DatabaseDb } from "../database.db";

@Injectable({
    providedIn: 'root'
})
export class SurveyDb extends DatabaseDb {

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