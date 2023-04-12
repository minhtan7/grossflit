import React, { useEffect, useState } from "react";
import RingLoader from "react-spinners/RingLoader";

const GenresList = ({
  genreList,
  setGenreList,
  isLoadingGenre,
  handleGenres,
}) => {
  return (
    <div id="genres">
      {isLoadingGenre ? (
        <div>
          <RingLoader />
        </div>
      ) : (
        genreList.map((g) => {
          return (
            <button
              key={g.id}
              className="genres"
              onClick={() => handleGenres(g.id)}
            >
              {g.name}
            </button>
          );
        })
      )}
    </div>
  );
};

export default GenresList;
