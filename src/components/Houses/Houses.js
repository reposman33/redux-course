import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { connect } from "react-redux";
import flags from "./flags";
import "./index.css";

const initialState = [
  {
    id: 0,
    name: "Gryffindor",
    image: flags.gryffindor,
    points: 50
  },
  {
    id: 1,
    name: "Ravenclaw",
    image: flags.ravenclaw,
    points: 100
  },
  {
    id: 2,
    name: "Hufflepuff",
    image: flags.hufflepuff,
    points: 50
  }
  // one is missing...
];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_HOUSE_FIRST":
      return [action.house, ...state];
    case "REMOVE_SECOND_HOUSE":
      return [state[0], ...state.splice(2)];
    case "ADD_LAST_HOUSE":
      return [...state, action.house];
    case "ADD_POINTS":
      const newState = state.map(house => ({
        ...house,
        points: house.points + (house.id === action.houseId ? action.points : 0)
      }));
      console.log("newState = ", newState);
      return newState;
    default:
      return state;
  }
}

export const slytherin = {
  id: 3,
  name: "Slytherin",
  image: flags.slytherin,
  points: 50
};

const housesStore = createStore(reducer);

class SchoolAdmin extends React.Component {
  onAddFirst = () => this.props.addFirst();
  onRemoveSecond = () => this.props.removeSecond();
  onAddLast = () => this.props.addLast();
  onAddPoints = id => this.props.addPoints(id);

  render() {
    return (
      <div>
        <main>
          {this.props.houses.map(house => (
            <div key={house.id}>
              <img
                src={house.image}
                alt={house.name}
                onClick={() => this.onAddPoints(house.id)}
              />
              <div>{house.points} points</div>
            </div>
          ))}
        </main>
        <div>
          <button onClick={this.onAddFirst}>
            Add house before first house
          </button>
          <button onClick={this.onRemoveSecond}>Remove second house</button>
          <button onClick={this.onAddLast}>Add last house</button>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  houses: state
});

const mapDispatch = dispatch => ({
  addFirst: () => dispatch({ type: "ADD_HOUSE_FIRST", house: slytherin }),
  removeSecond: () =>
    dispatch({ type: "REMOVE_SECOND_HOUSE", house: slytherin }),
  addLast: () => dispatch({ type: "ADD_LAST_HOUSE", house: slytherin }),
  addPoints: id => dispatch({ type: "ADD_POINTS", houseId: id, points: 50 })
});

const Houses = connect(
  mapState,
  mapDispatch
)(SchoolAdmin);

export { Houses, housesStore };
