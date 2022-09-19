import { SafeAreaView, View, Text,Keyboard, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react';
import { useEffect } from 'react';
import { TextInput } from 'react-native-paper'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db } from '../firebase';
import { useFonts } from 'expo-font';
import {home} from './home'
// import * as AsyncStorage from '@react-native-community/async-storage';

const LoginScreen = () => {
    const [email, setEmail]= useState("user1@vocab.com")
    const [password, setPassword]= useState('vocab123')
    const navigation = useNavigation()
    let [fontsLoaded] = useFonts({
      "CatalishHuntera" : require("../assets/fonts/CatalishHuntera.ttf"),
      "QG" : require("../assets/fonts/Questrial-Regular.ttf")
     })
  
     if(!fontsLoaded){
      return null;
     }
  
    const handleSignin = () =>{
        
        signInWithEmailAndPassword(auth,email,password)
        .then(userCredentials =>{
            const user = userCredentials.user
            console.log(userCredentials);
            navigation.navigate("Home")

        })
        .catch(error => alert("wrong credentials"))
         
      auth.onAuthStateChanged((user)=>{
      if(user){
      console.log((user.uid))
    }
    
  })
    }


  return (
    <SafeAreaView style={styles.conatiner}>
      <TouchableWithoutFeedback 
      onPress={Keyboard.dismiss} accessible={false}>
        <View>
      <Text style={styles.title} >Vocab</Text>
      <Text style={styles.subTitle} >It's Quiz Time</Text>
      <View onSubmit
      style={{margin:20,marginTop:100 }} >
        <TextInput
        // showSoftInputOnFocus={false}
        style={{margin:10 }}
        placeholder='Email'
        value = {email}
       
        onChangeText={text => setEmail(text)}
        
        
        />
        <TextInput
        // showSoftInputOnFocus={false}
        style={{margin:10 }}
        placeholder='password'
        value = {password}
        onChangeText={text =>setPassword(text)}
        secureTextEntry
       
        onSubmitEditing = {handleSignin}
        />
      </View>
      <View 
      style={styles.btnContainer}
      >
        <TouchableOpacity
        onPress={handleSignin}
        style={{padding:10,backgroundColor:'#FFE3E0',marginTop:35, borderRadius:10,width:'40%'}}
        
        >
           <Text style={{fontFamily:'QG',alignSelf:'center', fontSize:20}}  >Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
       
        onPress={()=>navigation.navigate("Register")}
        
        >
            <Text style={{fontSize:20,fontFamily:'CatalishHuntera', color:'#FFE3E0', marginTop:10, }}>Register</Text>
        </TouchableOpacity>
      </View>
      </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  conatiner:{
    flex:1,
    backgroundColor: '#EF6351',

    // justifyContent: 'center',
  },
  title:{
    marginTop:50,
   alignSelf:'center',
   fontFamily: 'CatalishHuntera',
   fontSize:80,
   color:'#FFE3E0',
  },
  subTitle:{
    alignSelf:'center',
   fontFamily: 'QG',
   fontSize:25,
   color:'#FFE3E0',
  },
  btnContainer:{
    alignItems:"center",
    margin: 10,
    padding:20,
  },
  button:{
    padding:350,
    margin:20,
    borderRadius:20,
    backgroundColor:'red',
  }
})
export default LoginScreen