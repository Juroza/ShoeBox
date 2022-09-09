import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation} from '@react-navigation/native';
import { getGlobal, setGlobal } from 'reactn';

const Answering = ({navigation}) => {
    const [createDeck, setCreateDeck] = useState(null)
    const Decks = getGlobal().Decks
    const [num,setnum] = useState(null)
    const [reset, setfresh] = useState(false)
    if(getGlobal().state){
        console.log("Running")
        async function interval() {
            console.log('yoyfosfsiauo')
            let resultD = await AsyncStorage.getItem('Decks');
            resultD = JSON.parse(resultD);
            let resultC = await AsyncStorage.getItem('Cards');
            resultC = JSON.parse(resultC);
            if (resultD !== null && resultC !== null) {
                setGlobal({ Decks: resultD })
                setGlobal({ Cards: resultC })
                setGlobal({ state: false })
                console.log('Data Got')
                setfresh(false)
            }
        }
        if (getGlobal().state) {
            interval()
        }
    }
    
    //useEffect(()=>{
        //async function name(){
           // try{
         //   let total = await AsyncStorage.getItem("Decks")
        //   total = JSON.parse(total)
        //    setDecks(total)
        //    }catch(error){
         //       console.log(error)
         //   }
      //  }
      //  name()
        
   // })

    const movescreen = (item) => {
        navigation.navigate("Today's Cards", { card: item })
    }

    const setdeck = (text) => {
        try {
            if (Decks[0] === 'space') {
                let num = 1
                setCreateDeck({
                    deck: text,
                    key: num
                })
                console.log('youo',createDeck)
            } else {
                console.log('here')
                var num1 = Decks.length;
                var num2 = num1 - 1;
                console.log(num2)
                console.log(Decks[num2])
                let num = Decks[num2].key + 1;
                setCreateDeck({
                    deck: text,
                    key: num
                })
                console.log('youo',createDeck)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const movescr = () => {
        navigation.navigate('Info')
    }

    if (Decks !== undefined && Decks[0] !== 'space') {
        return (
            <ScrollView style={styles.screen}>
                <Input
                    placeholder="Add New Deck"
                    leftIcon={{ type: 'font-awesome', name: 'plus-square-o' }}
                    onChangeText={(text) => setdeck(text)}
                />
                <Button
                    icon={<Icon name="check" size={15} color='white' />}
                    title="Enter"
                    buttonStyle={{ backgroundColor: '#94948F' }}
                    onPress={() => saveDeck(Decks,createDeck,setfresh)}
                />
                {Decks.map((item) => {
                    return (
                        <View key={item.key}>
                            <TouchableOpacity style={styles.deckitem} onPress={() => movescreen(item)}>
                                <Text style={styles.moji}>
                                    {item.deck}
                                </Text>
                            </TouchableOpacity>
                        </View>)
                })}
            </ScrollView>
        );
    }else if(Decks[0]=='space'){
        return (
            <ScrollView contentContainerStyle={styles.screen}>
                <Input
                    placeholder="Add New Deck"
                    leftIcon={{ type: 'font-awesome', name: 'plus-square-o' }}
                    onChangeText={(text) => setdeck(text)}
                />
                <Button
                    icon={<Icon name="check" size={15} color="#FFF" />}
                    title="Enter"
                    buttonStyle={{ backgroundColor: '#94948F' }}
                    onPress={() => saveDeck(Decks,createDeck,setfresh)}
                />
                <Text style={{ fontSize: 15, marginTop: 50, marginLeft: 30 }}>
                    Would you like a short explanation of how "Spaced Memory
                    Repetition" will work on this app?
                </Text>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <TouchableOpacity style={{ position: "absolute", left: 140 }} onPress={() => movescr()}>
                        <Text>
                            Sure
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }else{
        return(
            null
        )
    }
}

const saveDeck = async (Decks,createDeck,setfresh) => {
    var bruh = createDeck
    try {
        if (bruh === null) {
            alert('Input Required')
        }
        else if (Decks[0] === 'space') {
            Decks.shift()
            Decks.push(bruh)
            console.log('this is decks', Decks)
            Decks = JSON.stringify(Decks)
            await AsyncStorage.setItem("Decks", Decks)
            setGlobal({state: true})
            setfresh(true)
            console.log('from inside', Decks)
            if ((Decks[0] === 'space') || (Decks === undefined)) {
                var num = 1
            } else {
                var num1 = Decks.length;
                var num2 = num1 - 1;
                console.log(num2)
                console.log(Decks[num2])
                var num = Decks[num2].key + 1;
            }
        }
        else {
            Decks.push(bruh)
            Decks = JSON.stringify(Decks)
            await AsyncStorage.setItem("Decks", Decks)
            setGlobal({state:true})
            setfresh(true)
            if ((Decks[0] === 'space') || (Decks === undefined)) {
                var num = 1
            } else {
                var num1 = Decks.length;
                console.log(num1)
                var num2 = num1 - 1;
                var num = Decks[num2].key + 1;
            }

        }
    } catch (error) {
        console.log(error)
    }
}
const styles = StyleSheet.create({
    button: {
        marginVertical: 50,
        borderRadius: 18,
        backgroundColor: '#ADAD66',
        padding: 20,
        paddingHorizontal: 50,
    },
    moji: {
        color: '#FFF',
        fontSize: 15,

    },
    screen: {
        flex: 1,
        //alignItems: 'center',
        backgroundColor: '#E0E0DA',
        //justifyContent:'center'
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    deckitem: {
        marginTop: 24,
        padding: 30,
        backgroundColor: '#ADAD66',
        fontSize: 30,
        borderBottomRightRadius: 20,
        marginBottom:30
    },
});
export default Answering;