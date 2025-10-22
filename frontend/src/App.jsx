import './App.css'
import MovieCard from './component/movie';

function App() {
  return (
    <>
      <MovieCard movie={{ title: "Inception", releaseDate: "2010", url: "https://example.com/inception.jpg" }} />
    </>
  );
}

export default App
