import {  put, takeLatest, call} from 'redux-saga/effects';
import API from '../connectivity/Api' 


const api = API.create()


function* fetchTemp(action){
    try {
        const response = yield call(()=>api.getTemperature(action.payload) )
        if(response.ok == true){
            yield put({type: 'DATA_FETCHED',message : 'Successfully run', payload  : response.data})
        }
        if(response.ok == false && response.status == null){
            yield put({type: 'DATA_NOT_FETCHED',message : response.problem})
        }
    }
    catch{
        console.warn("error")
    }
}


function* mySaga() {
    yield takeLatest("FETCH_TEMPERATURE", fetchTemp);
}
  
export default mySaga;
