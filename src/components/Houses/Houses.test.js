import reducer, { slytherin } from "./Houses";

// Test ADD_HOUSE_FIRST
it("Should add a house as first item", () => {
  // given
  const state = reducer(undefined, { type: "INIT" });
  // when
  const newState = reducer(state, {
    type: "ADD_HOUSE_FIRST",
    house: slytherin
  });
  // then
  expect(newState.length).toBe(state.length + 1);
  expect(newState[0]).toEqual(slytherin);
});

// // Test REMOVE_SECOND_HOUSE
it("Should remove 2nd house", () => {
  // given
  const state = reducer(undefined, { type: "INIT" });
  // when
  const newState = reducer(state, {
    type: "REMOVE_SECOND_HOUSE",
    house: slytherin
  });
  // then
  expect(newState.length).toBe(2);
  expect(newState.find(house => house.name === "Ravenclaw")).toBeUndefined();
});

// Test ADD_LAST_HOUSE
it("Should add a house to the end", () => {
  // given
  const state = reducer(undefined, { type: "INIT" });
  // when
  const newStaete = reducer(state, {
    type: "ADD_LAST_HOUSE",
    house: slytherin
  });
  // then
  expect(newStaete.length).toBe(4);
  expect(newStaete.find(house => house.name === "slytherin")).toBeDefined();
});

//ADD_POINTS
// ...
