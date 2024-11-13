import React, { useState, useEffect } from 'react';
import TrackList from './components/TrackList';
import TrackForm from './components/TrackForm';
import NowPlaying from './components/NowPlaying';
import * as trackService from './services/trackService';

const App = () => {
  const [trackList, setTrackList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const tracks = await trackService.index();
        if (tracks.error) {
          throw new Error(tracks.error);
        }
        setTrackList(tracks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTracks();
  }, []);

  const nowPlaying = (track) => {
    setSelected(track);
  };

  const handleFormView = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleAddTrack = async (formData) => {
    try {
      const newTrack = await trackService.create(formData);
      if (newTrack.error) {
        throw new Error(newTrack.error);
      }
      setTrackList([newTrack, ...trackList]);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTrack = async (formData, trackId) => {
    try {
      const updatedTrack = await trackService.updateTrack(formData, trackId);
      if (updatedTrack.error) {
        throw new Error(updatedTrack.error);
      }
      const updatedTrackList = trackList.map((track) =>
        track._id !== updatedTrack._id ? track : updatedTrack
      );
      setTrackList(updatedTrackList);
      setSelected(updatedTrack);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveTrack = async (trackId) => {
    try {
      const deletedTrack = await trackService.deleteTrack(trackId);
      if (deletedTrack.error) {
        throw new Error(deletedTrack.error);
      }
      setTrackList(trackList.filter((track) => track._id !== trackId));
      setSelected(null);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditTrack = (track) => {
    setSelected(track);
    setIsFormOpen(true);
  };

  return (
    <>
      <TrackList 
        trackList={trackList} 
        onEdit={handleEditTrack} 
        onDelete={handleRemoveTrack} 
        onPlay={nowPlaying} 
        handleFormView={handleFormView}  
        isFormOpen={isFormOpen} 
      />
      {isFormOpen ? (
        <TrackForm 
          handleAddTrack={handleAddTrack}
          selected={selected}
          handleUpdateTrack={handleUpdateTrack}
        />
      ) : (
        <NowPlaying
          selected={selected} 
          handleRemoveTrack={handleRemoveTrack}
        />
      )}
    </>
  );
};

export default App;