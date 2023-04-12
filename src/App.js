import "./App.css";
import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import PublicNavbar from "./components/PublicNavbar";
import "bootstrap/dist/css/bootstrap.min.css";

import MovieListPage from "./pages/MovieListPage";

import NotFoundPage from "./pages/NotFoundPage";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faCat, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
library.add(faUser, faCat, faSignOutAlt);

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;

function App() {
  /* useEffect(() => {
    async function fetchData() {
      const url = `${API_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
      let response = await fetch(url);
      let data = await response.json();
      console.log(data.results);
    }
    fetchData();
  }, []); */

  return (
    <div className="App">
      <PublicNavbar />
      <Switch>
        {/* <Route
          path="/movies/popular"
          render={(props) => <MovieListPage {...props} endPoint="popular" />}
        />
        <Route
          path="/movies/top_rated"
          render={(props) => <MovieListPage {...props} endPoint="top_rated" />}
        />*/}

        <Route path="/" component={MovieListPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
