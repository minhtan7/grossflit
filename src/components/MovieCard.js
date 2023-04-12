import React from "react";
import { Card, Button } from "react-bootstrap";
import { MDBView, MDBMask, MDBContainer } from "mdbreact";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
const PIC_URL = process.env.REACT_APP_PIC_URL;

const MovieCard = ({ movie, handleShow }) => {
  return (
    <>
      <div className="movie-card m-3  d-flex justify-content-start m-3">
        <img src={`${PIC_URL}/${movie.poster_path}`} alt={movie.title} />
        <div className="overlay-card">
          <div className="sub-overlay">
            <div>{movie.release_date}</div>
            <div>
              <h2 style={{ textAlign: "center" }}>{movie.title}</h2>
            </div>
            <div className="movie-card-star">
              <ReactStars
                count={5}
                /* onChange={movie.vote_average} */
                value={movie.vote_average / 2}
                size={15}
                isHalf={true}
                edit={false}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
              />
              <span>({movie.vote_average})</span>
            </div>

            <button
              className="btn-trailer"
              onClick={() => {
                handleShow(movie);
              }}
            >
              {" "}
              More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
