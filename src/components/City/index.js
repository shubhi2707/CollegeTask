import React, {useEffect, useState} from 'react';
import { Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import styles from './style';


export default function City(props) {

  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState(null);


  const data = useSelector((state) => {
    return state.fetchTempReducer.currentData;
  });



  const cityName = useSelector((state) => {
    return state.fetchTempReducer.city;
  });
  

  useEffect(() => {
    fetchTemperature();
  }, [data]);


  useEffect(() => {
    applyCityName()
  }, [cityName]);


  const fetchTemperature = () => {
    if (Object.keys(data).length !== 0) {
      setTemperature(data.main.temp);
    }
  };

  const applyCityName =()=>{
      let {locality, city} = cityName
      if(city !== ""){
          setCity(city)
      }
      else {
          setCity(locality)
      }
  }

  return (
    <>
      <Text style={styles.textDesign }>
        {temperature !== null ? temperature+"°C" : null}
      </Text>
      <Text style={styles.textDesign }>
        {city}
      </Text>
    </>
  );
}
