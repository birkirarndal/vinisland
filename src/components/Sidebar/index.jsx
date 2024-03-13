import React from "react";
import { useState } from "react";
import "./styles.css";
import { WINE_TYPES, FOOD_PAIRINGS, COUNTRIES, REGIONS } from "../../constants";

export const Sidebar = ({ updateSearch, search, handleFilterChange }) => {
    return (
        <div className="sidebar">
            <h2>search</h2>
            <form>
                <div className="filter">
                    <div className="search-bar-container">
                        <input
                            type="text"
                            placeholder="search..."
                            id="search"
                            className="search-bar"
                            onChange={(e) => {
                                updateSearch(e.target.value);
                            }}
                            value={search}
                        />
                    </div>

                    <h3>Wine type</h3>
                    <div className="checkboxes">
                        {WINE_TYPES.map((type) => (
                            <label key={type}>
                                <input
                                    type="checkbox"
                                    name="type"
                                    id={type}
                                    onChange={handleFilterChange}
                                />
                                {type}
                            </label>
                        ))}
                    </div>

                    <div>
                        <h3>Price range</h3>
                        <input
                            type="number"
                            placeholder="min"
                            name="priceMin"
                            onChange={handleFilterChange}
                        />
                        <input
                            type="number"
                            placeholder="max"
                            name="priceMax"
                            onChange={handleFilterChange}
                        />
                    </div>

                    <div>
                        <h3>Rating range</h3>
                        <input
                            type="float"
                            placeholder="min"
                            name="ratingMin"
                            onChange={handleFilterChange}
                        />
                        <input
                            type="float"
                            placeholder="max"
                            name="ratingMax"
                            onChange={handleFilterChange}
                        />
                    </div>
                    <h3>Country</h3>
                    <div className="checkboxes">
                        {COUNTRIES.map((country) => (
                            <label key={country}>
                                <input
                                    type="checkbox"
                                    name="country"
                                    id={country}
                                    onChange={handleFilterChange}
                                />
                                {country}
                            </label>
                        ))}
                    </div>

                    {/* <div>
                        <h3>Region</h3>
                        {REGIONS.map((region) => (
                            <label key={region}>
                                <input
                                    type="checkbox"
                                    name="region"
                                    id={region}
                                    onChange={handleFilterChange}
                                />
                                {region}
                            </label>
                        ))}
                    </div> */}

                    {/* <div>
                        <h3>Food pairing</h3>
                        {FOOD_PAIRINGS.map((pairing) => (
                            <label key={pairing}>
                                <input type="checkbox" />
                                {pairing}
                            </label>
                        ))}
                    </div> */}
                </div>
            </form>
        </div>
    );
};
