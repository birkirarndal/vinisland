import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const SortDropdown = ({ setCurrentSort, CurrentSort }) => {
    return (
        <Select
            sx={{ backgroundColor: "white" }}
            name="sort"
            id="sort"
            onChange={(e) => setCurrentSort(e.target.value)}
            value={CurrentSort}
            defaultValue="RatingDESC"
        >
            <MenuItem value="ProductNameASC">Name A-z</MenuItem>
            <MenuItem value="ProductNameDESC">Name Z-a</MenuItem>
            <MenuItem value="ProductPriceASC">Price low-high</MenuItem>
            <MenuItem value="ProductPriceDESC">Price high-low</MenuItem>
            <MenuItem value="RatingASC">Rating low-high</MenuItem>
            <MenuItem value="RatingDESC">Rating high-low</MenuItem>
            <MenuItem value="ProductAlchoholVolumeASC">
                Alcohol low-high
            </MenuItem>
            <MenuItem value="ProductAlchoholVolumeDESC">
                Alcohol high-low
            </MenuItem>
        </Select>
    );
};
