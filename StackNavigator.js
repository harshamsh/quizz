import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/home';
import QstnBox from './screens/QstnBox';
import FinalScreen from './screens/FinalScreen';
import { useEffect, useContext } from 'react';
import LoginScreen from './screens/LoginScreen';
import Register from './screens/Register';
import LeaderBoard from './screens/LeaderBoard';
import { AuthContext } from './store/AuthContext';
const Stack = createNativeStackNavigator();


// function Authorised(){

//   <Stack.Navigator screenOptions={{headerShown:false}}>
//     <Stack.Group>


//         <Stack.Screen name="Home" component={Home}/>
//         <Stack.Screen name="Quizz" component={QstnBox }/>
//         <Stack.Screen name="Final" component={FinalScreen }/>
//         <Stack.Screen name="LeaderBoard" component={LeaderBoard }/>
//     </Stack.Group>

// </Stack.Navigator>

// }

// function UnAuthorised(){
//   <Stack.Navigator screenOptions={{headerShown:false}}>
//     <Stack.Group>
//         <Stack.Screen name="Login" component={LoginScreen}/>
//         <Stack.Screen name="Register" component={Register}/>
   
//     </Stack.Group>

// </Stack.Navigator>
// }


const StackNavigator = () => {
//  const authCtx = useContext(AuthContext);


  return (

<Stack.Navigator initialRouteName='Login' screenOptions={{headerShown:false}}>

<Stack.Group>

<Stack.Screen name="Login" component={LoginScreen}/>
    <Stack.Screen name="Register" component={Register}/>
    <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Quizz" component={QstnBox }/>
        <Stack.Screen name="Final" component={FinalScreen }/>
        <Stack.Screen name="LeaderBoard" component={LeaderBoard }/>
   

</Stack.Group>

</Stack.Navigator>
    );

  }
export default StackNavigator