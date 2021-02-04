import {  put, takeLatest, call, all} from 'redux-saga/effects';
import API from '../connectivity/Api' 


const api = API.create()


function* fetchFiveTemperatures(action){
    try {
        const response = yield call(()=>api.getFiveDayTemperature(action.payload) )
        if(response.ok == true){
            yield put({type: 'DATA_FETCHED_FIVE_DAYS',message : 'Successfully fetched', payload  : response.data})
        }
        if(response.ok == false && response.status == null){
            yield put({type: 'DATA_NOT_FETCHED_FIVE',message : response.problem})
        }
    }
    catch{
        yield put({type: 'DATA_NOT_FETCHED_FIVE',message : "Something went wrong"})
    }
}



function* fetchTemperature(action){
    try {
        const response = yield call(()=>api.getCurrentTemperature(action.payload) )
        if(response.ok == true){
            yield put({type: 'DATA_FETCHED_CURRENT',message : 'Successfully fetched current temperature', payload  : response.data})
        }
        if(response.ok == false && response.status == null){
            yield put({type: 'DATA_NOT_FETCHED_CURRENT',message : response.problem})
        }
    }
    catch{
        yield put({type: 'DATA_NOT_FETCHED_CURRENT',message : "Something went wrong"})
    }
}


function* fetchCity(action){
    try {
        const response = yield call(()=>api.getCurrentCityName(action.payload))
        if(response.ok == true){
            yield put({type: 'CITY_FETCHED',message : 'Successfully fetched city', payload  : response.data})
        }
        if(response.ok == false && response.status == null){
            yield put({type: 'CITY_NOT_FETCHED',message : response.problem})
        }
    }
    catch{
        yield put({type: 'CITY_NOT_FETCHED',message : "Something went wrong"})
    }
}



function* mySaga() {
    yield all([
        yield takeLatest("FETCH_TEMPERATURE_CURRENT", fetchTemperature),
        yield takeLatest("FETCH_TEMPERATURE_FIVE_DAYS", fetchFiveTemperatures),
        yield takeLatest("GET_CITY", fetchCity),
    ])
    
}
  
export default mySaga;
