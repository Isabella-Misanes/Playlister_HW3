import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function EditSongModal() {
    const { store } = useContext(GlobalStoreContext);
    if(store.songToEdit) {
        let editSongTitle = document.getElementById("song-title");
        editSongTitle.value = store.songToEdit.song.title;
        let editSongArtist = document.getElementById("song-artist");
        editSongArtist.value = store.songToEdit.song.artist;
        let editSongId = document.getElementById("song-youTubeId");
        editSongId.value = store.songToEdit.song.youTubeId;
    }
    return (
        <div 
            className="modal" 
            id="edit-song-modal" 
            data-animation="slideInOutLeft"
            onKeyDown={store.undoRedoHandling}
            tabIndex="1">
                <div className="modal-root" id='verify-edit-song-root'>
                    <div className="modal-north">
                        Edit Song
                    </div>
                    <div className="modal-center">
                        <div className="modal-center-content">
                            Title: <input type="text" id="song-title" name="song-title"/><br></br>
                            Artist: <input type="text" id="song-artist" name="song-artist"/><br></br>
                            YouTube Id: <input type="text" id="song-youTubeId" name="song-youTubeId"/>
                        </div>
                    </div>
                    <div className="modal-south">
                        <input type="button" 
                            id="edit-song-confirm-button" 
                            className="modal-button" 
                            onClick={store.editSongTransaction}
                            value='Confirm' />
                        <input type="button" 
                            id="edit-song-cancel-button" 
                            className="modal-button" 
                            onClick={store.hideEditSongModal}
                            value='Cancel' />
                    </div>
                </div>
        </div>
    );
}
export default EditSongModal;