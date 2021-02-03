const initialState ={
    status : false,
    message : '',
    data : {}
}
export default function fetchTempReducer(state = initialState, action) {
  switch (action.type) {
    case "DATA_FETCHED":
      return {
        ...state, 
        status: true,
        message  : action.message,
        data : action.payload
      };
      case "DATA_NOT_FETCHED":
        return {
          ...state, 
          status : true,
          message : action.message
        }
    default:
      return state;
  }
}
