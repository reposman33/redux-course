import React from "react";
import { createStore } from "redux";
import { connect } from "react-redux";
import "./ImmutableObjects.scss";

class ImmutableObjects extends React.Component {
	onUpdateAltitudeTo1300 = () => {
		this.props.updateAltitudeTo1300();
	};
	onUpdateLatitudeTo73 = () => {
		this.props.updateLatitudeTo73();
	};
	onPutPassengerInSeat1 = () => {
		this.props.putPassengerInSeat1();
	};
	onChangePilotNameToLynne = () => {
		this.props.changePilotNameToLynne();
	};
	onAddAirportToThePlannedRoute = () => {
		this.props.addAirportToThePlannedRoute();
	};
	onClearThePlannedRoute = () => {
		this.props.clearThePlannedRoute();
	};

	render() {
		return (
			<div className='container'>
				<div className='row'>
					<div className='col'>
						<div>This is the plane:</div>
						<div>{JSON.stringify(this.props.airplane)}</div>
					</div>
				</div>
				<div className='row'>
					<button onClick={this.onUpdateAltitudeTo1300}>
						Update the altitude to 1300
					</button>
					<button onClick={this.onUpdateLatitudeTo73}>
						Update the latitude to 73
					</button>
					<button onClick={this.onPutPassengerInSeat1}>
						Put a passenger(represented by an object) in seat #1
					</button>
					<button onClick={this.onChangePilotNameToLynne}>
						Change the pilot's name (at seat 0) to "Lynne"
					</button>
					<button onClick={this.onAddAirportToThePlannedRoute}>
						Add an airport to the plannedRoute("KAFN" is a nice
						choice.Don't miss a walk to the ice cream stand ;)
					</button>
					<button onClick={this.onClearThePlannedRoute}>
						Clear the plannedRoute(by setting it to an empty array).
					</button>
				</div>
			</div>
		);
	}
}

const actionUpdateAltitudeTo1300 = () => ({
	type: "UPDATEALTITUDETO1300"
});
const actionUpdateLatitudeTo73 = () => ({
	type: "UPDATELATITUDETO73"
});
const actionPutPassengerInSeat1 = () => ({
	type: "PUTPASSENGERINSEAT1"
});
const actionChangePilotNameToLynne = () => ({ type: "CHANGEPILOTNAMETOLYNNE" });
const actionAddAirportToThePlannedRoute = () => ({
	type: "ADDAIRPORTTOTHEPLANNEDROUTE"
});
const actionClearThePlannedRoute = () => ({ type: "CLEARTHEPLANNEDROUTE" });

const mapStateToProps = state => ({
	airplane: state.airplane
});

const mapDispatchToProps = dispatch => ({
	updateAltitudeTo1300: () => dispatch(actionUpdateAltitudeTo1300()),
	updateLatitudeTo73: () => dispatch(actionUpdateLatitudeTo73()),
	putPassengerInSeat1: () => dispatch(actionPutPassengerInSeat1()),
	changePilotNameToLynne: () => dispatch(actionChangePilotNameToLynne()),
	addAirportToThePlannedRoute: () =>
		dispatch(actionAddAirportToThePlannedRoute()),
	clearThePlannedRoute: () => dispatch(actionClearThePlannedRoute())
});

const airplane = {
	altitude: 1200,
	airspeed: 120,
	position: {
		latitude: 72,
		longitude: 42
	},
	plannedRoute: ["KBOS", "KBED", "KORH"],
	seats: {
		0: {
			name: "Dave"
		},
		1: null,
		2: null,
		3: null
	}
};

const initialState = { airplane };

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "UPDATEALTITUDETO1300":
			return { airplane: { ...state.airplane, altitude: 1300 } };
		case "UPDATELATITUDETO73":
			return {
				airplane: {
					...state.airplane,
					position: { ...state.airplane.position, latitude: 73 }
				}
			};
		case "PUTPASSENGERINSEAT1":
			return {
				airplane: {
					...state.airplane,
					seats: {
						...state.airplane.seats,
						1: { name: "Marc" }
					}
				}
			};
		case "CHANGEPILOTNAMETOLYNNE":
			return {
				airplane: {
					...state.airplane,
					seats: { ...state.airplane.seats, 0: { name: "Lynne" } }
				}
			};
		case "ADDAIRPORTTOTHEPLANNEDROUTE":
			const newRoute = state.airplane.plannedRoute;
			newRoute.push("KAFN");
			return {
				airplane: {
					...state.airplane,
					plannedRoute: newRoute
				}
			};
		case "CLEARTHEPLANNEDROUTE":
			return { airplane: { ...state.airplane, plannedRoute: [] } };
		default:
			return state;
	}
};

const ImmutableObjectsStore = createStore(reducer);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ImmutableObjects);
export { ImmutableObjectsStore };
