import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * EditSong_Transaction
 * @author Isabella Misanes
 */
export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(initStore, initIndex, oldSong, newSong) {
        super();
        this.store = initStore;
        this.initIndex = initIndex;
        this.oldSong = oldSong;
        this.newSong = newSong;
    }

    doTransaction() {
        this.store.editSong(this.initIndex, this.newSong);
    }
    
    undoTransaction() {
        this.store.editSong(this.initIndex, this.oldSong);
    }
}