import React, { useEffect, useState } from "react";
import "https://unpkg.com/leaflet@1.8.0/dist/leaflet.js";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "./MapComponent.css";
import { API } from "../utils/variables";

function MapComponent({ mapCenter, input }) {
	const [data, setData] = useState();

	useEffect(() => {
		fetch(API + "articles")
			.then((response) => {
				return response.json();
			})
			.then((res) => {
				setData(res);
			});
	}, [input, setData]);

	return (
		<MapContainer center={mapCenter} zoom={12} scrollWheelZoom={true}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>

			{data &&
				data
					.filter((city) => city.location.match(input))
					.map((article) => (
						<Marker position={[article.lat, article.lon]}>
							<Popup>
								A pretty CSS3 popup. <br /> Easily customizable.
							</Popup>
						</Marker>
					))}
		</MapContainer>
	);
}

export default MapComponent;
