import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);

    const { song, index } = props;
    let cardClass = "list-card unselected-list-card";
    //const [start, setStart] = useState(index);
    
    function handleDragStart(event) {
        //event.stopPropagation();
        event.dataTransfer.setData("song", event.target.id);
    }
    function handleDragOver(event) {
        event.preventDefault();
        //event.stopPropagation();
    }
    function handleDragEnter(event) {
        event.preventDefault();
        //event.stopPropagation();
    }
    function handleDragLeave(event) {
        event.preventDefault();
        //event.stopPropagation();
    }
    function handleDrop(event) {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        targetId = targetId.substring(0, targetId.indexOf("-"));
        targetId = parseInt(targetId);

        let sourceId = event.dataTransfer.getData("song");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        sourceId = sourceId.substring(0, sourceId.indexOf("-"));
        sourceId = parseInt(sourceId);

        if(targetId !== "") {
            // ASK THE MODEL TO MOVE THE DATA
            store.moveSongTransaction(sourceId, targetId);
        }
    }
    function handleSongEdit(event) {
        event.stopPropagation();
        store.markSongForEdit(props);
    }
    function handleDeleteSong(event) {
        event.stopPropagation();
        store.markSongForDeletion(props);
    }

    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDoubleClick={handleSongEdit}
            onDrop={handleDrop}
            draggable="true"
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"\u2715"}
                onClick={handleDeleteSong}
            />
        </div>
    );
}

export default SongCard;