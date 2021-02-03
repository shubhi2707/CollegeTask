import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {create} from 'apisauce';
import {useSelector} from 'react-redux';
import styles from './style';

export default function City(props) {
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    getCity();
    fetchTemperature();
  }, []);

  const data = useSelector((state) => {
    return state.fetchTempReducer.data;
  });

  const getCity = () => {
    const api = create({
      baseURL: `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${props.coordinates.lat}&longitude=${props.coordinates.lng}&localityLanguage=en`,
    });
    api.get()
      .then((res) => {
        let {city, locality} = res.data;
        if (city == '') {
          setCity(locality);
        } else {
          setCity(city);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const fetchTemperature = () => {
    let currentHour = new Date().getHours();
    let currentDate = new Date().getDate();
    let {list} = data;
    let dateArr = [];
    
  list.forEach((item)=>{
       let txt= item.dt_txt.split(" ")
       let elementDate = txt[0].split("-")
       let date = elementDate[elementDate.length -1]
        if(currentDate == date){
            let elementHour = txt[1].split(":")
            let hour = elementHour[0]
            let calculate = hour-currentHour
            if(calculate == 0||calculate==1 || calculate==2){
                dateArr.push(item)
            }
        }
    })
    let temp = dateArr[0].main.temp
    setTemperature(temp)
  };

  return (
    <View>
      <Text style={styles.textDesign}>{temperature}°C</Text>
      <Text style={styles.textDesign}>
        {city}
      </Text>
    </View>
  );
}
