const dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
  const request = indexedDB.open("myDatabase", 1);

  request.onupgradeneeded = (event) => {
    const db = (event.target as IDBOpenDBRequest).result;

    // Créer un object store pour les employés avec une clé primaire auto-incrémentée
    const employeeStore = db.createObjectStore("employees", { keyPath: "id", autoIncrement: true });

    // Créer un index unique pour le firstName
    employeeStore.createIndex("firstName", "firstName", { unique: true });
  };

  request.onsuccess = () => resolve(request.result);
  request.onerror = (event) => reject((event.target as IDBRequest).error);
});

export default dbPromise;
