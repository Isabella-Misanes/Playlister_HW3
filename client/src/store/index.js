import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import AddSong_Transaction from '../transaction/AddSong_Transaction';
import DeleteSong_Transaction from '../transaction/DeleteSong_Transaction';
import EditSong_Transaction from '../transaction/EditSong_Transaction';
import MoveSong_Transaction from '../transaction/MoveSong_Transaction';
import api from '../api'
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    MARK_SONG_FOR_DELETION: "MARK_SONG_FOR_DELETION",
    UPDATE_IDNAMEPAIRS: "UPDATE_IDNAMEPAIRS",
    MARK_SONG_FOR_EDIT: "MARK_SONG_FOR_EDIT",
    CANCEL_CHANGE_LIST_NAME: "CANCEL_CHANGE_LIST_NAME"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        listMarkedForDeletion: null,
        songToDelete: null,
        songToEdit: null,
        canUndo: tps.hasTransactionToUndo(),
        canRedo: tps.hasTransactionToRedo(),
        isModalOpen: false
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: null,
                    songToDelete: null,
                    songToEdit: null,
                    canUndo: tps.hasTransactionToUndo(),
                    canRedo: tps.hasTransactionToRedo(),
                    isModalOpen: false
                });
            }
            case GlobalStoreActionType.CANCEL_CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: null,
                    songToDelete: null,
                    songToEdit: null,
                    canUndo: tps.hasTransactionToUndo(),
                    canRedo: tps.hasTransactionToRedo(),
                    isModalOpen: false
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: null,
                    songToDelete: null,
                    songToEdit: null,
                    canUndo: tps.hasTransactionToUndo(),
                    canRedo: tps.hasTransactionToRedo(),
                    isModalOpen: false
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    listMarkedForDeletion: null,
                    songToDelete: null,
                    songToEdit: null,
                    canUndo: tps.hasTransactionToUndo(),
                    canRedo: tps.hasTransactionToRedo(),
                    isModalOpen: false
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: null,
                    songToDelete: null,
                    songToEdit: null,
                    canUndo: tps.hasTransactionToUndo(),
                    canRedo: tps.hasTransactionToRedo(),
                    isModalOpen: false
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: payload,
                    songToDelete: null,
                    songToEdit: null,
                    canUndo: tps.hasTransactionToUndo(),
                    canRedo: tps.hasTransactionToRedo(),
                    isModalOpen: true
                });
            }
            //Mark song for DELETION
            case GlobalStoreActionType.MARK_SONG_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: null,
                    songToDelete: payload,
                    songToEdit: null,
                    canUndo: tps.hasTransactionToUndo(),
                    canRedo: tps.hasTransactionToRedo(),
                    isModalOpen: true
                });
            }
            //Mark song for EDIT
            case GlobalStoreActionType.MARK_SONG_FOR_EDIT: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: null,
                    songToDelete: null,
                    songToEdit: payload,
                    canUndo: tps.hasTransactionToUndo(),
                    canRedo: tps.hasTransactionToRedo(),
                    isModalOpen: true
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: null,
                    songToDelete: null,
                    songToEdit: null,
                    canUndo: tps.hasTransactionToUndo(),
                    canRedo: tps.hasTransactionToRedo(),
                    isModalOpen: false
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    listMarkedForDeletion: null,
                    canUndo: tps.hasTransactionToUndo(),
                    canRedo: tps.hasTransactionToRedo(),
                    isModalOpen: true
                });
            }
            //DELETE LIST
            case GlobalStoreActionType.UPDATE_IDNAMEPAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: null,
                    songToDelete: null,
                    songToEdit: null,
                    canUndo: null,
                    canRedo: null,
                    isModalOpen: false
                });
            }

            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylist(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        if(newName) {
            asyncChangeListName(id);
        }
        else {
            storeReducer ({
                type: GlobalStoreActionType.CANCEL_CHANGE_LIST_NAME
            });
        }
    }

    // Creates a new empty playlist
    store.createNewList = function () {
        async function asyncCreateNewList() {
            if(store.idNamePairs.length > 0) {
                let r = await api.getAllPlaylists();
                if(r.data.success) {
                    let count = r.data.data.length+1;
                    let response = await api.createNewList({name: "Untitled " + count, songs: []});
                    if (response.data.success) {
                        let playlistId = response.data.playlist._id;
                        store.setCurrentList(playlistId);
                    }
                }
            }
            else {
                let response = await api.createNewList({name: "Untitled " + 1, songs: []});
                    if (response.data.success) {
                        let playlistId = response.data.playlist._id;
                        store.setCurrentList(playlistId);
                    }
            }
        }
        asyncCreateNewList();
    }

    //Deletes playlist
    store.markDeleteList = function (idNamePair) {
        async function asyncMarkDeleteList() {
            storeReducer ({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: idNamePair
            });
        }
        asyncMarkDeleteList();
        store.showDeleteListModal();
    }

    store.showDeleteListModal = function() {
        let modal = document.getElementById("delete-list-modal");
        modal.classList.add("is-visible");
    }

    store.hideDeleteListModal = function() {
        storeReducer ({
            type: GlobalStoreActionType.UPDATE_IDNAMEPAIRS,
            payload: store.idNamePairs
        });
        let modal = document.getElementById("delete-list-modal");
        modal.classList.remove("is-visible");
    }
    store.deleteList = function () {
        async function asyncDeleteList() {
            let list = store.listMarkedForDeletion;
            let response = await api.deletePlaylist(list._id, list);
            if(response.data.success) {
                let listOfPlaylists = store.idNamePairs;
                let list = store.listMarkedForDeletion;
                let index = -1;
                let strList = JSON.stringify(list);
                for(let i=0; i<listOfPlaylists.length; i++) {
                    let x = JSON.stringify(listOfPlaylists[i]);
                    if(x === strList) {
                        index = i;
                        break;
                    }
                }
                console.log(index);
                listOfPlaylists.splice(index, 1);
                storeReducer ({
                    type: GlobalStoreActionType.UPDATE_IDNAMEPAIRS,
                    payload: listOfPlaylists
                });
            }
        }
        asyncDeleteList();
        let modal = document.getElementById("delete-list-modal");
        modal.classList.remove("is-visible");
        console.log(store.idNamePairs);
        //store.loadIdNamePairs();
    }

    //DELETE song
    store.markSongForDeletion = function(song) {
        async function asyncMarkDeleteSong() {
            storeReducer ({
                type: GlobalStoreActionType.MARK_SONG_FOR_DELETION,
                payload: song
            });
        }
        asyncMarkDeleteSong();
        store.showDeleteSongModal();
    }
    store.deleteSongTransaction = function () {
        let transaction = new DeleteSong_Transaction(store, store.songToDelete.index, store.songToDelete.song);
        tps.addTransaction(transaction);
    }
    store.deleteSong = function (index) {
        async function asyncDeleteSong() {
            let list = store.currentList;
            list.songs.splice(index, 1);
            let response = await api.updatePlaylist(list._id, list);
            if(response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: list
                });
            }
        }
        asyncDeleteSong();
        store.hideDeleteSongModal();
    }
    store.showDeleteSongModal = function() {
        let modal = document.getElementById("delete-song-modal");
        modal.classList.add("is-visible");
    }
    store.hideDeleteSongModal = function() {
        storeReducer ({
            type: GlobalStoreActionType.SET_CURRENT_LIST,
            payload: store.currentList
        });
        let modal = document.getElementById("delete-song-modal");
        modal.classList.remove("is-visible");
    }

    //EDIT Song
    store.markSongForEdit = function(song) {
        async function asyncMarkEditSong() {
            storeReducer ({
                type: GlobalStoreActionType.MARK_SONG_FOR_EDIT,
                payload: song
            });
        }
        asyncMarkEditSong();
        store.showEditSongModal();
    }
    store.editSongTransaction = function() {
        let newSong = {
            title: document.getElementById("song-title").value,
            artist: document.getElementById("song-artist").value,
            youTubeId: document.getElementById("song-youTubeId").value
        };
        let oldSong = store.songToEdit.song;
        let transaction = new EditSong_Transaction(store, store.songToEdit.index, oldSong, newSong);
        tps.addTransaction(transaction);
    }
    store.editSong = function (index, song) {
        async function asyncEditSong() {
            let list = store.currentList;
            list.songs[index] = song;
            let response = await api.updatePlaylist(list._id, list);
            if(response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: list
                });
            }
        }
        asyncEditSong();
        store.hideEditSongModal();
    }
    store.showEditSongModal = function() {
        let modal = document.getElementById("edit-song-modal");
        modal.classList.add("is-visible");
    }
    store.hideEditSongModal = function() {
        storeReducer ({
            type: GlobalStoreActionType.SET_CURRENT_LIST,
            payload: store.currentList
        });
        let modal = document.getElementById("edit-song-modal");
        modal.classList.remove("is-visible");
    }


    //Adds song to the end of the playlist
    store.addSong = function(index, song) {
        async function asyncAddSong() {
            let list = store.currentList;
            list.songs.splice(index, 0, song);
            let response = await api.updatePlaylist(list._id, list);
            if(response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: list
                });
            }
        }
        asyncAddSong();
    }
    store.addSongTransaction = function() {
        let transaction = new AddSong_Transaction(store, store.currentList.songs.length);
        tps.addTransaction(transaction);
    }

    //Moves song and shifts down all other songs
    store.moveSongTransaction = function(oldIndex, newIndex) {
        let transaction = new MoveSong_Transaction(store, oldIndex, newIndex);
        tps.addTransaction(transaction);
    }
    store.moveSong = function (start, end) {
        async function asyncMoveSong(){    
            let list = store.currentList;
            // WE NEED TO UPDATE THE STATE FOR THE APP
            if (start < end) {
                let temp = list.songs[start];
                for (let i = start; i < end; i++) {
                    list.songs[i] = list.songs[i + 1];
                }
                list.songs[end] = temp;
            }
            else if (start > end) {
                let temp = list.songs[start];
                for (let i = start; i > end; i--) {
                    list.songs[i] = list.songs[i - 1];
                }
                list.songs[end] = temp;
            }
            let response = await api.updatePlaylist(list._id, list);
            if(response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: list
                });
            }
        }
        asyncMoveSong();
    }


    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        tps.clearAllTransactions();
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }
    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }
    store.undoRedoHandling = function(event) {
        if(!store.isModalOpen) {
            if(event.ctrlKey && event.key === "z") {
                store.undo();
            }
            else if(event.ctrlKey && event.key === "y") {
                store.redo();
            }
        }
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setListNameActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}