// /src/components/NowPlaying.jsx
const NowPlaying = (props) => {

  if (!props.selected)
    return (
        <h2>NO Track is playing</h2>
      );

  return (
    <div>
      <h2>Now Playing:</h2>
      <p><strong>Title:</strong> {props.selected.title}</p>
      <p><strong>Artist:</strong> {props.selected.artist}</p>
    </div>
  );
};

export default NowPlaying;