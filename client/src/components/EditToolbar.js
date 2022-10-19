import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let canAddSong = store.currentList !== null;
    let canClose = store.currentList !== null;

    let addButtonClass = "playlister-button";
    let undoButtonClass = "playlister-button";
    let redoButtonClass = "playlister-button";
    let closeButtonClass = "playlister-button";
    if (!canAddSong) addButtonClass += " disabled";
    if (!store.canUndo) undoButtonClass += " disabled";
    if (!store.canRedo) redoButtonClass += " disabled";
    if (!canClose) closeButtonClass += " disabled";

    if(store.isModalOpen) {
        addButtonClass += " disabled";
        undoButtonClass += " disabled";
        redoButtonClass += " disabled";
        closeButtonClass += " disabled";
    }

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }
    let editStatus = false;
    if (store.isListNameEditActive) {
        editStatus = true;
    }
    return (
        <span 
            id="edit-toolbar"
            onKeyDown={store.undoRedoHandling}
            tabIndex="1">
            <input
                type="button"
                id='add-song-button'
                disabled={editStatus}
                value="+"
                className={addButtonClass}
                onClick={store.addSongTransaction}
            />
            <input
                type="button"
                id='undo-button'
                disabled={editStatus}
                value="⟲"
                className={undoButtonClass}
                onClick={handleUndo}
            />
            <input
                type="button"
                id='redo-button'
                disabled={editStatus}
                value="⟳"
                className={redoButtonClass}
                onClick={handleRedo}
            />
            <input
                type="button"
                id='close-button'
                disabled={editStatus}
                value="&#x2715;"
                className={closeButtonClass}
                onClick={handleClose}
            />
        </span>);
}

export default EditToolbar;