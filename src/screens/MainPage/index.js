import React, {useEffect, useState, useRef} from 'react';
import {View, PermissionsAndroid, Platform, Alert} from 'react-native';
import Loader from '../../components/Loader';
import Geolocation from 'react-native-geolocation-service';
import {useDispatch, useSelector} from 'react-redux';
import DataRendering from '../../components/Data';
import ErrorHandling from '../../components/ErrorHandling';
import NetInfo from '@react-native-community/netinfo';

export default function MainPage() {
  let [loader, setLoader] = useState(true);
  let [triggerError, setTriggerError] = useState(false);
  let statusCityRef = useRef(statusCity);
  let statusCurrentRef = useRef(statusCurrent);
  let statusFiveRef = useRef(statusFive);

  const dispatch = useDispatch();

  const statusFive = useSelector((state) => {
    return state.fetchTempReducer.statusFive;
  });
  statusFiveRef.current = statusFive;

  const statusCurrent = useSelector((state) => {
    return state.fetchTempReducer.statusCurrent;
  });
  statusCurrentRef.current = statusCurrent;

  const statusCity = useSelector((state) => {
    return state.fetchTempReducer.statusCity;
  });
  statusCityRef.current = statusCity;

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        setLoader(false);
        setTriggerError(true);
      } 
    });
    getGeoLocation();
    let timer1 = setTimeout(() => {
      setLoader(false);
      if (
        statusCityRef.current == false ||
        statusCurrentRef.current == false ||
        statusFiveRef.current === false
      ) {
        setTriggerError(true);
      }
    }, 10000);

    return () => {
      clearTimeout(timer1);
      unsubscribe;
    };
  }, []);

  useEffect(() => {
    if (statusCity && statusFive && statusCurrent) {
      setLoader(false);
    }
  }, [statusCity, statusFive, statusCurrent]);

  const getGeoLocation = async () => {
    const anotherFunc = await hasLocationPermission();
    if (!anotherFunc) return;

    Geolocation.getCurrentPosition(
      (position) => {
        let {latitude, longitude} = position.coords;
        let payload = {};
        payload.lat = latitude;
        payload.lng = longitude;
        dispatch({type: 'FETCH_TEMPERATURE_FIVE_DAYS', payload});
        dispatch({type: 'FETCH_TEMPERATURE_CURRENT', payload});
        dispatch({type: 'GET_CITY', payload});
      },
      (error) => {
        Alert.alert(
          'Alert',
          'Please allow location while using the app in the settings',
          [
            {
              text: 'Cancel',
            },
            {
              text: 'Ok',
            },
          ],
        );
        console.warn('ERROR', error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        distanceFilter: 50,
        forceRequestLocation: true,
      },
    );
  };

  const hasLocationPermission = async () => {
    if (
      Platform.OS === 'ios' ||
      (Platform.OS === 'android' && Platform.Version < 23)
    ) {
      return true;
    } else {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (hasPermission) return true;

      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

      if (status === PermissionsAndroid.RESULTS.DENIED) {
        Alert.alert('Alert', 'Location permission denied by user', [
          {
            text: 'Cancel',
          },
          {
            text: 'Ok',
          },
        ]);
      } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        setLoader(false);
        setTriggerError(true);
        Alert.alert('Alert', 'Location permission revoked by user', [
          {
            text: 'Cancel',
          },
          {
            text: 'Ok',
          },
        ]);
      }
      setLoader(false);
      setTriggerError(true);
      return false;
    }
  };

  const startLoader = (data) => {
    if (data == true) {
      setLoader(true);
      setTriggerError(false);
      NetInfo.fetch().then(state => {
        if(state.isConnected){
          getGeoLocation();
        }
        else {
          setLoader(false);
          setTriggerError(true);
        }
      });
      
      let timer1 = setTimeout(() => {
        setLoader(false);
        if (
          statusCityRef.current == false ||
          statusCurrentRef.current == false ||
          statusFiveRef.current == false
        ) {
          setTriggerError(true);
        }
      }, 10000);
      return () => {
        clearTimeout(timer1);
      };
    }
  };

  return (
    <View style={{flex: 1}}>
      {triggerError == false ? (
        loader == true ? (
          <Loader />
        ) : (
          <DataRendering />
        )
      ) : (
        <ErrorHandling startLoader={startLoader} />
      )}
    </View>
  );
}
