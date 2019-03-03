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

	render() {
		return (
			<div className='container'>
				<div className='row'>
					<div className={"trafficLight " + this.props.lightA} />

					<div className={"trafficLight " + this.props.lightB} />
				</div>

				<div className='row'>
					<div className='buttons'>
						<div onClick={this.onHandleClickStopA}>Stop</div>
						<div onClick={this.onHandleClickWarnA}>Warn</div>
						<div onClick={this.onHandleClickGoA}>Go</div>
					</div>
					<div className='buttons'>
						<div onClick={this.onHandleClickStopB}>Stop</div>
						<div onClick={this.onHandleClickWarnB}>Warn</div>
						<div onClick={this.onHandleClickGoB}>Go</div>
					</div>
				</div>
				<div className='row justify-content-center buttons'>
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

	onHandleClickStopA = () => {
		this.props.stopA();
	};
	onHandleClickStopB = () => {
		this.props.stopB();
	};
	onHandleClickWarnA = () => {
		this.props.warnA();
	};
	onHandleClickWarnB = () => {
		this.props.warnB();
	};
	onHandleClickGoA = () => {
		this.props.goA();
	};
	onHandleClickGoB = () => {
		this.props.goB();
	};
	onHandleAutoClick = () => {
		this.autoInterValId = window.setInterval(() => {
			// initialize and set counter
			this.autoCounter = this.autoCounter >= 3 ? 0 : this.autoCounter + 1;
			[
				this.onHandleClickWarnB,
				this.onHandleClickStopB,
				this.onHandleClickWarnA,
				this.onHandleClickStopA
			][this.autoCounter].call(this);
		}, 1000);
	};
	onStopAuto = () => {
		window.clearInterval(this.autoInterValId);
	};
}

const initialState = { lightA: "red", lightB: "green" };
const actions = {
	stopA: () => ({ type: "STOPA" }),
	stopB: () => ({ type: "STOPB" }),
	goA: () => ({ type: "GOA" }),
	goB: () => ({ type: "GOB" }),
	warnA: () => ({ type: "WARNA" }),
	warnB: () => ({ type: "WARNB" })
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "STOPA":
			return { lightA: "red", lightB: "green" };
		case "STOPB":
			return { lightA: "green", lightB: "red" };
		case "WARNA":
			return { lightA: "yellow", lightB: state.lightB };
		case "WARNB":
			return { lightA: state.lightA, lightB: "yellow" };
		case "GOA":
			return { lightA: "green", lightB: "red" };
		case "GOB":
			return { lightA: "red", lightB: "green" };
		default:
			return state;
	}
};

const trafficLightStore = createStore(reducer);

const mapStateToProps = state => {
	return { lightA: state.lightA, lightB: state.lightB };
};

const mapDispatchToProps = dispatch => ({
	stopA: () => dispatch(actions.stopA()),
	stopB: () => dispatch(actions.stopB()),
	warnA: () => dispatch(actions.warnA()),
	warnB: () => dispatch(actions.warnB()),
	goA: () => dispatch(actions.goA()),
	goB: () => dispatch(actions.goB())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Trafficlight);

export { trafficLightStore };
