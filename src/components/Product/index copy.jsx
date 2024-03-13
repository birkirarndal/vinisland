import { useState } from "react";
import "./styles.css";

export const Product = ({ SortByName, data, SortByPrice, SortByRating }) => {
    return (
        <table>
            <thead className="table-header">
                <tr>
                    <th>Image</th>
                    <th onClick={SortByName}>Name </th>
                    <th onClick={SortByPrice}>Price</th>
                    <th onClick={SortByRating}>Rating</th>
                </tr>
            </thead>
            <tbody>
                {data.map((product) => (
                    <tr key={product.ProductID} className="product-container">
                        <td className="image-container">
                            <a
                                href={`https://www.vinbudin.is/heim/vorur/stoek-vara.aspx/?productid=${String(
                                    product.ProductID
                                ).padStart(5, "0")}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img alt="red wine" src={product.image} />{" "}
                            </a>
                        </td>
                        <td className="product-name">{product.ProductName}</td>
                        <td className="product-price">
                            {product.ProductPrice}
                        </td>
                        <td className="product-rating">
                            <a
                                href={product.VivinoUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {product.Rating}
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
