import React from "react";
import Slider from "@mui/material/Slider";

import "./styles.css";
import {
    PRODUCT_TYPES,
    FOOD_PAIRINGS,
    COUNTRIES,
    REGIONS,
} from "../../constants";

import { CustomCheckbox } from "../CustomCheckbox";

export const Sidebar = ({
    updateSearch,
    search,
    handleFilterChange,
    handleCustomCheckboxChange,
    handleSliderChange,
    ratingSliderValue,
}) => {
    return (
        <div className="sidebar">
            <h2>Search</h2>
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

                    <h3>Product type</h3>
                    <div className="checkboxes">
                        {PRODUCT_TYPES.map((type) => (
                            // <label key={type}>
                            //     <input
                            //         type="checkbox"
                            //         name="type"
                            //         id={type}
                            //         onChange={handleFilterChange}
                            //     />
                            //     {type}
                            // </label>
                            <CustomCheckbox
                                key={type}
                                label={type}
                                name="type"
                                handleFilterChange={handleCustomCheckboxChange}
                            />
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
                        {/* <input
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
                        /> */}
                        <Slider
                            sx={{ width: "90%" }}
                            getAriaLabel={() => "Rating range"}
                            value={[ratingSliderValue[0], ratingSliderValue[1]]}
                            onChange={handleSliderChange}
                            min={0}
                            max={5}
                            step={0.1}
                            valueLabelDisplay="auto"
                            getAriaValueText={() => "Rating range"}
                        />
                    </div>
                    <h3>Country</h3>
                    <div className="checkboxes">
                        {COUNTRIES.map((country) => (
                            <CustomCheckbox
                                key={country}
                                label={country}
                                name="country"
                                handleFilterChange={handleCustomCheckboxChange}
                            />
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
