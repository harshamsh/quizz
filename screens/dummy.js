// import { View, Text } from 'react-native';
// import React, { useState , useEffect} from 'react';
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// import { RadioButton } from 'react-native-paper';
// // const radioButtonsData = [{
// //     id: '1', // acts as primary key, should be unique and non-empty string
// //     label: 'Option 1',
// //     value: 'option1'
// // }, {
// //     id: '2',
// //     label: 'Optlion 2',
// //     value: 'option2'
// // }, {
// //   id: '3',
// //   label: 'Option 3',
// //   value: 'option3'
// // }, {
// //   id: '4',
// //   label: 'Option 4',
// //   value: 'option4'
// // }]

// const QstnBox = () => {
    

// //Sample Dataset
//   const initialEasyQuestions = [
//     {
//       title: 'q1',
//       choices: [1, 2, 3],
//       correctAnswer: 1,
//       userAnswer: '',
//       score: 5,
//       visited: false,
//       difficulty: 'easy',
//     },
//     {
//       title: 'q2',
//       choices: [1, 2, 3],
//       correctAnswer: 2,
//       userAnswer: '',
//       score: 5,
//       visited: false,
//       difficulty: 'easy',
//     },
//   ];

//   const initialMediumQuestions = [
//     {
//       title: 'm1',
//       choices: [1, 2, 3],
//       correctAnswer: 1,
//       userAnswer: '',
//       score: 10,
//       visited: false,
//       difficulty: 'medium',
//     },
//     {
//       title: 'm2',
//       choices: [1, 2, 3],
//       correctAnswer: 2,
//       userAnswer: '',
//       score: 10,
//       visited: false,
//       difficulty: 'medium',
//     },
//   ];

//   const initialHardQuestions = [
//     {
//       title: 'h1',
//       choices: [1, 2, 3],
//       correctAnswer: 1,
//       userAnswer: '',
//       score: 15,
//       visited: false,
//       difficulty: 'hard',
//     },
//     {
//       title: 'h2',
//       choices: [1, 2, 3],
//       correctAnswer: 2,
//       userAnswer: '',
//       score: 15,
//       visited: false,
//       difficulty: 'hard',
//     },
//   ];


// // Hook to limit the number of questions to display
//   const [globalValues, setGlobalValues] = useState({
//     noOfQuestionsAnswered: 0,
//     score: 0,
//   });

// // Setting states for each list of questions with different difficulties to update their values
//   const [easyQuestions, setEasyQuestions] = useState(initialEasyQuestions);
//   const [mediumQuestions, setmediumQuestions] = useState(initialMediumQuestions);
//   const [hardQuestions, sethardQuestions] = useState(initialHardQuestions);


//   const [currentQuestion, setCurrentQuestion] = useState({});

// //   Storing the current answer selected by the user to check it with the correct answer
//   const onChangeChoice = value => {
//     setCurrentQuestion(prev => {
//       return {...prev, userAnswer: value};
//     });
//   };




// // When he submit button is clicked for one question
//   const onSubmit = () => {
//     // updates the number of questions answered globally
//     setGlobalValues(prev => {
//       return {...prev, noOfQuestionsAnswered: prev.noOfQuestionsAnswered + 1};
//     });

//     // if the question presented is answeed correctely  
    
//     if (currentQuestion.userAnswer === currentQuestion.correctAnswer) {
//         //checks if the correctly answered difficulty is easy
//         if (currentQuestion.difficulty === 'easy') {
//         let localEasy = easyQuestions.map(i => {
//           if (i.title === currentQuestion.title) {
//             i.visited = true;
//           }
//           return i;
//         });
//         setEasyQuestions(localEasy);

//         //updating difficulty from easy to medium while making sure that the question is not visited before
//         mediumQuestions.map(i => {
//           if (i.visited === false) {
//             setCurrentQuestion(i);
//           }
//         });

//         // cchecks if the correctly answered difficulty is medium
//       } else if (currentQuestion.difficulty === 'medium') {
//         let localMedium = mediumQuestions.map(i => {
//           if (i.title === currentQuestion.title) {
//             i.visited = true;
//           }
//           return i;
//         });
//         setmediumQuestions(localMedium);

//         //updating from medium to hard as the answer is correct
//         hardQuestions.map(i => {
//           if (i.visited === false) {
//             setCurrentQuestion(i);
//           }
//         });

//         // checks if the correctly answered difficulty is hard and changes is its visted state to avoid redundancy
//       } else if (currentQuestion.difficulty === 'hard') {
//         let localhard = hardQuestions.map(i => {
//           if (i.title === currentQuestion.title) {
//             i.visited = true;
//           }
//           return i;
//         });
//         sethardQuestions(localhard);

//         //next hard question is displayed
//         hardQuestions.map(i => {
//           if (i.visited === false) {
//             setCurrentQuestion(i);
//           }
//         });
//       }
    
//     //  if the answer is incorrect
//     } else {
//     // checks if the answered difficulty is easy and updates that question's visited status and proceeds to next question in easy
//       if (currentQuestion.difficulty === 'easy') {
//         let localEasy = easyQuestions.map(i => {
//           if (i.title === currentQuestion.title) {
//             i.visited = true;
//           }
//           return i;
//         });
//         setEasyQuestions(localEasy);

//         //updating
//         easyQuestions.map(i => {
//           if (i.visited === false) {
//             setCurrentQuestion(i);
//           }
//         });
//       }


//     //   checks if the incorrectly answered question is medium 
//       else if (currentQuestion.difficulty === 'medium') {
//         let localMedium = mediumQuestions.map(i => {
//           if (i.title === currentQuestion.title) {
//             i.visited = true;
//           }
//           return i;
//         });
//         setmediumQuestions(localMedium);

//         //updating the difficulty to easy
//         easyQuestions.map(i => {
//           if (i.visited === false) {
//             setCurrentQuestion(i);
//           }
//         });
//       } 

//     //   checks if the incorrectly answered question is hard
//       else if (currentQuestion.difficulty === 'hard') {
//         let localHard = hardQuestions.map(i => {
//           if (i.title === currentQuestion.title) {
//             i.visited = true;
//           }
//           return i;
//         });
//         sethardQuestions(localHard);

//         //updating the difficulty to medium
//         mediumQuestions.map(i => {
//           if (i.visited === false) {
//             setCurrentQuestion(i);
//           }
//         });
//       }
//     }
//   };


//   useEffect(() => {
//     setCurrentQuestion(easyQuestions[0]);
//   }, []);
// // console.log(currentQuestion)
//   useEffect(() => {
//     if (globalValues.noOfQuestionsAnswered === 3) {
//       navigation.navigate("Final")
//     }
//   }, [globalValues]);

//   return (
//     <View>
//       <Text>currentQuestion.title</Text>
//       <RadioButton.Group
//         onValueChange={newValue => onChangeChoice(newValue)}
//         value={currentQuestion.userAnswer}>
//         {currentQuestion.choices.map(i => {
//           return (
//             <View>
//               <Text>{i}</Text>
//               <RadioButton value={i} />
//             </View>
//           );
//         })}
//       </RadioButton.Group>
//       <Button onPress={onSubmit}>Submit</Button>
//     </View>
//   );
// };

// //     return (
// //      <SafeAreaView>
// //         <Text>Questions Are Here</Text>
// //      </SafeAreaView>
// //     );
// // }

// export default QstnBox;