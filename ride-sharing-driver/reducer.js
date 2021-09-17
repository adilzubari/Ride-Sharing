export const initialState = {
  basket: [],
  Auth: false,
  UserType: "null",
  UserProfile: "null",
  Ride: "null",
};

const reducer = (state, action) => {
  console.log(state, action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "TOGGLE_AUTH":
      return {
        ...state,
        Auth: !state.Auth,
      };

    case "SET_USER_TYPE":
      return {
        ...state,
        UserType: action.UserType,
      };

    case "SET_USER_PROFILE":
      return {
        ...state,
        UserProfile: action.UserProfile,
      };

    case "SET_RIDE":
      return {
        ...state,
        Ride: action.Ride,
      };

    default:
      break;
  }
};

export default reducer;
