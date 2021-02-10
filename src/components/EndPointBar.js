import React from "react";

const EndPointBar = ({ endPoint, setEndPoint }) => {
  const handleClick = (e) => {
    setEndPoint(e.target.value);
    console.log(e.target.value);
  };
  return (
    <div>
      <button
        type="button"
        class="btn btn-outline-primary"
        onClick={handleClick}
        value="popular"
      >
        Popular
      </button>
      <button
        type="button"
        class="btn btn-outline-primary"
        onClick={handleClick}
        value="top_rated"
      >
        Top rated
      </button>
      <button
        type="button"
        class="btn btn-outline-primary"
        onClick={handleClick}
        value="upcoming"
      >
        Upcoming
      </button>
      <button
        type="button"
        class="btn btn-outline-primary"
        onClick={handleClick}
        value="latest"
      >
        Latest
      </button>
    </div>
  );
};

export default EndPointBar;
