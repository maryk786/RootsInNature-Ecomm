import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";
import { base_url } from "../utils/axiosConfig";

const SearchResults = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `${base_url}product/search?query=${query}`
        );
        setResults(response.data);
        console.log(setResults(response.data));
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  return (
    <div className="container">
      <div className="row justify-center">
        <div className="col-10">
          <h1 className="text-center text-2xl font-semibold my-5">Search Results for "{query}"</h1>
          <div className="grid grid-cols-4 gap-4">
            {results.map((product) => (
              <ProductCard key={product._id} data={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
