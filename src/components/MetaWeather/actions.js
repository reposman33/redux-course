import { throwError } from "rxjs";

const APIUrl = "https://weather.daveceddia.com";

export const getWeather = city => {
	return (dispatch, getState) => {
		dispatch({ type: "GET_WEATHER_BEGIN" });
		// Get city
		fetch(APIUrl + "/api/location/search/?query=" + city)
			.then(res => res.json())
			// Get weatherforecast
			.then(res => {
				if (Array.isArray(res) && res.length) {
					return fetch(APIUrl + "/api/location/" + res[0].woeid);
				} else {
					throw { message: "Plaats onbekend" };
				}
			})
			.then(res => res.json())
			.then(res => dispatch({ type: "GET_WEATHER_SUCCESS", data: res }))
			.catch(error => dispatch({ type: "GET_WEATHER_ERROR", error }));
	};
};
