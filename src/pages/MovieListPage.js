import React, { useEffect, useState } from "react";
import { Card, Button, Modal, Row, Col, Container } from "react-bootstrap";
import "mdbreact/dist/css/mdb.css";
/* import Pagination from "../components/Pagination"; */
import EndPointBar from "../components/EndPointBar";
import InputRangeCom from "../components/InputRangeCom";
import GenresList from "../components/GenresList";
import SearchForm from "../components/SearchForm";
import { MDBView, MDBMask, MDBContainer } from "mdbreact";
import ReactPlayer from "react-player";
import RingLoader from "react-spinners/RingLoader";
import MovieCard from "../components/MovieCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { ReactVideo, YoutubePlayer } from "reactjs-media";
import ReactStars from "react-rating-stars-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;
const PIC_URL = process.env.REACT_APP_PIC_URL;

const MovieListPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingGen, setIsLoadingGen] = useState(true);
  const [loadingTrailer, setLoadingTrailer] = useState(false);
  const [results, setResults] = useState({});
  const [editedResults, setEditedResults] = useState({});
  const [oldResults, setOldResults] = useState([]);
  const [pageNumNowPlaying, setPageNumNowPlaying] = useState(1);
  const [pageNumTopRated, setPageNumTopRated] = useState(1);
  const [chosenMovie, setChosenMovie] = useState({});
  const [genreList, setGenreList] = useState([]);
  const [show, setShow] = useState(false);
  const [showGenres, setShowGenres] = useState(false);
  const [trailer, setTrailer] = useState("");
  const [genreId, setGenreId] = useState("");
  const [topRatedMovie, setTopRatedMovie] = useState([]);

  /* const [endPoint, setEndPoint] = useState("now_playing"); */
  const [value, setValue] = useState({ value: { min: 0, max: 10 } });
  /* const [searchTerm, setSearchTerm] = useState(term); */
  useEffect(() => {
    async function fetchGenres() {
      const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
      let response = await fetch(url);
      let data = await response.json();
      setGenreList(data.genres);
    }
    fetchGenres();
    setIsLoading(false);

    async function fetchData() {
      let genreQuery = "";
      /* if (!endPoint) {
        endPoint = "now_playing";
      } else if (endPoint === "popular") {
        endPoint = "popular";
      } else if (endPoint === "top_rated") {
        endPoint = "top_rated";
      } */
      if (genreId) {
        genreQuery = `&with_genres=${genreId}`;
      }
      const urlNowPlaying = `${API_URL}/movie/now_playing?api_key=${API_KEY}&page=${pageNumNowPlaying}${genreQuery}`;
      const urlTopRated = `${API_URL}/movie/top_rated?api_key=${API_KEY}&page=${pageNumTopRated}${genreQuery}`;

      let resNowPlaying = await fetch(urlNowPlaying);
      let resTopRated = await fetch(urlTopRated);
      let dataNowPlaying = await resNowPlaying.json();
      let dataTopRated = await resTopRated.json();
      console.log("data", dataNowPlaying);
      setResults(dataNowPlaying);
      setTopRatedMovie(dataTopRated);
      setEditedResults(dataNowPlaying);

      /*       setResults(results.concat(data.results)); */
      /* setRatedResults(
          data.results.sort(function (a, b) {
            return b.vote_average - a.vote_average;})); */
      /* setSearchTerm(term); */

      setIsLoading(false);
    }
    fetchData();
  }, [pageNumNowPlaying, pageNumTopRated, genreId]);
  console.log("editedResults", editedResults);

  /* useEffect(() => {
    if (results) {
      let newResult = results
        .sort(function (a, b) {
          return b.vote_average - a.vote_average;
        })
        .filter(
          (i) =>
            i.vote_average >= value.value.min &&
            i.vote_average <= value.value.max
        );
      setResults(newResult);
    }
  }, [value.value]); */

  const [searchTerm, setSearchTerm] = useState("");
  /* const handleSubmit = (term) => {
    setSearchTerm(term);
  }; */
  console.log(searchTerm);
  /* useEffect(() => {
    if (searchTerm !== undefined) {
      console.log(results);
      let newResult = results.filter((m) =>
        m.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log(newResult);
      setEditedResults(newResult);
      let newResultRange = results
        .sort(function (a, b) {
          return b.vote_average - a.vote_average;
        })
        .filter(
          (i) =>
            i.vote_average >= value.value.min &&
            i.vote_average <= value.value.max
        );
      setEditedResults(newResult);
    }
  }, [searchTerm]); */

  const handleClose = () => {
    setShow(false);
    setShowGenres(false);
    setTrailer("");
  };
  const handleShow = async (movie) => {
    setLoadingTrailer(true);
    setShow(true);
    let url = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`;
    let response = await fetch(url);
    let data = await response.json();
    console.log("hehe data video:", data);

    if (data.results.length > 0) {
      setTrailer(`https://www.youtube.com/watch?v=${data.results[0].key}`);
    } else setTrailer(`https://www.youtube.com/watch?v=uKLSQPhERnU`);
    setLoadingTrailer(false);
    setChosenMovie(movie);
    /* const iframe = document.getElementsByTagName("iframe"); */
    /* const arr = Array.from(iframe); */
    /* console.log("iframe", iframe); */
    /* if (iframe) console.log("iframe", iframe.HTMLCollection); */
    /* const elmnt = iframe.contentWindow.document.getElementById("movieplayer");
    elmnt.style.borderRadius = "25px"; */
  };
  console.log("choseMOvie", chosenMovie);

  const handleGenres = (genreId) => {
    setGenreId(genreId);
    setShowGenres(false);
    if (pageNumNowPlaying > 1) setPageNumNowPlaying(1);
    if (pageNumTopRated > 1) setPageNumTopRated(1);
  };

  const ModalGenres = (
    <Modal
      size="xl"
      show={showGenres}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="modal-fullscreen"
      bsPrefix="modal-xyz"
    >
      <div className="modal-theater">
        <img
          src="https://res.cloudinary.com/tanvo/image/upload/v1618569524/moviedb/theater_qfuakt.jpg"
          alt=""
        />
        <div onClick={handleClose} className="modal-close-btn">
          {" "}
          <FontAwesomeIcon
            icon={["fas", "sign-out-alt"]}
            className="mr-2"
            size="lg"
          />
        </div>
        <div className="genres-list wrap-content" style={{ zIndex: "10" }}>
          <GenresList
            genreList={genreList}
            setGenreList={setGenreList}
            isLoadingGen={isLoadingGen}
            handleGenres={handleGenres}
          />
        </div>
      </div>
    </Modal>
  );

  return (
    <div id="body-container">
      {/* <EndPointBar endPoint={endPoint} setEndPoint={setEndPoint} /> */}
      <section id="starting-section"></section>
      <div>
        <div className="genre-button" onClick={() => setShowGenres(true)}>
          <FontAwesomeIcon icon={["fas", "cat"]} className="mr-2" size="lg" />
        </div>
        <section id="now-playing">
          <div className="container ">
            <div className="wrap-content">
              { }
              <div>
                <h3>Now Playing</h3>
              </div>
              <div className="list-card">
                <Pagination
                  activePage={pageNumNowPlaying}
                  itemsCountPerPage={20}
                  totalItemsCount={editedResults && editedResults.total_results}
                  pageRangeDisplayed={3}
                  onChange={(e) => setPageNumNowPlaying(e)}
                  /* lastPageText="..." */
                  firstPageText="..."
                />
                {isLoading ? (
                  <RingLoader />
                ) : (
                  <div className="row scroller">
                    {editedResults?.results?.map((movie) => (
                      <MovieCard movie={movie} handleShow={handleShow} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <section id="top-rated">
          <div className="container ">
            <div className="wrap-content">
              <div>
                <h3>Top rated</h3>
              </div>
              <div className="list-card">
                <Pagination
                  activePage={pageNumTopRated}
                  itemsCountPerPage={20}
                  totalItemsCount={topRatedMovie?.total_results}
                  pageRangeDisplayed={3}
                  onChange={(e) => setPageNumTopRated(e)}
                  lastPageText=""
                  firstPageText="..."
                />
                {isLoading ? (
                  <RingLoader />
                ) : (
                  <div className="row scroller">
                    {topRatedMovie?.results?.map((movie) => (
                      <MovieCard movie={movie} handleShow={handleShow} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Modal
        size="xl"
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        bsPrefix="modal"
      >
        {!chosenMovie && chosenMovie === undefined ? (
          <div className="ring-loader">
            <RingLoader color="#fff" />
          </div>
        ) : (
          <div className="my-modal">
            <div className="player-wrapper">
              <ReactPlayer
                url={trailer}
                centered
                className="react-player"
                width="72%"
                height="84%"
              />
            </div>
            <Container>
              <Row>
                <Col className="col modal-left">
                  <img
                    src={`${PIC_URL}/${chosenMovie.poster_path}`}
                    alt={chosenMovie.title}
                    style={{ width: "30rem" }}
                  />
                </Col>
                <Col className="col modal-right">
                  <div>
                    <h1>{chosenMovie.title}</h1>
                  </div>
                  <div>
                    {chosenMovie?.genre_ids?.map((g) => (
                      <div className="modal-genre">{g}</div>
                    ))}
                  </div>

                  <div>{chosenMovie.overview}</div>
                  <div className="movie-card-star">
                    <ReactStars
                      count={5}
                      /* onChange={movie.vote_average} */
                      value={chosenMovie?.vote_average / 2}
                      size={15}
                      isHalf={true}
                      edit={false}
                      emptyIcon={<i className="far fa-star"></i>}
                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                      activeColor="#ffd700"
                    />
                    <span>({chosenMovie.vote_average})</span>
                  </div>
                  <div>
                    Released:{" "}
                    <span style={{ fontStyle: "italic", fontSize: "0.8rem" }}>
                      {chosenMovie.release_date}
                    </span>
                  </div>
                </Col>
              </Row>
              <Row className="row modal-foo">
                <div className="modal-table">
                  <div className="d-flex justify-content-center align-items-start">
                    <img src="https://unsplash.it/300/300" alt="" />
                  </div>
                  <div className="review-modal">
                    <div className="d-flex align-items-end review-title">
                      <div style={{ fontSize: "2rem", lineHeight: "1" }}>
                        author
                      </div>
                      <span style={{ lineHeight: "1" }}>
                        created at 2 weeks ago
                      </span>
                    </div>
                    <div
                      className="movie-card-star"
                      style={{ justifyContent: "flex-start" }}
                    >
                      <ReactStars
                        count={5}
                        /* onChange={movie.vote_average} */
                        value={5}
                        size={15}
                        isHalf={true}
                        edit={false}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                      />
                      <span>({chosenMovie.vote_average})</span>
                    </div>

                    <div>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      In numquam, fuga expedita dolores, rem amet porro vero
                      dolore corporis dolorem, architecto dicta. Omnis dolorum
                      obcaecati necessitatibus id cupiditate quas voluptas
                      beatae eveniet similique. Dicta quia, cupiditate voluptas
                      quasi numquam quisquam vel harum ullam et tempora quod
                      magnam dolores. Obcaecati, ab. Lorem ipsum dolor sit amet
                      consectetur adipisicing elit. In numquam, fuga expedita
                      dolores, rem amet porro vero dolore corporis dolorem,
                      architecto dicta. Omnis dolorum obcaecati necessitatibus
                      id cupiditate quas voluptas beatae eveniet similique.
                      Dicta quia, cupiditate voluptas quasi numquam quisquam vel
                      harum ullam et tempora quod magnam dolores. Obcaecati, ab.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      In numquam, fuga expedita dolores, rem amet porro vero
                      dolore corporis dolorem, architecto dicta. Omnis dolorum
                      obcaecati necessitatibus id cupiditate quas voluptas
                      beatae eveniet similique. Dicta quia, cupiditate voluptas
                      quasi numquam quisquam vel harum ullam et tempora quod
                      magnam dolores. Obcaecati, ab.
                    </div>
                  </div>
                </div>
                <div className="modal-table">
                  <div className="d-flex justify-content-center align-items-center">
                    <img src="https://unsplash.it/300/300" alt="" />
                  </div>
                  <div className="review-modal">
                    <div className="d-flex align-items-end review-title">
                      <div style={{ fontSize: "2rem", lineHeight: "1" }}>
                        author
                      </div>
                      <span style={{ lineHeight: "1" }}>
                        created at 2 weeks ago
                      </span>
                    </div>
                    <div
                      className="movie-card-star"
                      style={{ justifyContent: "flex-start" }}
                    >
                      <ReactStars
                        count={5}
                        /* onChange={movie.vote_average} */
                        value={5}
                        size={15}
                        isHalf={true}
                        edit={false}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                      />
                      <span>({chosenMovie.vote_average})</span>
                    </div>

                    <div>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      In numquam, fuga expedita dolores, rem amet porro vero
                      dolore corporis dolorem, architecto dicta. Omnis dolorum
                      obcaecati necessitatibus id cupiditate quas voluptas
                      beatae eveniet similique. Dicta quia, cupiditate voluptas
                      quasi numquam quisquam vel harum ullam et tempora quod
                      magnam dolores. Obcaecati, ab.
                    </div>
                  </div>
                </div>
                <div className="modal-table">
                  <div className="d-flex justify-content-center align-items-center">
                    <img src="https://unsplash.it/300/300" alt="" />
                  </div>
                  <div className="review-modal">
                    <div className="d-flex align-items-end review-title">
                      <div style={{ fontSize: "2rem", lineHeight: "1" }}>
                        author
                      </div>
                      <span style={{ lineHeight: "1" }}>
                        created at 2 weeks ago
                      </span>
                    </div>
                    <div
                      className="movie-card-star"
                      style={{ justifyContent: "flex-start" }}
                    >
                      <ReactStars
                        count={5}
                        /* onChange={movie.vote_average} */
                        value={5}
                        size={15}
                        isHalf={true}
                        edit={false}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                      />
                      <span>({chosenMovie.vote_average})</span>
                    </div>

                    <div>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      In numquam, fuga expedita dolores, rem amet porro vero
                      dolore corporis dolorem, architecto dicta. Omnis dolorum
                      obcaecati necessitatibus id cupiditate quas voluptas
                      beatae eveniet similique. Dicta quia, cupiditate voluptas
                      quasi numquam quisquam vel harum ullam et tempora quod
                      magnam dolores. Obcaecati, ab.
                    </div>
                  </div>
                </div>
              </Row>
            </Container>
          </div>
        )}
      </Modal>
      {ModalGenres}
    </div>
  );
};

export default MovieListPage;

{
  /* <div className="d-flex justify-content-between">
            <div>
              <InputRangeCom value={value} setValue={setValue} />
            </div>

            <form
              className="inline searchInPage col-3"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                className=" mr-sm-2 form-control inputNav"
                type="text"
                placeholder="Search on this page"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div> */
}
