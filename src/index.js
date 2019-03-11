import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
// COUNTER
// import Counter, { counterStore } from "./components/Counter/counter";
// STEPCOUNTER
// import StepCounter, {
// 	stepCounterStore
// } from "./components/StepCounter/StepCounter";
// TRAFFICLIGHT
// import TrafficLight, { trafficLightStore } from "./components/TrafficLight/TrafficLight";
// CLOCK
// import Clock, { clockStore } from "./components/Clock/Clock";
// IMMUTABLE ARRAYS
// import ImmutableArrays, { immutableArraysStore } from "./components/ImmutableArrays/ImmutableArrays";
// IMMUTABLEOBJECTS
// import ImmutableObjects, { ImmutableObjectsStore } from "./components/ImmutableObjects/ImmutableObjects";

// METAWEATHER
import MetaWeather, {
	MetaWeatherStore
} from "./components/MetaWeather/MetaWeather";

const store = MetaWeatherStore;
const Component = MetaWeather;

const App = () => (
	<Provider store={store}>
		<Component />
	</Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
