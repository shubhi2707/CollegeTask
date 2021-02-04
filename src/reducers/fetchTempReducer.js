const initialState ={
    statusFive : false,
    statusCurrent : false,
    statusCity : false,
    messageFive : '',
    messageCurrent : '',
    messageCity : '',
    data : {},
    currentData:{},
    city : {}
}


export default function fetchTempReducer(state = initialState, action) {
  switch (action.type) {
    case "DATA_FETCHED_FIVE_DAYS":
      return {
        ...state, 
        statusFive: true,
        messageFive  : action.message,
        data : action.payload
      };
      case "DATA_FETCHED_CURRENT":
        return {
          ...state, 
          statusCurrent: true,
          messageCurrent  : action.message,
          currentData : action.payload
        }
      
        case "CITY_FETCHED" :
          return {
            ...state, 
            city : action.payload,
            messageCity : action.message,
            statusCity : true
          }
          case "DATA_NOT_FETCHED_FIVE":
            return {
              ...state, 
              statusFive : false,
              messageError : action.message
            }
            case "DATA_NOT_FETCHED_CURRENT":
              return {
                ...state, 
                statusCurrent : false,
                messageError : action.message
              }
            case "CITY_NOT_FETCHED" : 
            return {
              ...state, 
              statusCity : false,
              messageErrorCity : action.message
            }
    default:
      return state;
  }
}
