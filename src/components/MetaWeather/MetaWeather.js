import React from "react";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { connect } from "react-redux";
import "./MetaWeather.scss";
import { getWeather } from "./actions";

const initialState = {
	city: null,
	error: null,
	isLoading: false,
	weatherForecast: []
};

const actionChangeCity = city => ({ type: "UPDATE_CITY", city });

const mapStateToProps = state => ({
	city: state.city,
	error: state.error,
	isLoading: state.isLoading,
	weatherForecast: state.weatherForecast
});

const mapDispatchToProps = dispatch => ({
	getWeather: city => dispatch(getWeather(city))
});

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "GET_WEATHER_BEGIN":
			return { ...state, isLoading: true, error: null };
		case "GET_WEATHER_SUCCESS":
			return {
				...state,
				weatherForecast: action.data,
				isLoading: false,
				error: null
			};
		case "GET_WEATHER_ERROR":
			return { ...state, error: action.error, isLoading: false };
		default:
			return state;
	}
};

const store = createStore(reducer, applyMiddleware(thunk));

class MetaWeather extends React.Component {
	constructor(props) {
		super(props);
		this.state = { city: "" };
	}
	onGetWeather = () => {
		this.props.getWeather(this.state.city);
	};

	onChange = event => {
		this.setState({
			[event.currentTarget.name]: event.currentTarget.value
		});
	};

	render() {
		const { city, error, isLoading, weatherForecast } = this.props;
		const slider = [];

		if (isLoading) {
			return <div>Loading...</div>;
		}

		if (error) {
			return <div>{error.message}</div>;
		}

		if (weatherForecast && weatherForecast.consolidated_weather) {
			const today = new Date(weatherForecast.time);
			this.slider = weatherForecast.consolidated_weather.map(
				(weather, ind) => {
					return (
						<WeatherForecast
							weather={weather}
							day={new Date(
								today.getFullYear() +
									"-" +
									(today.getMonth() + 1) +
									"-" +
									(today.getDate() + ind)
							).toDateString()}
							key={weather.id}
						/>
					);
				}
			);
		}

		return (
			<div className='container m-b-3'>
				<div className='row justify-content-center mb-3'>
					<div className='title col text-center'>
						Current weather in
					</div>
				</div>

				<div className='row justify-content-center mb-3'>
					<div className='col-md-3 input'>
						<input
							type='text'
							name='city'
							className='mb-3'
							value={this.state.city}
							onChange={this.onChange}
						/>
					</div>
				</div>

				<div className='row justify-content-center mb-3'>
					<div className='col-md-3 text-center'>
						<button onClick={this.onGetWeather} className='mb-3'>
							Get it!
						</button>
					</div>
				</div>

				<div className='row justify-content-center mb-3'>
					<div className='col-md-3'>
						<div className='text-center title'>
							Weer voor&nbsp;
							{weatherForecast.title}
						</div>
					</div>
				</div>
				{this.slider && this.slider.length > 0 && (
					<div className='row justify-content-center mb-3 slider'>
						<div className='col flex-direction-row'>
							{this.slider}
						</div>
					</div>
				)}
			</div>
		);
	}
}

const WeatherForecast = props => (
	<div className='container weatherForecast'>
		<div className='row'>
			<div className='col'>{props.day}</div>
		</div>
		<div className='row'>
			<div className='col-md-6'>
				<span className='mr-4'>Temperatuur:</span>
				Min: {props.weather.min_temp.toFixed(1)}
			</div>
			<div className='col-md-6'>
				Max: {props.weather.max_temp.toFixed(1)}
			</div>
			{/* min_temp, max_temp, weather_state_name, weather_state_abbr,wind_speed,wind_direction_compass */}
		</div>
		<div className='row'>
			<div className='col-md-12'>
				<img
					alt={props.weather.weather_state_name}
					src={`https://www.metaweather.com/static/img/weather/${
						props.weather.weather_state_abbr
					}.svg`}
				/>
			</div>
		</div>
		<div className='row'>
			<div className='col-md-2 mr-4'>Wind:</div>
			<div className='col-md-3'>
				{props.weather.wind_speed.toFixed(2)}
			</div>
			<div className='col-md-4 text-center'>
				Windrichting:&nbsp;{props.weather.wind_direction_compass}
			</div>
		</div>
	</div>
);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MetaWeather);

export { store as MetaWeatherStore };
