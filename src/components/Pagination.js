import React from "react";

const Pagination = ({ setNumOfPage, numOfPage }) => {
  const handlePageChange = (i) => {
    setNumOfPage(i);
  };
  const handleChange = (i) => {
    if (numOfPage === 1 && i === -1) {
      console.log("wrong");
    } else setNumOfPage(numOfPage + i);
  };

  return (
    <div>
      <button onClick={() => handleChange(-1)}> Prev </button>
      <button onClick={() => handlePageChange(1)}>1</button>
      <button onClick={() => handlePageChange(2)}>2</button>
      <button onClick={() => handlePageChange(3)}>3</button>
      <button onClick={() => handlePageChange(4)}>4</button>
      <button onClick={() => handleChange(1)}> Next </button>
    </div>
  );
};

export default Pagination;
