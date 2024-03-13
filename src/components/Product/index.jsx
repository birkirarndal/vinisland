import "./styles.css";

export const Products = ({ data }) => {
    return (
        <>
            {data.map((product) => (
                <div key={product.ProductID} className="product-container">
                    <div className="image-container">
                        <img alt="red wine" src={product.image} />{" "}
                    </div>
                    <div className="product-info">
                        <div className="product-name">
                            {product.ProductName}
                        </div>
                        <div className="product-type">
                            {product.ProductType}
                        </div>
                        <div className="product-volume">
                            {product.ProductBottledVolume < 1000
                                ? `${product.ProductBottledVolume} ml`
                                : `${product.ProductBottledVolume / 1000} L`}
                        </div>
                        <div className="product-price">
                            ÁTVR Price: {product.ProductPrice} kr.
                        </div>
                        <div className="product-rating">
                            Rating:{" "}
                            {product.Rating === "—" ? "N/A" : product.Rating}{" "}
                            &#9733;
                        </div>
                    </div>
                    <div className="product-buttons">
                        <a href={product.url} target="_blank" rel="noreferrer">
                            ÁTVR
                        </a>
                        <a
                            href={product.VivinoUrl}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Vivino
                        </a>
                    </div>
                </div>
            ))}
        </>
    );
};
