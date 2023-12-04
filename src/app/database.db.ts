export class DatabaseDb {
    db: IDBDatabase | null = null;

    loadDb(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (indexedDB) {
                const request = indexedDB.open('fidenza', 1);

                request.onsuccess = () => {
                    this.db = request.result;
                    console.log('OPEN', this.db);
                    resolve();
                }

                request.onupgradeneeded = e => {
                    this.db = request.result;

                    if (e.oldVersion < 1) {
                        this.db.createObjectStore('surveys', { keyPath: '_id' });
                        this.db.createObjectStore('rememberUsers', { keyPath: '_id' });
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
}