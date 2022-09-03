/**
 * RecentlyOperations class.
 * @class
 */

export function RecentlyOperations() {
    /**
     * 
     * @key key on the localStorage.
     * @type string
     */
    this.key = 'recentlyTranslated';
}

/**
 * Add a new item to the localStorage.
 * @name RecentlyOperations#add
 * @param {string} input 
 * @param {string} output 
 * @function
 */
RecentlyOperations.prototype.add = function (input, output) {
    if (output !== "Something went wrong...") {
        let localData = this.getObjectList();
        let nextIndex = localData.indexOf(localData.at(-1)) + 1;
        localData.push({
            'id': nextIndex,
            'input': input,
            'output': output
        });
        this.updateLocalStorage(localData);
    }

}

/**
 * Remove an item on the localStorage.
 * @name RecentlyOperations#remove
 * @param {number} id 
 * @function
 */
RecentlyOperations.prototype.remove = function (id) {
    let localData = this.getObjectList();
    for (const index in localData) {
        if (localData[index].id === id) {
            localData.splice(index,1);
        }
    }

    this.updateLocalStorage(localData);
}

/**
 * clear the localStorage.
 * @name RecentlyOperations#clear
 * @function
 */
RecentlyOperations.prototype.clear = function () {
    delete localStorage[this.key]
}

/**
 * Get the localStorage.
 * @name RecentlyOperations#getObjectList
 * @returns {array} array of objects on the localStorage.
 * @function
 */
RecentlyOperations.prototype.getObjectList = function () {
    return localStorage[this.key] ? JSON.parse(localStorage[this.key]) : [];
}

/**
 * update the localStorage.
 * @name RecentlyOperations#updateLocalStorage
 * @param {array} new data to update the localStorage.
 */
RecentlyOperations.prototype.updateLocalStorage = function (data) {
    localStorage[this.key] = JSON.stringify(data);
}