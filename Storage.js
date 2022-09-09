import React ,{useGlobal, setGlobal}from 'reactn'
import AsyncStorage from '@react-native-community/async-storage';
async function interval() {
    console.log('yoyfosfsiauo')
    let resultD = await AsyncStorage.getItem('Decks');
    resultD = JSON.parse(resultD);
    let resultC = await AsyncStorage.getItem('Cards');
    resultC = JSON.parse(resultC);
    if (resultD !== null && resultC !== null) {
        setGlobal({Decks:resultD})
        setGlobal({Cards:resultC})
        console.log('Data Got')
    }
}
if(global.state){
    interval()
}
