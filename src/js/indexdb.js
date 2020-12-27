function wrap(req, transaction = null) {
  let promise = new Promise(function (resolve, reject) {
    req.onsuccess = function () {
      resolve(req.result);
    };
    req.onerror = function (e) {
      // prevent the transaction from being aborted
      // on a constraint error
      e.preventDefault();
      reject(req.error);
    };
  });
  if (transaction) {
    promise.abort = () => transaction.abort();
  }
  return promise;
}

export class IndexDBStore {
  constructor(name, version) {
    this._ready = false;
    this.storeName = name;
    this.version = version;
  }

  createTable(tableNames = []) {
    return new Promise((resolve, reject) => {
      const indexedDB =
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB;
      const IDBKeyRange =
        window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

      if (!indexedDB) {
        reject("No indexedDB implementation found!");
      }

      let req = indexedDB.open(this.storeName, this.version);

      req.onupgradeneeded = () => {
        this.db = req.result;
        tableNames.forEach((name) => {
          this.db.createObjectStore(name, {
            keyPath: "_id",
            autoIncrement: true,
          });
        });
      };

      req.onerror = () => reject(req.error);

      req.onsuccess = () => {
        this.db = req.result;
        this._ready = true;
        resolve(this);
      };
    });
  }

  // Internal function: returns the objectStore with the supplied
  // transaction mode. Defaults to readonly transaction.
  _getTransactionAndStore(tableName = null, mode = "readonly") {
    if (!!tableName) {
      let transaction = this.db.transaction(tableName, mode);
      let store = transaction.objectStore(tableName);
      return { transaction, store };
    }
  }

  // Internal function to defer the execution of a supplied function
  // until the database is ready.
  _checkReady() {
    if (!this._ready || !this.db) {
      throw new Error("Store not ready!");
    }
  }

  /**
   * Save an object into the database
   * @param {object}   object
   * @return {promise} Promise for the id/key to which
   * it was saved
   */
  add(tableName, object, replace = false) {
    this._checkReady();
    let { transaction, store } = this._getTransactionAndStore(
      tableName,
      "readwrite"
    );

    return !replace
      ? wrap(store.add(object), transaction)
      : wrap(store.put(object), transaction);
  }

  /**
   * Update or insert an Object at the given id/key.
   * @param {number}               id
   * @param {string|number|object} object
   * @return {promise}             Promise for the id/key of
   *                               the created object
   */
  // set (object) {
  //   this._checkReady();
  //   let { transaction, store } = this._getTransactionAndStore('readwrite');
  //   return wrap(store.put(object), transaction);
  // }

  /**
   * Returns the number of database entries.
   * @return {promise} Promise for the size.
   */
  count(tableName) {
    this._checkReady();
    let { transaction, store } = this._getTransactionAndStore(tableName);
    return wrap(store.count(), transaction);
  }

  /**
   * Update or insert multiple objects into the database
   * @param {objects}  objects
   * @return {promise}
   */
  setMany(tableName, objects) {
    this._checkReady();
    let { transaction, store } = this._getTransactionAndStore(
      tableName,
      "readwrite"
    );
    let promise = Promise.all(objects.map((obj) => store.put(obj)));
    promise.abort = () => transaction.abort();
    return promise;
  }

  /**
   * Get the object saved at a given id/key.
   * @param  {number|string} key
   * @return {promise}       Promise for the object
   */
  get(tableName, key) {
    this._checkReady();
    let { transaction, store } = this._getTransactionAndStore(tableName);
    return wrap(store.get(key), transaction);
  }

  /**
   * Get the object saved at a given id/key.
   * @param  {number|string} key
   * @return {promise}       Promise for the object
   */
  getAll(tableName) {
    this._checkReady();
    let { transaction, store } = this._getTransactionAndStore(tableName);
    return wrap(store.getAll(), transaction);
  }

  /**
   * Removes the the entry with the supplied id/key from the database.
   * @param  {number|string} key
   * @return {promise}       Promise for undefined
   */
  remove(tableName, key) {
    this._checkReady();
    let { transaction, store } = this._getTransactionAndStore(
      tableName,
      "readwrite"
    );
    return wrap(store.delete(key), transaction);
  }

  /**
   * Deletes all database entries.
   * @return {promise} Promise for undefined.
   */
  clear(tableName) {
    this._checkReady();
    let { transaction, store } = this._getTransactionAndStore(
      tableName,
      "readwrite"
    );
    return wrap(store.clear(), transaction);
  }
}
