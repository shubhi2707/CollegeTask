import React from 'react';
import {ImageBackground,StatusBar} from 'react-native'

import constants from '../../constants';


export default function BackgroundImage(props) {


    return (
       <ImageBackground source={constants.SunnyImage} style={{height:"100%",width:"100%"}}>
           <StatusBar hidden={false} barStyle="dark-content" backgroundColor="transparent" translucent/>
           {props.children}
       </ImageBackground>
    )
}
