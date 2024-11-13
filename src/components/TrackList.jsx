const TrackList = ({ trackList, onEdit, onDelete, onPlay, handleFormView, isFormOpen }) => {
  return (
    <div>
      <button onClick={handleFormView}>
        {isFormOpen ? 'Close Form' : 'Add New Track'}
      </button>
      <h1>Track List</h1>
      {
        !trackList.length ? 
          <h2>No tracks Yet!</h2>  
        :
          trackList.map(track => (
            <div key={track._id}>
              <h2>{track.title} by {track.artist}</h2>
              <button onClick={() => onEdit(track)}>Edit</button>
              <button onClick={() => onDelete(track._id)}>Delete</button>
              <button onClick={() => onPlay(track)}>Play</button>
            </div>
          ))
      }
    </div>
  );
};

export default TrackList;