import React, { useState } from "react";

const SearchBar = ({ searchForVideo }) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    searchForVideo(search);
  };

  return (
    <nav
      className="navbar navbar-light bg-light bg-gradient px-0"
      style={{ "--bs-bg-opacity": ".5" }}
    >
      <div className="container-fluid">
        <form className="d-flex" onSubmit={handleSubmit}>
          <input
            className="form-control me-2"
            type="search"
            value={search}
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default SearchBar;
