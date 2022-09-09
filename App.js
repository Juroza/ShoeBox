import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Profile from './screens/Profile';
import Adding_Cards from './screens/Adding_Cards';
import Answering from './screens/Answering';
import Deckanswer from './screens/Deckanswer';
import Info from './screens/Info';
import Explore from './screens/Explore';
import Progress from './screens/Progress';

import {setGlobal, getGlobal}from 'reactn'
setGlobal({
  Decks: '',
  Cards: '',
  state: true,

})
let today = new Date()
async function interval() {
  console.log('yoyfosfsiauo')
  let resultD = await AsyncStorage.getItem('Decks');
  resultD = JSON.parse(resultD);
  let resultC = await AsyncStorage.getItem('Cards');
  resultC = JSON.parse(resultC);
  for(let i=0;i<resultC.length;i++){
    let date = new Date(resultC[i].target)
    if(date<today){
      resultC[i].target=today
      console.log('Had to update a card')
    }
  }
  if (resultD !== null && resultC !== null) {
    setGlobal({ Decks: resultD })
    setGlobal({ Cards: resultC })
    setGlobal({state: false})
    console.log('Data Got')
  }
}
interval()

const confirmation=async()=>{
  try{
  let data = await AsyncStorage.getItem("Decks")
  data= JSON.parse(data)
  if (data===null){
    console.log('here confo')
    let placeholder= ['space']
    placeholder = JSON.stringify(placeholder)
    await AsyncStorage.setItem("Decks",placeholder)
    await AsyncStorage.setItem("Cards", placeholder)
    await AsyncStorage.setItem("LoginLog", placeholder)
    setGlobal({
      Decks: ['space'],
      Cards: ['space'],
      state: true,

    })
    let login = await AsyncStorage.getItem("LoginLog")
    console.log(login)
    login = JSON.parse(login)
    var today = new Date
    today = today.getDate()
    login.push(today)
    login.shift()
    console.log('later',login)
    login = JSON.stringify(login)
    await AsyncStorage.setItem("LoginLog", login)
  }else{
    let login = await AsyncStorage.getItem("LoginLog")
    console.log(login)
    login =JSON.parse(login)
    switch (login){
      case ['space']:
        var today = new Date
        today = today.getDate()
        login.push(today)
        login.shift()
        login = JSON.stringify(login)
        await AsyncStorage.setItem("LoginLog",login)
        break;
      default:
        var today = new Date
        today = today.getDate()
        var k = login.length - 1
        var k = login[k]
        if(today===k){
          console.log('Doing Nothing')
        }else{
          login.push(today)
        }
        login =JSON.stringify(login)
        await AsyncStorage.setItem("LoginLog",login)
      }
  }
  }catch(error){
  console.log("Confo error:",error)
}
}
const destroy =()=>{
  console.log('herre')
  AsyncStorage.getAllKeys()
    .then(keys => AsyncStorage.multiRemove(keys))
    .then(() => alert('success'));
}
confirmation()
//destroy()
function App() {
  const AddStack = createStackNavigator();
  function AddStackScreen() {
    return (
      <AddStack.Navigator>
        <AddStack.Screen
          name="Answering"
          component={Answering}
          options={{
            title:"Today's Cards ",
            headerStyle: {
              backgroundColor: '#94948F',
              height: 50
            },
            headerTintColor: {},
          }}
        />
        <AddStack.Screen
          name="Today's Cards"
          component={Deckanswer}
          options={{
            headerStyle: {
              backgroundColor: '#94948F',
              height: 50
            },
            headerTintColor: {},
          }}
        />
        <AddStack.Screen
          name="Info"
          component={Info}
          options={{
            headerStyle: {
              backgroundColor: '#94948F',
              height: 50
            },
            headerTintColor: {},
          }}
        />
      </AddStack.Navigator>
    );
  }

  const Tab = createMaterialBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home"
        barStyle={{ backgroundColor: '#94948F' }}>
        <Tab.Screen name="Progress" component={Progress} options={{
          tabBarLabel: 'Progress',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-bar" color={color} size={26} />
          ),
        }} />
        <Tab.Screen name="Today's Cards" component={AddStackScreen} options={{
          tabBarLabel: 'Todo Cards',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="radiobox-marked" color={color} size={26} />
          ),
        }} />
        <Tab.Screen name="Add Cards" component={Adding_Cards} options={{
          tabBarLabel: 'Add Cards',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="shape-rectangle-plus" color={color} size={26} />
          ),
          
        }}/>
        <Tab.Screen name="Global" component={Explore} options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="web" color={color} size={26} />
          ),
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default App;