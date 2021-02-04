import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';


export default function WeekTemperature(props) {


  let [list, setList] = useState([]);
  let [loader, setLoader] = useState(true);

  const data = useSelector((state) => {
    return state.fetchTempReducer.data;
  });


  useEffect(() => {
    getWeeklyTemperature();
  }, [data]);

  const getWeeklyTemperature = () => {
    if (Object.keys(data).length !== 0) {
      let currentHour = new Date().getHours();
      let currentDate = new Date().getDate();
      let dateArr = [];
      
      data.list.forEach((item) => {
        let txt = item.dt_txt.split(' ');
        let elementDate = txt[0].split('-');
        let date = elementDate[elementDate.length - 1];
        if (date > currentDate) {
          let elementHour = txt[1].split(':');
          let hour = elementHour[0];
          let calculate = hour - currentHour;
          if (calculate== 0|| calculate == -1 || calculate == -2) {
            dateArr.push(item);
          }
        }
      });
     
      setList(dateArr);
      setOffLoader(false);
    }
  };

  const setOffLoader = () => {
    setLoader(false);
  };

  const renderList = (item) => {
    let date = item.dt_txt.split(' ');
    let weekday = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    let day = weekday[new Date(date[0]).getDay()];
    return (
      <LinearGradient
        colors={['#886d413d', '#503e2a66']}
        style={styles.itemContainer}>
        <View
          style={styles.viewContainer}>
          <Text style={styles.textDesign}>
            {day}
          </Text>
          <Text style={styles.textDesign}>
            {item.main.temp}°C
          </Text>
        </View>
      </LinearGradient>
    );
  };

  
  return (
    <View>
      {loader ? (
        <ActivityIndicator
        color="white" size="large"
          style={styles.activity}
        />
      ) : (
        <FlatList data={list} renderItem={({item}) => renderList(item)} />
      )}
    </View>
  );
}
