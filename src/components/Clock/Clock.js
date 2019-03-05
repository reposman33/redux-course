import React from "react";
import "./Clock.scss";
import { createStore } from "redux";
import { connect } from "react-redux";

class Clock extends React.Component {
	onClickAddMinute = () => {
		this.props.addMinute();
	};
	onClickSubtractMinute = () => {
		this.props.subtractMinute();
	};
	onClickAddHour = () => {
		this.props.addHour();
	};
	onClickSubtractHour = () => {
		this.props.subtractHour();
	};

	render() {
		return (
			<div className='container'>
				<div className='row'>
					<div className='col clock'>
						{(this.props.hours < 10 && "0") + this.props.hours}:
						{(this.props.minutes < 10 && "0") + this.props.minutes}
					</div>
				</div>
				<div className='row clock--buttons'>
					<div className='col'>
						<span onClick={this.onClickAddHour}>&#43;</span>
						<span onClick={this.onClickSubtractHour}>&#45;</span>
					</div>
					<div className='col'>
						<span onClick={this.onClickAddMinute}>&#43;</span>
						<span onClick={this.onClickSubtractMinute}>&#45;</span>
					</div>
				</div>
			</div>
		);
	}
}

const actionAddMinute = () => ({
	type: "ADDMINUTE"
});
const actionSubtractMinute = () => ({
	type: "SUBTRACTMINUTE"
});
const actionAddHour = () => ({
	type: "ADDHOUR"
});
const actionSubtractHour = () => ({
	type: "SUBTRACTHOUR"
});

const now = new Date();
const initialState = { minutes: now.getMinutes(), hours: now.getHours() };
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADDMINUTE":
			return {
				minutes: (state.minutes + 1) % 60,
				hours: state.hours + (Math.floor((state.minutes + 1) / 60) % 24)
			};
		case "SUBTRACTMINUTE":
			return {
				minutes: state.minutes - 1 >= 0 ? state.minutes - 1 : 60 - 1,
				hours: state.hours - ((state.minutes - 1 >= 0 ? 0 : 1) % 24)
			};
		case "ADDHOUR":
			return { minutes: state.minutes, hours: (state.hours + 1) % 24 };
		case "SUBTRACTHOUR":
			return {
				minutes: state.minutes,
				hours: state.hours === 0 ? 23 : state.hours - 1
			};
		default:
			return state;
	}
};
const mapStateToProps = state => ({
	minutes: state.minutes,
	hours: state.hours
});
const mapDispatchToProps = dispatch => ({
	addMinute: () => dispatch(actionAddMinute()),
	subtractMinute: () => dispatch(actionSubtractMinute()),
	addHour: () => dispatch(actionAddHour()),
	subtractHour: () => dispatch(actionSubtractHour())
});

const clockStore = createStore(reducer);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Clock);
export { clockStore };
