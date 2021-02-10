import React, { useEffect, useState } from "react";

const GenresList = ({ genreList, setGenreList, isLoadingGenre }) => {
  /* const [genreList, setGenreList] = useState([]); */
  /* const [isLoading, setIsLoading] = useState(true); */
  /* useEffect(() => {
    async function fetchData() {
      const url =
        "https://api.themoviedb.org/3/genre/movie/list?api_key=0de53f8f60b3e745a57eca7021b9085b&language=en-US";
      let response = await fetch(url);
      let data = await response.json();
      setGenreList(data.genres);
    }
    fetchData();
    setIsLoading(false);
  }, []); */
  return (
    <div id="genres">
      {isLoadingGenre ? (
        <h1>is loading</h1>
      ) : (
        genreList.map((g) => {
          return (
            <button key={g.id} className="genres">
              {g.name}
            </button>
          );
        })
      )}
    </div>
  );
};

export default GenresList;
