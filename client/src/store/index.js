import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
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
    DELETE_LIST: "DELETE_LIST",
    //DELETE_SONG: "DELETE_SONG"
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
        deleteListModalOpen: false,
        listMarkedForDeletion: null,
        songToDelete: null,
        editSongModalOpen: false,
        deleteSongModalOpen: false
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
                    deleteListModalOpen: false,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    songToDelete: store.songToDelete,
                    editSongModalOpen: false,
                    deleteSongModalOpen: false
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    deleteListModalOpen: false,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    songToDelete: store.songToDelete,
                    editSongModalOpen: false,
                    deleteSongModalOpen: false
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    deleteListModalOpen: false,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    songToDelete: store.songToDelete,
                    editSongModalOpen: false,
                    deleteSongModalOpen: false
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    deleteListModalOpen: false,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    songToDelete: store.songToDelete,
                    editSongModalOpen: false,
                    deleteSongModalOpen: false
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    deleteListModalOpen: true,
                    listMarkedForDeletion: payload,
                    songToDelete: store.songToDelete,
                    editSongModalOpen: false,
                    deleteSongModalOpen: false
                });
            }
            //Mark song for deletion
            case GlobalStoreActionType.MARK_SONG_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    deleteListModalOpen: true,
                    listMarkedForDeletion: payload,
                    songToDelete: payload,
                    editSongModalOpen: false,
                    deleteSongModalOpen: false
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    deleteListModalOpen: false,
                    listMarkedForDeletion: null,
                    songToDelete: null,
                    editSongModalOpen: false,
                    deleteSongModalOpen: false
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    deleteListModalOpen: false,
                    listMarkedForDeletion: null,
                    songToDelete: store.songToDelete,
                    editSongModalOpen: false,
                    deleteSongModalOpen: false
                });
            }
            case GlobalStoreActionType.DELETE_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    deleteListModalOpen: true,
                    listMarkedForDeletion: null,
                    songToDelete: store.songToDelete,
                    editSongModalOpen: false,
                    deleteSongModalOpen: false
                });
            }
/*
            case GlobalStoreActionType.DELETE_SONG: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    deleteListModalOpen: true,
                    listMarkedForDeletion: null,
                    songToDelete: null,
                    editSongModalOpen: false,
                    deleteSongModalOpen: false
                });
            }
            */

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
        asyncChangeListName(id);
    }

    // Creates a new empty playlist
    store.createNewList = function () {
        async function asyncCreateNewList() {
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
        asyncCreateNewList();
    }

    //Deletes playlist
    store.markDeleteList = function (idNamePair) {
        async function asyncMarkDeleteList() {
            storeReducer ({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: {
                    listMarkedForDeletion: idNamePair
                }
            });
            
        }
        asyncMarkDeleteList();
        console.log(store.listMarkedForDeletion);
        store.showDeleteListModal();
    }

    store.showDeleteListModal = function() {
        let modal = document.getElementById("delete-list-modal");
        modal.classList.add("is-visible");
    }

    store.hideDeleteListModal = function() {
        let modal = document.getElementById("delete-list-modal");
        modal.classList.remove("is-visible");
    }

    store.deleteList = function () {
        console.log("Confirmed. In DELETE list");
        let modal = document.getElementById("delete-list-modal");
        modal.classList.remove("is-visible");
        
    }

    //Delete song
    store.markSongForDeletion = function(song) {
        async function asyncMarkDeleteSong() {
            storeReducer ({
                type: GlobalStoreActionType.MARK_SONG_FOR_DELETION,
                payload: {
                    songToDelete: song
                }
            });
        }
        asyncMarkDeleteSong();
        store.showDeleteSongModal();
    }
    store.deleteSong = function () {
        async function asyncDeleteSong() {
            let list = store.currentList;
            let index = store.songToDelete.songToDelete.index;
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
        let modal = document.getElementById("delete-song-modal");
        modal.classList.remove("is-visible");
    }

    //Adds song to the end of the playlist
    store.addSong = function() {
        async function asyncAddSong() {
            let list = store.currentList;
            let index = list.songs.length;
            let song = {
                title: "Untitled",
                artist: "Unknown",
                youTubeId: "dQw4w9WgXcQ"
            }
            list.songs[index] = song;
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

    //Moves song and shifts down all other songs
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