import {combineReducers} from 'redux'
import fetchTempReducer from './fetchTempReducer'

const appReducer = combineReducers({
    fetchTempReducer
})

export default function rootReducer(state,action) {
return appReducer(state,action)
}
