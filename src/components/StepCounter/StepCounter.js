import React from "react";
import { connect } from "react-redux";
import { createStore } from "redux";

class StepCounter extends React.Component {
	constructor(props) {
		super(props);
	}

	addStep = () => {
		add();
	};

	resetSteps = () => {
		reset();
	};

	render() {
		return (
			<div>
				<div>You walked {this.props.count} steps today!</div>
				<button onClick={this.addStep()}>Add a step</button>
				<button onClick={this.resetSteps()}>Reset steps</button>
			</div>
		);
	}
}

// ACTIONS
const add = () => {
	return { type: "ADD" };
};
const reset = () => {
	return { type: "RESET" };
};

const reduce = (state, action) => {
	switch (action.type) {
		case "ADD":
			return { count: state.count + 1 };
		case "RESET":
			return { count: 0 };
		default:
			return state;
	}
};

const stepCounterStore = createStore(reduce);

const mapStateToProps = state => {
	return { count: state.count };
};
const mapDispatchToProps = { add, reset };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StepCounter);
export { stepCounterStore };
