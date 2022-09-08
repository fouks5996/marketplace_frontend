import React, { useEffect, useState } from "react";
// import "https://unpkg.com/leaflet@1.8.0/dist/leaflet.js";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "./MapComponent.css";
import { API } from "../../utils/variables";
import RecenterAutomatically from "./RecenterAutomatically";

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

		<MapContainer center={mapCenter} zoom={13} 
		scrollWheelZoom={true}>
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
								<ul>
									<li>{article.title}</li>
									<li>{article.price} €</li>
									<li>{article.user.email}</li>
								</ul>
							</Popup>
						</Marker>
					))}
					<RecenterAutomatically lat={mapCenter[0]} lng={mapCenter[1]} />
		</MapContainer>

	);
}

export default MapComponent;
