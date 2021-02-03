import {StyleSheet} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

  
const styles = StyleSheet.create({
    outerContainer : {
        height: hp('100%'),
        width: wp('100%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"white"
    },
    imageStyle : {
        width: 150, height: 150, position: 'absolute'
    }
})

export default styles