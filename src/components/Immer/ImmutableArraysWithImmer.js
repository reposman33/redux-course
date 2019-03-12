import React from "react";
import { createStore } from "redux";
import { connect } from "react-redux";
import produce from "immer";

class ImmutableArraysWithImmer extends React.Component {
	onAddToBeginning = () => {
		this.props.addToBeginning();
	};
	onAddToEnd = () => {
		this.props.addToEnd();
	};
	onInsertAfterFirstItem = () => {
		this.props.insertAfterFirstItem();
	};
	onRemoveSecondItem = () => {
		this.props.removeSecondItem();
	};
	onRemoveId1 = () => {
		this.props.removeId1();
	};
	onGetArrayWithOnlySales = () => {
		this.props.getArrayWithOnlySales();
	};

	render() {
		return (
			<div className='container'>
				<div className='row'>
					<div className='col'>
						<div>These are the events:</div>
						<div>{JSON.stringify(this.props.events)}</div>
					</div>
				</div>
				<div className='row'>
					<button onClick={this.onAddToBeginning}>
						Add an event to the beginning of the array
					</button>
					<button onClick={this.onAddToEnd}>
						Add an event to the end of the array
					</button>
					<button onClick={this.onInsertAfterFirstItem}>
						Insert an event after the first item.
					</button>
					<button onClick={this.onRemoveSecondItem}>
						Remove the second event from the list.
					</button>
					<button onClick={this.onRemoveId1}>
						Remove the event with id 1.
					</button>
					<button onClick={this.onGetArrayWithOnlySales}>
						Produce an array that only contains sales
					</button>
				</div>
			</div>
		);
	}
}

const initialState = {
	events: [
		{ id: 0, type: "SALE", value: 3.99 },
		{ id: 1, type: "REFUND", value: -1.99 },
		{ id: 2, type: "SALE", value: 17.49 }
	]
};

const actionAddToBeginning = () => ({
	type: "ADDTOBEGINNING",
	event: { id: 3, type: "FREE", value: 0.0 }
});
const actionAddToEnd = () => ({
	type: "ADDTOEND",
	event: { id: 4, type: "UNDERTHETABLE", value: 39.99 }
});
const actionInsertAfterFirstItem = () => ({
	type: "INSERTAFTERFIRSTITEM",
	event: { id: 5, type: "OUTLET", value: 148.45 }
});
const actionRemoveSecondItem = () => ({ type: "REMOVESECONDITEM" });
const actionRemoveId1 = () => ({ type: "REMOVEID1" });
const actionGetArrayWithOnlySales = () => ({ type: "GETARRAYWITHONLYSALES" });

const mapStateToProps = state => ({
	events: state.events
});

const mapDispatchToProps = dispatch => ({
	addToBeginning: () => dispatch(actionAddToBeginning()),
	addToEnd: () => dispatch(actionAddToEnd()),
	insertAfterFirstItem: () => dispatch(actionInsertAfterFirstItem()),
	removeSecondItem: () => dispatch(actionRemoveSecondItem()),
	removeId1: () => dispatch(actionRemoveId1()),
	getArrayWithOnlySales: () => dispatch(actionGetArrayWithOnlySales())
});

const reducer = produce((draft, action) => {
	switch (action.type) {
		case "ADDTOBEGINNING":
			draft.events = [action.event, ...draft.events];
			return;
		case "ADDTOEND":
			draft.events = [...draft.events, action.event];
			return;
		case "INSERTAFTERFIRSTITEM":
			draft.events = [
				draft.events[0],
				action.event,
				...draft.events.splice(1)
			];
			return;
		case "REMOVESECONDITEM":
			draft.events = [draft.events[0], ...draft.events.splice(2)];
			return;
		case "REMOVEID1":
			draft.events = draft.events.filter(event => event.id !== 1);
			return;
		case "GETARRAYWITHONLYSALES":
			draft.events = draft.events.filter(event => event.type === "SALE");
			return;
	}
}, initialState);

const immutableArraysStoreWithImmer = createStore(reducer);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ImmutableArraysWithImmer);
export { immutableArraysStoreWithImmer };
