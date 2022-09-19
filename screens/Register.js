import {SafeAreaView, View, Text, TouchableOpacity, StyleSheet,Keyboard, TouchableWithoutFeedback   } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { TextInput } from 'react-native-paper';
import { app,db } from '../firebase';
import { useFonts } from 'expo-font';
import {home} from './home'
// import * as firestore
import { addDoc,doc, collection, getDocs, setDoc } from 'firebase/firestore/lite'
import { async } from '@firebase/util'
const Register = () => {
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [userName, setUserName]= useState('')
    const navigation = useNavigation()
     
    const [data, setdata] = useState({});
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState();
    const [pwdMiss, setpwdMiss] = useState(false);
    const [confirmpassword, setConfirmPassword] = useState();
    
  
    let [fontsLoaded] = useFonts({
      "CatalishHuntera" : require("../assets/fonts/CatalishHuntera.ttf"),
      "QG" : require("../assets/fonts/Questrial-Regular.ttf")
     })
     if(!fontsLoaded){
      return null;
     }
    let collectionRef = collection(db, "users")

    // if (password!==confirmpassword){
    //   setpwdMiss(true)
    // }
    const handleSignup = async () =>{
        
        
        try {
          if(userName && email && password){
          if( password === confirmpassword)
            {const res = await 
            createUserWithEmailAndPassword(auth,email,password)
            const userx = res.user;
          
            const regData = {
            
              name: userName,
              email: userx.email,
              score : [0]

          } 
          
          console.log(userx.uid)
          await setDoc(doc(db,"users",userx.uid.toString()), regData)
    
          .then(       
          navigation.navigate("Login") )}
          else{
            setpwdMiss(true)
            setMsg('passwords do not match')
          }
          }
          else{
            setError(true)
            setMsg('please enter your details to register')
          }
        }
          catch(err)
          {
            console.error(err);
            alert(err.message);
          }}

  return (
    <SafeAreaView style={styles.conatiner}>
      <TouchableWithoutFeedback 
      onPress={Keyboard.dismiss} accessible={false}>
        <View>
      <Text style = {styles.title}>Enter your details here</Text>
      <View style={{marginTop:30}}>
        <TextInput
        style={{margin:20,borderColor: error ? 'red' : '#EF6351',borderWidth:3 }}
        placeholder='Name'
        value = {userName}
        onChangeText={text => setUserName(text)}
        
        />
        <TextInput
        style={{margin:20, borderColor: error ? 'red' : '#EF6351',borderWidth:3, }}
        placeholder='Email:'
        value = {email}
        onChangeText={text => setEmail(text)}
        
        />
        <TextInput
        style={{margin:20, borderColor: error ? 'red' : '#EF6351',borderWidth:3 }}
        placeholder='password'
        value = {password}
        onChangeText={text =>setPassword(text)}
        secureTextEntry
        />
        <TextInput
        style={{margin:20, borderColor: error ? 'red' : '#EF6351',borderWidth:3 }}
        placeholder='confirm password'
        value = {confirmpassword}
        onChangeText={text =>setConfirmPassword(text)}
        secureTextEntry
        />
      </View>
      <View>
        <Text style={{alignSelf:'center',color:'white'}}>
          {msg}
        </Text>
      </View>
      <TouchableOpacity
      onPress={handleSignup}
      style= {{padding:10, backgroundColor:'#FFE3E0', borderRadius:10, width:'40%',alignSelf:'center', marginTop:50,}}>
        <Text style={{fontFamily:'QG', fontSize:20,color:'#EF6351', alignSelf:'center'}}>
            Register Now
        </Text>
      </TouchableOpacity>
      </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
};

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
   fontSize:25,
   color:"#FFE3E0"
   
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

export default Register