import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import "mdbreact/dist/css/mdb.css";
import Pagination from "../components/Pagination";
import EndPointBar from "../components/EndPointBar";
import InputRangeCom from "../components/InputRangeCom";
import GenresList from "../components/GenresList";
import SearchForm from "../components/SearchForm";
import { MDBView, MDBMask, MDBContainer } from "mdbreact";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;
const PIC_URL = process.env.REACT_APP_PIC_URL;

const MovieListPage = ({ type }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingGen, setIsLoadingGen] = useState(true);
  const [results, setResults] = useState([]);
  const [editedResults, setEditedResults] = useState([]);
  const [numOfPage, setNumOfPage] = useState(1);
  const [genreList, setGenreList] = useState([]);
  /* const [endPoint, setEndPoint] = useState("now_playing"); */
  const [value, setValue] = useState({ value: { min: 0, max: 10 } });
  /* const [searchTerm, setSearchTerm] = useState(term); */
  useEffect(() => {
    async function fetchData() {
      const url =
        "https://api.themoviedb.org/3/genre/movie/list?api_key=0de53f8f60b3e745a57eca7021b9085b&language=en-US";
      let response = await fetch(url);
      let data = await response.json();
      setGenreList(data.genres);
    }
    fetchData();
    setIsLoading(false);
    setIsLoadingGen(false);
  }, []);
  useEffect(() => {
    async function fetchData() {
      let endPoint = "now_playing";
      console.log(endPoint);
      console.log(type);
      if (type === "popular") {
        endPoint = "popular";
      } else if (type === "top_rated") {
        endPoint = "top_rated";
      }
      console.log(endPoint);
      const url = `${API_URL}/movie/${endPoint}?api_key=${API_KEY}&page=${numOfPage}`;
      console.log(url);
      let response = await fetch(url);
      let data = await response.json();
      console.log(data.results);
      setResults(data.results);
      setEditedResults(data.results);
      /*       setResults(results.concat(data.results)); */
      /* setRatedResults(
        data.results.sort(function (a, b) {
          return b.vote_average - a.vote_average;})); */
      /* setSearchTerm(term); */

      setIsLoading(false);
    }
    fetchData();
  }, [numOfPage, results.length]);
  /* useEffect(() => {
    let newResult = results
      .sort(function (a, b) {
        return b.vote_average - a.vote_average;
      })
      .filter(
        (i) =>
          i.vote_average >= value.value.min && i.vote_average <= value.value.max
      );
    setEditedResults(newResult);
    setIsLoading(false);
  }, [value]); */
  /*   const handleLoadMore = () => {
    setNumOfPage(numOfPage + 1);
  };*/
  const [searchTerm, setSearchTerm] = useState("");
  const handleSubmit = (term) => {
    setSearchTerm(term);
  };
  useEffect(() => {
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
      setEditedResults(newResultRange);
    }
  }, [searchTerm, value]);

  return (
    <div id="body-container">
      {/* <EndPointBar endPoint={endPoint} setEndPoint={setEndPoint} /> */}
      {/* <SearchForm handleSubmit={handleSubmit} /> */}

      <div id="genre-searchForm">
        <div className="col-1"></div>
        <div className="col-8">
          <GenresList
            genreList={genreList}
            setGenreList={setGenreList}
            isLoadingGen={isLoadingGen}
          />
          <InputRangeCom value={value} setValue={setValue} />
        </div>
        <form
          className="inline searchInPage col-3"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(searchTerm);
          }}
        >
          <input
            className=" mr-sm-2 form-control inputNav"
            type="text"
            placeholder="Search on this page"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </form>
      </div>
      <div className="list-card">
        <div className="col-1"></div>
        <div className="col-9">
          <div className="row" style={{ textAlign: "center" }}>
            {isLoading ? (
              <h1>Is Loading</h1>
            ) : (
              editedResults.map((m) => {
                return (
                  <>
                    <Card
                      style={{ width: "18rem" }}
                      key={m.id}
                      className="movie-card"
                    >
                      <MDBContainer style={{ padding: "0" }}>
                        <MDBView hover zoom>
                          <Card.Img
                            variant="top"
                            src={`${PIC_URL}/${m.poster_path}`}
                            class="img-fluid"
                            alt={m.title}
                          />
                          <MDBMask
                            className="d-flex container-fluid"
                            overlay="black-strong"
                          >
                            <Card.Body className="scroll">
                              {m.genre_ids.map((gId) => {
                                return isLoadingGen ? (
                                  <h1>is loading</h1>
                                ) : (
                                  genreList.map((g) => {
                                    if (g.id === gId) {
                                      return (
                                        <button
                                          key={g.id}
                                          className="genres white-text"
                                        >
                                          {" "}
                                          {g.name}
                                        </button>
                                      );
                                    } else return null;
                                  })
                                );
                              })}
                              <Card.Text className="white-text">
                                {m.release_date}
                              </Card.Text>
                              <Card.Title className="white-text">
                                <h2 style={{ textAlign: "center" }}>
                                  {m.title}
                                </h2>
                              </Card.Title>
                              <Card.Text
                                className="white-text scroll"
                                style={{ textAlign: "center" }}
                              >
                                <h6>{m.overview}</h6>
                              </Card.Text>
                            </Card.Body>
                          </MDBMask>
                        </MDBView>

                        <Card.Footer>
                          <Card.Text className="black-text">
                            {m.vote_average}
                          </Card.Text>
                          <Button variant="primary">Trailer</Button>
                        </Card.Footer>
                      </MDBContainer>
                    </Card>
                  </>
                );
              })
            )}
          </div>
        </div>
        <div className="col-1"></div>
      </div>

      {/* <button onClick={handleLoadMore}>Load More</button> */}

      <Pagination setNumOfPage={setNumOfPage} numOfPage={numOfPage} />
    </div>
  );
};

export default MovieListPage;
