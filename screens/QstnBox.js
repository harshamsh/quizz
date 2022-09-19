import { Image,ImageBackground,StyleSheet,View, Text, Button, Touchable, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState , useEffect} from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'
import { RadioButton } from 'react-native-paper';
import FinalScreen from './FinalScreen';
import { useFonts } from 'expo-font';
import {home} from './home'
import { initialEasyQuestions, initialMediumQuestions, initialHardQuestions } from '../data/questionsData';
// import * as React from 'react';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import { v4 as uuidv4 } from 'uuid';

 

// const radioButtonsData = [{
//     id: '1', // acts as primary key, should be unique and non-empty string
//     label: 'Option 1',
//     value: 'option1'
// }, {
//     id: '2',
//     label: 'Optlion 2',
//     value: 'option2'
// }, {
//   id: '3',
//   label: 'Option 3',
//   value: 'option3'
// }, {
//   id: '4',
//   label: 'Option 4',
//   value: 'option4'
// }]

const QstnBox = () => {

    const navigation = useNavigation();







// Hook to limit the number of questions to display
  const [globalValues, setGlobalValues] = useState({
    noOfQuestionsAnswered: 0,
    score: 0,
  });



  





// Setting states for each list of questions with different difficulties to update their values
  const [easyQuestions, setEasyQuestions] = useState([...initialEasyQuestions]);
  const [mediumQuestions, setmediumQuestions] = useState([...initialMediumQuestions]);
  const [hardQuestions, sethardQuestions] = useState([...initialHardQuestions]);
  const [currentQuestion, setCurrentQuestion] = useState({...initialEasyQuestions[0]});




  // console.log(easyQuestions)

  useEffect( () => {
    setGlobalValues({
    noOfQuestionsAnswered: 0,
    score: 0,
    })
  }, [])



//   Storing the current answer selected by the user to check it with the correct answer
  const onChangeChoice = value => {
    setCurrentQuestion(prev => {
      return {...prev, userAnswer: value};
    });
  };


//   useEffect(() => {
//     setCurrentQuestion(easyQuestions[0]);
//   }, []);

// When he submit button is clicked for one question
  const onSubmit = () => {
    // updates the number of questions answered globally
    setGlobalValues(prev => {
      return {...prev, noOfQuestionsAnswered: prev.noOfQuestionsAnswered + 1};
    });

    // if the question presented is answeed correctely  
    
    if (currentQuestion.userAnswer === currentQuestion.correctAnswer) {
        //checks if the correctly answered difficulty is easy
        if (currentQuestion.difficulty === 'easy') {

            setGlobalValues(prev => {
                return {...prev, score: prev.score + currentQuestion.score};
                });
        let localEasy = easyQuestions.map(i => {
          if (i.title === currentQuestion.title) {
            i.visited = true;
          }
          return i;
    
    });
        setEasyQuestions(localEasy);

        //updating difficulty from easy to medium while making sure that the question is not visited before
        mediumQuestions.map(i => {
          if (i.visited === false) {
            setCurrentQuestion(i);
          }
        });

        // cchecks if the correctly answered difficulty is medium
      } else if (currentQuestion.difficulty === 'medium') {
        setGlobalValues(prev => {
            return {...prev, score: prev.score + currentQuestion.score};
            });
        let localMedium = mediumQuestions.map(i => {
          if (i.title === currentQuestion.title) {
            i.visited = true;
          }
          return i;
        });
        setmediumQuestions(localMedium);

        //updating from medium to hard as the answer is correct
        hardQuestions.map(i => {
          if (i.visited === false) {
            setCurrentQuestion(i);
          }
        });

        // checks if the correctly answered difficulty is hard and changes is its visted state to avoid redundancy
      } else if (currentQuestion.difficulty === 'hard') {
        setGlobalValues(prev => {
            return {...prev, score: prev.score + currentQuestion.score};
            });
        let localhard = hardQuestions.map(i => {
          if (i.title === currentQuestion.title) {
            i.visited = true;
          }
          return i;
        });
        sethardQuestions(localhard);

        //next hard question is displayed
        hardQuestions.map(i => {
          if (i.visited === false) {
            setCurrentQuestion(i);
          }
        });
      }
    
    //  if the answer is incorrect
    } else {
    // checks if the answered difficulty is easy and updates that question's visited status and proceeds to next question in easy
      if (currentQuestion.difficulty === 'easy') {
        let localEasy = easyQuestions.map(i => {
          if (i.title === currentQuestion.title) {
            i.visited = true;
          }
          return i;
        });
        setEasyQuestions(localEasy);

        //updating
        easyQuestions.map(i => {
          console.log(" ez   ++++++++++++++++", i.title, i.visited)
        
          if (i.visited === false) {
            setCurrentQuestion(i);
          }
        });
      }


    //   checks if the incorrectly answered question is medium 
      else if (currentQuestion.difficulty === 'medium') {
        let localMedium = mediumQuestions.map(i => {
          
          
          if (i.title === currentQuestion.title) {
            i.visited = true;
          }
          return i;
        });
        setmediumQuestions(localMedium);

        //updating the difficulty to easy
        easyQuestions.map(i => {
          console.log(" midd   ++++++++++++++++", i.title, i.visited)
          if (i.visited === false) {
            setCurrentQuestion(i);
          }
        });
      } 

      //   checks if the incorrectly answered question is hard
        else if (currentQuestion.difficulty === 'hard') {
          let localHard = hardQuestions.map(i => {
            if (i.title === currentQuestion.title) {
              i.visited = true;
            }
            return i;
          });
          sethardQuestions(localHard);
  
          //updating the difficulty to medium
          mediumQuestions.map(i => {
            console.log("++++++++++++++++", i.title, i.visited)
            if (i.visited === false) {
              setCurrentQuestion(i);
            }
          });
        }
      }
  
    }
    
  
      if (globalValues.noOfQuestionsAnswered ===10) {
        
        
          navigation.navigate('Final', {score: globalValues.score})
        
        
      
          } else {
        
  
              return(
        
        <SafeAreaView style={styles.container}>
        
        <ProgressBar progress={(globalValues.noOfQuestionsAnswered +1)/10} color={'#EF6351'} style={{backgroundColor:'white'}} />
        <ScrollView>
        <View style={styles.qstbx}>
        <View style={styles.questionText}><Text style={{color:'white'}} >Q - {globalValues.noOfQuestionsAnswered +1 }</Text></View>
          <Text style={styles.question} >{currentQuestion.title}</Text>
          <View style={styles.diff}><Text >{currentQuestion.difficulty}</Text></View>
        </View>
        <View >
  
        {currentQuestion.choices.map(i => {
            return (
              <TouchableOpacity 
              style=
              {[styles.optionGroup, 
              {backgroundColor: i === currentQuestion.userAnswer ? "#EF6351" : "white"}]
              }  
              key ={i} onPress={() => onChangeChoice(i)}>
              <Text style={styles.radioText} key={()=> uuidv4()}>{i}</Text>
              </TouchableOpacity>
            );
  
          })}
        {/* <RadioButton.Group
        
          onValueChange={newValue => onChangeChoice(newValue)}
          value={currentQuestion.userAnswer}>
          {currentQuestion.choices.map(i => {
            return (
              <View style={styles.optionGroup}  key ={i}>
              <RadioButton style={styles.radioBtn} value={i}/>
              <Text style={styles.radioText}>{i}</Text>
              
              </View>
            );
          })}
        </RadioButton.Group> */}
        </View>

        <View style = {styles.btncover}><TouchableOpacity style={styles.button} onPress={onSubmit} >
        <Text style={styles.btnText}>Proceed</Text>
            </TouchableOpacity>
          
          </View>
     
          </ScrollView>
    </SafeAreaView>
   
            );
    }
    
  
};

