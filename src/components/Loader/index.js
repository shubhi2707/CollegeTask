import React from 'react';
import {Image,StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import constants from '../../constants';
import BackgroundImage from '../BackgroundImage';
import styles from './style';

export default function Loader() {


  return (
    <BackgroundImage>
      {/* <StatusBar hidden={false} barStyle="dark-content" backgroundColor="transparent" translucent/> */}
<LinearGradient style={styles.outerContainer} colors={['#886d413d', '#503e2a66']}>
       
      <Image source={constants.LoaderGif} style={styles.imageStyle} />
    </LinearGradient>
    </BackgroundImage>
    
  );
}
