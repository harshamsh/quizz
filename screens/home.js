import {StyleSheet,Image, View, Pressable,Text, SafeAreaView, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useFonts } from 'expo-font';
// import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const Home = () => {
   
  const navigation = useNavigation();


  let [fontsLoaded] = useFonts({
    "CatalishHuntera" : require("../assets/fonts/CatalishHuntera.ttf"),
    "QG" : require("../assets/fonts/Questrial-Regular.ttf")
   })

   if(!fontsLoaded){
    return null;
   }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title} >Vocab</Text>
      <Text style={styles.subTitle} >It's Quiz Time</Text>
      <Image style={styles.img} source={require('../assets/images/study.png')} /> 
      <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Quizz") }>
      <Text style={styles.btnText}>Start Test</Text>
    </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EF6351',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  title:{
    marginTop:80,
   fontFamily: 'CatalishHuntera',
   fontSize:80,
   color:'#FFE3E0',
  },
  subTitle:{
   fontFamily: 'QG',
   fontSize:30,
   color:'#FFE3E0',
  },
  btnText:{
   fontFamily: 'QG',
   fontSize:22,
   color:'#EF6351',
   
  },
  img:{
    marginTop:80,
   width: 300,
   height: 300
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 40,
    elevation: 3,
    width : 180,
   
    
    backgroundColor: '#FFE3E0',
  },
});

export default Home;
