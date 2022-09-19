import { Image, StyleSheet,SafeAreaView,View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import React ,{useState, useEffect}from 'react'
import { createUserWithEmailAndPassword, signOut, updateCurrentUser } from 'firebase/auth'
import { auth } from '../firebase'
import { TextInput } from 'react-native-paper';
import { app,db } from '../firebase';
import { doc, getDoc,setDoc,updateDoc } from 'firebase/firestore/lite';
import { async } from '@firebase/util';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useRoute } from '@react-navigation/native';
const FinalScreen = () => {
  
  const navigation = useNavigation();
  const route = useRoute();
  let [fontsLoaded] = useFonts({
    "CatalishHuntera" : require("../assets/fonts/CatalishHuntera.ttf"),
    "QG" : require("../assets/fonts/Questrial-Regular.ttf")
   })
  const namexx = {name:"Harsha"};      
  const userDetails = auth.currentUser;
  const [theScores, setTheScore] = useState()
  const [userName, setuserName] = useState()

  function getAndUpdate(){

  if (userDetails !== null){

      try{
      getDoc(doc(db,"users",userDetails.uid.toString())).then((value) => {
        let allData = value.data();
        // console.log(allData.score)
        // const currScores = allData.score
        console.log("Starts Here -  All dataa", allData)
        // console.log("Present score in db:", currScores)
        console.log("Score of this turn:",route.params.score)
        console.log(typeof route.params.score,typeof allData )
        
       console.log(allData.score.push(route.params.score))
       let md = allData.score
        console.log("After pushing", md)
        const dbScore = {score: md}
        console.log("After pushing", md)
        // {score:[0]}
        updateDoc(doc(db,"users",userDetails.uid.toString()),dbScore)
        console.log("Updated")
        console.log(Math.max(...md))        
        setTheScore(Math.max(...md)) 
        setuserName(allData.name)      
        }
        )}
        catch(error){
          console.log(error)
        }
     
        }           
        }
        useEffect( () => {
          getAndUpdate();
          },[])

function onSignout(){

  signOut(auth).then(
    ()=> navigation.navigate("Login")
  ).catch((error)=>alert(error.message))
}

  // if(route.params.score> Math.max(currScores)){
  //   maxScore= route.params.score
  // }
  // else{
  //   maxScore = Math.max(currScores)
  // }
  
// const Data = allData();

// const currScores = Data.score
//   console.log(currScores)
// const md = currScores.push(currScores[currScores.length -1])
// console.log("Hey",Data)

// const updateScores = async (db, id) =>{
//   if (userDetails !== null){
    
//     await updateDoc(doc(db,"users",id.toString()),dbScore)
//     }
//   }
// updateScores(db,userDetails.uid);




  // let maxScore;
  // if(route.params.score> Math.max(currScores)){
  //   maxScore= route.params.score
  // }
  // else{
  //   maxScore = Math.max(currScores)
  // }


  return (
    // <ImageBackground source={require('../assets/images/background.png')} style={styles.bgimg}>
    <SafeAreaView style={styles.container} >
      
    
              <View style={styles.scorebox}>
                  <Text style={styles.text}>
                     {userName} , you scored: 
                  </Text>
                  <Text style={styles.score}>
                     {route.params.score}
                  </Text>       
              </View>
          
              <View>
                
                <Text style={styles.highest}>
                Your Best: {theScores}
                </Text>
              </View>
              
              <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("LeaderBoard") }>
                <Text style={{fontFamily:'QG'}}>
                  Leader Board
                </Text>
              </TouchableOpacity>

              {/* <TouchableOpacity   
              onPress={()=> 
              {
          
                navigation.navigate("Home")


              }}>
                <Text style={{fontFamily:'CatalishHuntera', marginTop:110, fontSize:35, color:'#FFE3E0'}}>
                   Try again?
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity style={{marginTop:135,borderRadius:30,backgroundColor: '#FFE3E0',}}  onPress={()=>onSignout()}>
                <Text style={{fontFamily:'QG',  padding:10, fontSize:25, color:'#EF6351'}}>
                   Log Out
                </Text>
              </TouchableOpacity>

        
     
     



    </SafeAreaView>
    // </ImageBackground>
  );
};

const styles  = StyleSheet.create({
  container:{
  flex:1,
    backgroundColor:'#EF6351',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  text:{
    fontFamily: 'QG',
    fontSize:20,
    marginTop:20,
  },
  scorebox:{
    marginTop:70,
    alignItems:'center',
    backgroundColor:'#FFE3E0',
    borderRadius: 30,
    padding:20,
  },
  score:{

    fontFamily:'CatalishHuntera',
    fontSize:90,
    color:'#F38375'
  },
  img:{
    
    width: 200,
    height: 200
  },
  bgimg:{
    
    width: '100%',
    height: '100%',
    resizeMode:'stretch',
    flex:1,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 26,
    borderRadius: 40,
    elevation: 3,
    width :"40%",
    marginTop:5,
   
    
    backgroundColor: '#FFE3E0',
  },
  highest:{
  
    margin:10,
    marginTop: 50,
    fontSize: 25,
    fontFamily:'QG',

  },
})

export default FinalScreen