const styles = StyleSheet.create({
    container: {
     flex:1,
      backgroundColor: '#FBC3BC',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    qstbx:{
      backgroundColor: 'white',
      padding: 10,
      margin:10,
      borderRadius:5,
      
    },
    diff:{
      
      alignSelf:'flex-end',
  
      padding:6,
  
      
    },

    question:{
      marginBottom:10,
      padding:10,
  
      color: '#EF6351',
      fontFamily: 'QG',
      fontSize:20,
     
      alignSelf: 'stretch',
    },
    questionText: {
      alignSelf:'flex-start',
      padding:15,
      backgroundColor: '#EF6351',
      fontFamily: 'QG',
      fontSize:20,
      borderRadius:20,
     
      // backgroundColor:'#EF6351',
     
      textAlign:'center'
    },
    img:{
      resizeMode:'stretch',
     flex:1,
    },
    optionGroup: {
      // paddingVertical:10,
      marginHorizontal:40,
      // alignItems: 'center',
      //  justifyContent: 'center',
      padding: 5,
      color: '#EF6351',
      fontFamily: 'QG',
      flexDirection:'row',
      backgroundColor: '#FFE3E0',
      borderRadius:5,
      margin:10,
      marginVertical:15,
      elevation:5,
      
    },
    radioBtn:{
      backgroundColor:'red',
 

    },
    radioText:{

      fontFamily: 'QG',
      fontSize:20


    },
    btnText:{
      fontFamily: 'QG',
      fontSize:22,
      color:'#FFE3E0',
      
     },
     
     button: {
      marginTop:30,
     
       alignItems: 'center',
       justifyContent: 'center',
       paddingVertical: 12,
       paddingHorizontal: 32,
       borderRadius: 30,
       elevation: 3,        
       backgroundColor: '#EF6351',
 
     },
     img:{
      alignSelf:'center',
      width: 400,
      height: 400
     },
     btncover:{
      alignItems:'flex-end',
      paddingRight:30,
      
     },
  });
  
  
export default QstnBox;