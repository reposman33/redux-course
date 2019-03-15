const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADDTOBEGINNING":
      return { events: [action.event, ...state.events] };
    case "ADDTOEND":
      return {
        events: [...state.events, action.event]
      };
    case "INSERTAFTERFIRSTITEM":
      return {
        events: [state.events[0], action.event, ...state.events.splice(1)]
      };
    case "REMOVESECONDITEM":
      return {
        events: [state.events[0], ...state.events.splice(2)]
      };
    case "REMOVEID1":
      return { events: state.events.filter(event => event.id !== 1) };
    case "GETARRAYWITHONLYSALES":
      return {
        events: state.events.filter(event => event.type === "SALE")
      };
    default:
      return state;
  }
};

export default reducer;
