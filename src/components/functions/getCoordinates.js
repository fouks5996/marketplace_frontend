import { API } from "../../utils/variables";
import Cookies from "js-cookie";

const updateCoordinate = (lat, lon, article) => {

    const token = Cookies.get('token');

    fetch(`${API}articles/${article}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            article: {
                lat,
                lon,
            },
        }),
    })
        .then((res) => res.json())
        .then((data) => {});
};

export const getCoordinate = (location, articleId) => {
    fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${location}&format=json&apiKey=9aa5158850824f25b76a238e1d875cc8`
    )
        .then((response) => response.json())
        .then((data) => {
            updateCoordinate(data.results[0].lat, data.results[0].lon, articleId);
        })
        .catch((err) => console.error(err));
};