import React, {useEffect, useState} from 'react';
import {View, Text, PermissionsAndroid, Platform, Alert} from 'react-native';
import Loader from '../../components/Loader';
import Geolocation from 'react-native-geolocation-service';
import {create} from 'apisauce';
import {useDispatch, useSelector} from 'react-redux';
import DataRendering from '../../components/Data';

export default function MainPage() {
  let [coordinates, setCoordinates] = useState(null);
  const dispatch = useDispatch();
  const status = useSelector((state) => {
    return  state.fetchTempReducer.status
  });
  
  useEffect(() => {
    getGeoLocation();
  }, []);

  const getGeoLocation = async () => {
    const anotherFunc = await hasLocationPermission();
    if (!anotherFunc) return;

    Geolocation.getCurrentPosition(
      (position) => {
        let {latitude, longitude} = position.coords;
        let payload = {};
        payload.lat = latitude;
        payload.lng = longitude;
        setCoordinates(payload)
        dispatch({type: 'FETCH_TEMPERATURE', payload});
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
        Alert.alert('Alert', 'Location permission revoked by user', [
          {
            text: 'Cancel',
          },
          {
            text: 'Ok',
          },
        ]);
      }

      return false;
    }
  };




  return (
    <View style={{flex: 1}}>
       {status == false ? <Loader /> :<DataRendering coordinates={coordinates}/>}
    </View>
  );
}
