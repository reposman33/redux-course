import React, { Component } from "react";
import { connect } from "react-redux";
import { Provider, createStore } from "redux";
import "./TrafficLight.scss";
import { dispatch } from "rxjs/internal/observable/pairs";

class Trafficlight extends Component {
	constructor(props) {
		super(props);
		this.autoInterValId = undefined;
		this.autoCounter = 0;
	}

	onHandleClickStop = () => {
		this.props.stop();
	};
	onHandleClickWarn = () => {
		this.props.warn();
	};
	onHandleClickGo = () => {
		this.props.go();
	};
	onHandleAutoClick = () => {
		this.autoInterValId = window.setInterval(() => {
			// initialize and set counter
			this.autoCounter = this.autoCounter >= 2 ? 0 : this.autoCounter + 1;
			[
				this.onHandleClickStop,
				this.onHandleClickWarn,
				this.onHandleClickGo
			][this.autoCounter].call(this);
		}, 1000);
	};
	onStopAuto = () => {
		window.clearInterval(this.autoInterValId);
	};

	render() {
		return (
			<div className='container'>
				<div className={"trafficLight " + this.props.light} />

				<div className='buttons'>
					<div onClick={this.onHandleClickStop}>Stop</div>
					<div onClick={this.onHandleClickWarn}>Warn</div>
					<div onClick={this.onHandleClickGo}>Go</div>

					<div onClick={this.onHandleAutoClick}>
						auto {this.autoCounter}
					</div>
					{this.autoInterValId && (
						<div onClick={this.onStopAuto}>stop</div>
					)}
				</div>
			</div>
		);
	}
}

const initialState = { light: "red" };
const actions = {
	stop: () => ({ type: "STOP" }),
	go: () => ({ type: "GO" }),
	warn: () => ({ type: "WARN" })
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "STOP":
			return { light: "red" };
		case "WARN":
			return { light: "yellow" };
		case "GO":
			return { light: "green" };
		default:
			return state;
	}
};

const trafficLightStore = createStore(reducer);

const mapStateToProps = state => {
	return { light: state.light };
};

const mapDispatchToProps = dispatch => ({
	stop: () => dispatch(actions.stop()),
	warn: () => dispatch(actions.warn()),
	go: () => dispatch(actions.go())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Trafficlight);

export { trafficLightStore };
