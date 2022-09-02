import React from 'react';
import "https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import './MapComponent.css'



function MapComponent({mapCenter}) {

    // console.log('mapCenter', mapCenter)
    return (
            

                <MapContainer center={mapCenter} zoom={12} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={mapCenter}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            
    );
}

export default MapComponent;