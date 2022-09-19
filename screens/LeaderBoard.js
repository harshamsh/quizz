import { Image, StyleSheet,SafeAreaView,View, Text, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState,useEffect } from 'react'
import { getFirestore,collection, doc, getDocs } from 'firebase/firestore/lite';
import { auth } from '../firebase'
import { app,db } from '../firebase';
import { useFonts } from 'expo-font';



const LeaderBoard = () => {
    const [userArray, setuserArray] = useState([])
    const colRef = collection(db,"users")
    const scoreDets={};
    let dataArray=[];
    let dataArraySort;
    const userDetails = auth.currentUser;


    function getAllDocs() {
        //     try {
        //         getDocs(colRef).then((response) => {
        //             value.forEach(doc =>{{
        //                 let newEntry = {
        //                     username: doc.name,
        //                     highscore: Math.max(doc.score),
        //                 };
        //                 setuserArray((tempArray) => [...tempArray, newEntry]);
        //                 console.log(userArray);
        //             }
        //         });
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
    
        
                try{ 
                    // let userDets={username: "", highscore: 0};
                    let Temp; 
                    let emptyArr= []; 
                    let i =0;         
                    getDocs(colRef).then((value)=>{
                        value.forEach(doc =>{
                        let userDets={username: "", highscore: 0,key:0};
                        i=i+1;
                        Temp = doc.data()
                        userDets.username = Temp.name
                        userDets.key = i
                        userDets.highscore = Math.max(...Temp.score)
                        // console.log(doc.data())
                        Temp = {}
                        dataArray.push(userDets)
                        console.log(dataArray) 
                        
                                           
                    })
                    // console.log(dataArray)
                    dataArraySort=dataArray.sort((a, b) => (a.highscore < b.highscore) 
                    ? 1 : (a.highscore === b.highscore) ? ((a.highscore < b.highscore) ? 1 : -1) : -1 )
                    setuserArray(dataArray)
                    
                    
                    })
                    // setuserArray(dataArray)
                    }
                catch(error){
                    console.log(error)
                }}
            
            
    
    
            useEffect( () => {
                getAllDocs()
                },[])
            
    
            
    
      return (
        <SafeAreaView style={styles.container}>     
        <ScrollView>
            <View style={styles.title}>
                <Text style={styles.titleText}>Leader Board</Text>
            </View>
            {userArray.map((obj)=>
            {
            return(
            <View key ={obj.key} style = {styles.ranks}>
                
                <View><Text>{obj.username}</Text></View>
                <View><Text>{obj.highscore}</Text></View>
            </View>
                )}
                    )}
           </ScrollView>
        </SafeAreaView>
      )
    }
    const styles = StyleSheet.create({
        container :{
        flex:1,
        backgroundColor:'#EF6351',
        alignItems: 'center',
        // justifyContent: 'center',
        },
        title:{
            marginTop:50,
            alignItems:'center',
            backgroundColor:'#FFE3E0',
            padding:15,
            marginBottom:30,
            borderRadius: 30,
          },
        titleText:{
            fontFamily:'CatalishHuntera',
            fontSize:30,
            color:'#EF6351',
          },
        ranks:{
            fontFamily:'QG',
            fontSize:30,
            flexDirection: "row",
            justifyContent:"space-between",
            width:300,
            backgroundColor:'white',
            padding:10,
            margin:10,
            borderRadius:10,
    
          },
    
})
export default LeaderBoard