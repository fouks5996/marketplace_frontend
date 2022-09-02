import React, { useState }  from 'react';
import { useForm } from "react-hook-form";
import "https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
import { errorMessageValues, errorInput, errorMessage } from "../../components/auth/errors";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import MapComponent from '../../components/MapComponent';


function Map(props) {

    const [ mapCenter, setMapCenter ] = useState([51.505, -0.09]);
    const [ modalVisibility, setModalVisibility ] = useState(false);
    // const [ searchedCity, setSearchedCity ] = useState('');

    const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

    const OnSubmit = (input) => {
		console.log(input.location);

        // setSearchedCity(input.location);

        

        fetch(`https://api.geoapify.com/v1/geocode/search?city=${input.location}&format=json&apiKey=9aa5158850824f25b76a238e1d875cc8`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setMapCenter([data.results[0].lat, data.results[0].lon]);
                setModalVisibility(true);
            })
            .catch(err => console.error(err));

            
	};

    // console.log(mapCenter);

    return (
        <div>
            <h1>Chercher les biens par ville</h1>
            <form
				className={`max-w-[400px] flex flex-col gap-3 mt-2`}
				onSubmit={handleSubmit(OnSubmit)}>
				<div className='flex flex-col'>
					<p> Ville </p>
					<input
						className={`border h-10 pl-3 rounded-md  ${errorInput(
							errors.location
						)}`}
						type='text'
						{...register("location", errorMessageValues.location)}
					/>
					{errorMessage(errors.location)}
				</div>

                <button
					className='py-2 px-4 rounded text-white bg-slate-800'
					type='submit'>
					{" "}
					Submit{" "}
				</button>

            </form>
                        
            <div className=''>


           {

               modalVisibility &&   <div>
                                    <button onClick={() => setModalVisibility(false)}>Fermer</button>
                                        <MapComponent mapCenter={mapCenter}/>
                                    </div>
            
            }

            </div>
            
        </div>
    );
}

export default Map;