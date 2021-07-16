import React from 'react'
import {createSharedElementStackNavigator} from 'react-navigation-shared-element'
import PoiDetailScreen from './PoiDetailScreen';
import TourDetailScreen from './TourDetailScreen';
import HomeScreen from './HomeScreen';

const Stack=createSharedElementStackNavigator();
const HomeStackScreen = () => {
    console.log("HOMESTACKSCREEN");
    return (
       <Stack.Navigator initialRouteName="HomeScreen" headerMode="none">
           <Stack.Screen  name="HomeScreen" component={HomeScreen}></Stack.Screen>
           <Stack.Screen  name="PoiDetailScreen" component={PoiDetailScreen}></Stack.Screen>
           <Stack.Screen  name="TourDetailScreen" component={TourDetailScreen}></Stack.Screen>
       </Stack.Navigator>
    )
}

export default HomeStackScreen
