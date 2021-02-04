import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BackgroundImage from '../BackgroundImage';
import styles from './style';

export default function ErrorHandling(props) {
    
  const tryAgain = () => {
    props.startLoader(true);
  };

  return (
    <BackgroundImage>
      <View style={styles.outerContainer}>
        <View>
          <Text style={styles.textError}>Something went wrong</Text>
        </View>
        <TouchableOpacity
          onPress={tryAgain}
          style={styles.touchableStyle}
          activeOpacity={0.8}>
          <LinearGradient
            colors={['#886d413d', '#503e2a66']}
            style={styles.gradientStyle}>
            <Text style={styles.retryText}>Retry</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </BackgroundImage>
  );
}
