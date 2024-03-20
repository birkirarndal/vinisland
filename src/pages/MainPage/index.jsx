import { useEffect, useState, useCallback } from "react";
import "./styles.css";
import data from "../../resources/data.json";
import { Products } from "../../components/Product";
import { Sidebar } from "../../components/Sidebar";
import CircularProgress from "@mui/material/CircularProgress";
import { ITEMS_PER_PAGE } from "../../constants";
import { SortDropdown } from "../../components/SortDropdown";

const MainPage = () => {
    const allData = data;
    const [currentData, setCurrentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentItems, setCurrentItems] = useState([]);
    const [search, setSearch] = useState("");
    const [countries, setCountries] = useState([]);
    const [countriesExclude, setCountriesExclude] = useState([]);
    const [regions, setRegions] = useState([]);
    // const [foodPairings, setFoodPairings] = useState([]);
    const [wineTypes, setWineTypes] = useState([]);
    const [wineTypesExclude, setWineTypesExclude] = useState([]);
    // const [ratingMin, setRatingMin] = useState(0);
    // const [ratingMax, setRatingMax] = useState(5);
    const [priceMin, setPriceMin] = useState(-Infinity);
    const [priceMax, setPriceMax] = useState(Infinity);
    const [ratingSliderValue, setRatingSliderValue] = useState([0, 5]);
    const [hideUpArrow, setHideUpArrow] = useState(true);
    const [currentSort, setCurrentSort] = useState("RatingDESC");
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        setCurrentItems(currentData.slice(0, ITEMS_PER_PAGE));
    }, [currentData]);

    const sortData = (type, data) => {
        const sortedData = [...data].sort((a, b) => {
            let productA = a;
            let productB = b;
            if (type === "ProductNameASC" || type === "ProductNameDESC") {
                productA = productA.ProductName.toLowerCase();
                productB = productB.ProductName.toLowerCase();
            }
            if (type === "ProductPriceASC" || type === "ProductPriceDESC") {
                productA = parseFloat(productA.ProductPrice);
                productB = parseFloat(productB.ProductPrice);
            }
            if (type === "RatingASC" || type === "RatingDESC") {
                productA = parseFloat(productA.Rating);
                if (isNaN(productA)) {
                    productA = 0;
                }

                productB = parseFloat(productB.Rating);
                if (isNaN(productB)) {
                    productB = 0;
                }
            }
            if (
                type === "ProductAlchoholVolumeASC" ||
                type === "ProductAlchoholVolumeDESC"
            ) {
                productA = parseFloat(productA.ProductAlchoholVolume);
                productB = parseFloat(productB.ProductAlchoholVolume);
            }
            if (type === "ProductNameASC" || type === "ProductPriceASC") {
                return productA > productB ? 1 : -1;
            }
            if (type === "ProductNameDESC" || type === "ProductPriceDESC") {
                return productA < productB ? 1 : -1;
            }
            if (type === "RatingASC") {
                return productA > productB ? 1 : -1;
            }
            if (type === "RatingDESC") {
                return productA < productB ? 1 : -1;
            }
            if (type === "ProductAlchoholVolumeASC") {
                return productA > productB ? 1 : -1;
            }
            if (type === "ProductAlchoholVolumeDESC") {
                return productA < productB ? 1 : -1;
            }
            return 0;
        });
        return sortedData;
    };

    useEffect(() => {
        setCurrentData((currentData) => sortData(currentSort, currentData));
    }, [currentSort]);

    const loadMoreItems = useCallback(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight
        ) {
            setCurrentItems((prev) => {
                const newItems = currentData.slice(
                    prev.length,
                    prev.length + ITEMS_PER_PAGE
                );
                return [...prev, ...newItems];
            });
        }
    }, [currentData]);

    const updateSearch = (search) => {
        if (search === "") {
            setCurrentData(data);
            setSearch("");
        } else {
            setSearch(search);
            const lowerCaseSearch = search.toLowerCase();
            const filteredWines = allData.filter((wine) =>
                wine.ProductName.toLowerCase().includes(lowerCaseSearch)
            );
            setCurrentData(filteredWines);
        }
    };

    const handleCustomCheckboxChange = (name, label, status) => {
        let setFunc;
        let setFuncExclude;
        let currentArray;
        let currentExcludeArray;
        if (name === "type") {
            setFunc = setWineTypes;
            setFuncExclude = setWineTypesExclude;
            currentArray = wineTypes;
            currentExcludeArray = wineTypesExclude;
        }
        if (name === "country") {
            setFunc = setCountries;
            setFuncExclude = setCountriesExclude;
            currentArray = countries;
            currentExcludeArray = countriesExclude;
        }

        if (status === "include") {
            setFunc([...currentArray, label]);
            setFuncExclude(
                currentExcludeArray.filter((type) => type !== label)
            );
        }
        if (status === "exclude") {
            setFuncExclude([...currentExcludeArray, label]);
            setFunc(currentArray.filter((type) => type !== label));
        }
        if (status === "neutral") {
            setWineTypes(currentArray.filter((type) => type !== label));
            setFuncExclude(
                currentExcludeArray.filter((type) => type !== label)
            );
        }
    };

    const handleSliderChange = (e, newValue) => {
        setRatingSliderValue(newValue);
    };

    const handleFilterChange = (e) => {
        if (e.target.name === "type") {
            if (e.target.checked) {
                // console.log("checked", e.target.id);
                setWineTypes([...wineTypes, e.target.id]);
            } else {
                setWineTypes(wineTypes.filter((type) => type !== e.target.id));
            }
        }

        if (e.target.name === "priceMin") {
            setPriceMin(e.target.value);
        }
        if (e.target.name === "priceMax") {
            setPriceMax(e.target.value);
        }
    };

    useEffect(() => {
        let filteredData = allData;
        if (search) {
            filteredData = filteredData.filter((wine) =>
                wine.ProductName.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (wineTypes.length) {
            filteredData = filteredData.filter((wine) =>
                wineTypes.includes(wine.ProductCategory.name)
            );
        }
        if (wineTypesExclude.length) {
            filteredData = filteredData.filter(
                (wine) => !wineTypesExclude.includes(wine.ProductCategory.name)
            );
        }

        if (countries.length) {
            filteredData = filteredData.filter((wine) =>
                countries.includes(wine.ProductCountryOfOrigin)
            );
        }

        if (countriesExclude.length) {
            filteredData = filteredData.filter(
                (wine) =>
                    !countriesExclude.includes(wine.ProductCountryOfOrigin)
            );
        }

        if (regions.length) {
            filteredData = filteredData.filter((wine) =>
                regions.includes(wine.ProductPlaceOfOrigin)
            );
        }
        if (priceMin !== -Infinity) {
            if (priceMin === "") {
                setPriceMin(-Infinity);
            }
            filteredData = filteredData.filter(
                (wine) => wine.ProductPrice >= priceMin
            );
        }
        if (priceMax !== Infinity) {
            if (priceMax === "") {
                setPriceMax(Infinity);
            }
            filteredData = filteredData.filter(
                (wine) => wine.ProductPrice <= priceMax
            );
        }
        if (ratingSliderValue[0] !== 0 || ratingSliderValue[1] !== 5) {
            filteredData = filteredData.filter(
                (wine) =>
                    wine.Rating >= ratingSliderValue[0] &&
                    wine.Rating <= ratingSliderValue[1]
            );
        }

        let sortedData = sortData(currentSort, filteredData);
        setCurrentData(sortedData);
        setItemCount(sortedData.length);
    }, [
        search,
        wineTypes,
        countries,
        regions,
        priceMin,
        priceMax,
        ratingSliderValue,
        allData,
        currentSort,
        wineTypesExclude,
        countriesExclude,
    ]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY < 100) {
                setHideUpArrow(true);
            } else {
                setHideUpArrow(false);
            }
            loadMoreItems();
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [loadMoreItems]);

    // useEffect(() => {
    //     window.addEventListener("scroll", loadMoreItems);
    //     return () => {
    //         window.removeEventListener("scroll", loadMoreItems);
    //     };
    // }, [currentData, loadMoreItems]);

    useEffect(() => {
        if (currentData.length > 0) {
            setLoading(false);
        }
    }, [currentData]);

    return (
        <div>
            {/* <div className="header">
                <h1>Header</h1>
            </div> */}
            <div className="content">
                <Sidebar
                    updateSearch={updateSearch}
                    search={search}
                    handleFilterChange={handleFilterChange}
                    handleCustomCheckboxChange={handleCustomCheckboxChange}
                    handleSliderChange={handleSliderChange}
                    ratingSliderValue={ratingSliderValue}
                />
                <div className="main-content">
                    <div className="content-header">
                        <p>
                            Pörun á milli Vivino og vinbúðarinnar er ekki 100%,
                            endilega notið linkanna til að athuga.
                            <br />
                            Öll gögn eru í eigu ÁTVR nema einkunn sem er í eigu
                            Vivino.
                        </p>

                        <h4>Product amount</h4>
                        <p>{itemCount}</p>
                        <h3>Sort by</h3>
                        <SortDropdown
                            setCurrentSort={setCurrentSort}
                            currentSort={currentSort}
                        />
                    </div>
                    <div className="products">
                        <Products data={currentItems} />
                        {loading && <CircularProgress />}
                    </div>
                </div>
            </div>
            <div
                className={`up-arrow ${hideUpArrow ? "hide" : ""}`}
                onClick={() => window.scrollTo(0, 0)}
            >
                &#8593;
            </div>
        </div>
    );
};

export default MainPage;
