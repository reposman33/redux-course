import React from "react";
import "./counter.css";
import { connect } from "react-redux";
import { createStore } from "redux";

const initialState = { count: 0 };

function reduce(state = initialState, action) {
	switch (action.type) {
		case "INCREMENT": {
			return { count: state.count + 1 };
		}
		case "DECREMENT": {
			return { count: state.count - 1 };
		}
		default:
			return state;
	}
}

const counterStore = createStore(reduce);

class Counter extends React.Component {
	constructor(props) {
		super(props);
		this.state = { count: 0 };
	}

	incrementCounter = () => {
		this.props.dispatch({ type: "INCREMENT" });
	};

	decrementCounter = () => {
		this.props.dispatch({ type: "DECREMENT" });
	};

	render() {
		return (
			<div>
				<div>Counter</div>
				<button className='button' onClick={this.incrementCounter}>
					+
				</button>
				<span className='count'>{this.props.count}</span>
				<button className='button' onClick={this.decrementCounter}>
					-
				</button>
			</div>
		);
	}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Counter);
export { counterStore };
