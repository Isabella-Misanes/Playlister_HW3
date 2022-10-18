import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * DeleteSong_Transaction
 * @author Isabella Misanes
 */
export default class DeleteSong_Transaction extends jsTPS_Transaction {
    constructor(initStore, initIndex, initSong) {
        super();
        this.store = initStore;
        this.initIndex = initIndex;
        this.song = initSong;
    }

    doTransaction() {
        this.store.deleteSong(this.initIndex);
    }
    
    undoTransaction() {
        this.store.addSong(this.initIndex, this.song);
    }
}