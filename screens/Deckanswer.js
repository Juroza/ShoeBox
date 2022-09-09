import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView,Button, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { getGlobal } from 'reactn';

const Deckanswer = ({ route, navigation }) => {
    console.log('sdsdfhere')
    const Card = getGlobal().Cards
    const [nowCards,SNC] = useState(null)
    const [count,setcount] = useState(0)
    const [state1,setState1] = useState(false);
    const { card } = route.params;
    navigation.setOptions({ title: card.deck })
    const [statecheck,setcheck] = useState(true)
    var now = new Date()
    let today = now.getDate()
    let atari = card.key
    try{
    if(Card===["space"]){
        console.log('No Cards')
    }else if(statecheck){
        let condo = ['space']
        for(var i=0;i<Card.length;i++){
            console.log(atari,'ATARI')
            console.log(i)
            console.log('Card',Card)
            let tar = Card[i].target
            tar = new Date(tar)
            tar = tar.getDate()
            console.log('tart',tar)
            console.log('today',today)
            if(tar===today){
                if(condo[0]=== 'space'){
                    if (Card[i].deck === atari) {
                        condo.push(Card[i])
                        condo.shift()
                    }
                    console.log('yoy')
                }else{
                    if (Card[i].deck === atari) {
                        condo.push(Card[i])
                    }
                }
            }
            console.log('Done')
        }
        if(condo[0]==='space'){
            SNC(null)
        }else{
            SNC(condo) 
        }
        console.log('asdkhiwfo')
        console.log(nowCards,'allovari')
        setcheck(false)
    }
}catch(error){
    console.log('ERROR',error)
}
    const updateTarget = async () => {
        console.log('executing')
        let Chords = Card
        console.log(Chords.length)
        let store = nowCards[count]
        switch(nowCards[count].level){
            case 'Level_1':
                for(let i=0;i<Chords.length;i++){
                    console.log(i)
                    if( 
                        Chords[i].question===nowCards[count].question
                        &&
                        Chords[i].answer === nowCards[count].answer
                        &&
                        Chords[i].deck === nowCards[count].deck
                        &&
                        Chords[i].fontmass === nowCards[count].fontmass
                        &&
                        Chords[i].format === nowCards[count].format
                        ){
                        var next = new Date()
                        next.setDate(today + 2)
                        store.target = next
                        store.level = 'Level_2'
                        console.log(store)
                        Chords[i]= store
                        await AsyncStorage.setItem("Cards", JSON.stringify(Chords))
                        setcount(count + 1)
                        break;
                    }else{
                        console.log('bruh')
                    }
                }
                setState1(false)
                break;
            case 'Level_2':
                console.log('sapfijpawofjoj')
                for (let i=0; i < Chords.length; i++) {
                    console.log(i)
                    if (
                        Chords[i].question === nowCards[count].question
                        &&
                        Chords[i].answer === nowCards[count].answer
                        &&
                        Chords[i].deck === nowCards[count].deck
                        &&
                        Chords[i].fontmass === nowCards[count].fontmass
                        &&
                        Chords[i].format === nowCards[count].format
                    ) {
                        console.log('here')
                        var next = new Date()
                        next.setDate(today + 4)
                        store.target = next
                        store.level = 'Level_3'
                        console.log(store)
                        Chords[i] = store
                        await AsyncStorage.setItem("Cards", JSON.stringify(Chords))
                        setcount(count + 1)
                        break;
                    } else {
                        console.log('bruh')
                    }
                }
                setState1(false)
                break;
            case 'Level_3':
                for (let i=0; i < Chords.length; i++) {
                    console.log(i)
                    if (
                        Chords[i].question === nowCards[count].question
                        &&
                        Chords[i].answer === nowCards[count].answer
                        &&
                        Chords[i].deck === nowCards[count].deck
                        &&
                        Chords[i].fontmass === nowCards[count].fontmass
                        &&
                        Chords[i].format === nowCards[count].format
                    ) {
                        var next = new Date()
                        next.setDate(today + 8)
                        store.target = next
                        store.level = 'Level_4'
                        console.log(store)
                        Chords[i] = store
                        await AsyncStorage.setItem("Cards", JSON.stringify(Chords))
                        setcount(count + 1)
                        break;
                    } else {
                        console.log('bruh')
                    }
                }
                setState1(false)
                break;
            case 'Level_4':
                for (let i=0; i < Chords.length; i++) {
                    console.log(i)
                    if (
                        Chords[i].question === nowCards[count].question
                        &&
                        Chords[i].answer === nowCards[count].answer
                        &&
                        Chords[i].deck === nowCards[count].deck
                        &&
                        Chords[i].fontmass === nowCards[count].fontmass
                        &&
                        Chords[i].format === nowCards[count].format
                    ) {
                        var next = new Date()
                        next.setDate(today + 16)
                        store.target = next
                        store.level = 'Level_5'
                        console.log(store)
                        Chords[i] = store
                        await AsyncStorage.setItem("Cards", JSON.stringify(Chords))
                        setcount(count + 1)
                        break;
                    } else {
                        console.log('bruh')
                    }
                }
                setState1(false)
                break;
            case 'Level_5':
                for (let i = 0; i < Chords.length; i++) {
                    console.log(i)
                    if (
                        Chords[i].question === nowCards[count].question
                        &&
                        Chords[i].answer === nowCards[count].answer
                        &&
                        Chords[i].deck === nowCards[count].deck
                        &&
                        Chords[i].fontmass === nowCards[count].fontmass
                        &&
                        Chords[i].format === nowCards[count].format
                    ) {
                        var next = new Date()
                        next.setDate(today + 32)
                        store.target = next
                        store.level = 'Level_6'
                        console.log(store)
                        Chords[i] = store
                        await AsyncStorage.setItem("Cards", JSON.stringify(Chords))
                        setcount(count + 1)
                        break;
                    } else {
                        console.log('bruh')
                    }
                }
                setState1(false)
                break;
            case 'Level_6':
                for (let i=0; i < Chords.length; i++) {
                    console.log(i)
                    if (
                        Chords[i].question === nowCards[count].question
                        &&
                        Chords[i].answer === nowCards[count].answer
                        &&
                        Chords[i].deck === nowCards[count].deck
                        &&
                        Chords[i].fontmass === nowCards[count].fontmass
                        &&
                        Chords[i].format === nowCards[count].format
                    ) {
                        var next = new Date()
                        next.setDate(today + 64)
                        store.target = next
                        store.level = 'Level_7'
                        console.log(store)
                        Chords[i] = store
                        await AsyncStorage.setItem("Cards", JSON.stringify(Chords))
                        setcount(count + 1)
                        break;
                    } else {
                        console.log('bruh')
                    }
                }
                setState1(false)
                break;
            case 'Level_7':
                for (let i=0; i < Chords.length; i++) {
                    console.log(i)
                    if (
                        Chords[i].question === nowCards[count].question
                        &&
                        Chords[i].answer === nowCards[count].answer
                        &&
                        Chords[i].deck === nowCards[count].deck
                        &&
                        Chords[i].fontmass === nowCards[count].fontmass
                        &&
                        Chords[i].format === nowCards[count].format
                    ) {
                        var next = new Date()
                        next.setDate(today + 2)
                        store.target = next
                        store.level = 'Level_7'
                        console.log(store)
                        Chords[i] = store
                        await AsyncStorage.setItem("Cards", JSON.stringify(Chords))
                        setcount(count + 1)
                        break;
                    }
                }
                setState1(false)
                break;
                
        }

    }
    
    if (nowCards !== null && nowCards!== undefined) {
        console.log('Cards Now',nowCards)
        console.log('Cards imma',nowCards[count])
        if(nowCards[count]!==undefined){
        if (nowCards[count].format === 'flashcard') {
            const Showing = () => {
                console.log('this', nowCards[count].image)
                if (nowCards[count].image !== undefined && nowCards[count].image !== '') {
                    console.log('uoiugougo')
                    var f_name = nowCards[count].image.uri
                    //let img = `${RNFS.DocumentDirectoryPath}${f_name}`
                    return (
                        <Image
                            source={f_name}
                            style={{ width: '90%', height: 200 }}
                        />
                    )
                } else {
                    return null
                }
            }
            const Showanswer = () => {
                if (state1) {
                    return (
                        <Text style={{ fontSize: nowCards[count]['textsize'], alignItems: 'center', justifyContent: 'center' }}>
                            {nowCards[count]['answer']}
                        </Text>
                    )

                } else {
                    return null
                }
            }
            const incorrect = async() => {
                let Chords = Card
                console.log(Chords.length)
                let store = nowCards[count]
                for (let i = 0; i < Chords.length; i++) {
                    console.log(i)
                    if (
                        Chords[i].question === nowCards[count].question
                        &&
                        Chords[i].answer === nowCards[count].answer
                        &&
                        Chords[i].deck === nowCards[count].deck
                        &&
                        Chords[i].fontmass === nowCards[count].fontmass
                        &&
                        Chords[i].format === nowCards[count].format
                    ) {
                        var next = new Date()
                        next.setDate(today + 1)
                        store.target = next
                        store.level = 'Level_1'
                        console.log(store)
                        Chords[i] = store
                        await AsyncStorage.setItem("Cards", JSON.stringify(Chords))
                        setcount(count + 1)
                        break;
                    }
                }
                setState1(false)

            }
            const Answerbtn = () => {
                if (state1 === false) {
                    return (
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => setState1(true)}
                                onPressIn={() => Showanswer()}>
                                <Text>
                                    Show Answer
                            </Text>
                            </TouchableOpacity>
                        </View >
                    )
                } else {
                    return (
                        <View style={styles.answerbtn}>
                            <TouchableOpacity style={styles.corbtn}
                                onPress={() => updateTarget()}
                            >
                                <Text>
                                    Correct
                            </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.incobutton}
                                onPress={() => incorrect()}
                            >
                                <Text>
                                    Incorrect
                            </Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            }
            return (
                <View style={styles.screen}>
                    <ScrollView contentContainerStyle={{ flex: 2, borderColor: 'black', borderWidth: 1 }}>
                        <ScrollView contentContainerStyle={{ alignItems: "center", justifyContent: 'center' }}>
                            <Showing />
                            <Text style={{ fontSize: nowCards[count]['textsize'] }}>
                                {nowCards[count].question}
                            </Text>
                        </ScrollView>
                    </ScrollView>
                    <View style={{ flex: 1, borderWidth: 0, borderColor: 'black', justifyContent: 'center' }}>
                        <ScrollView contentContainerStyle={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                            <Showanswer />
                        </ScrollView>
                        <Answerbtn />
                    </View>
                </View>
            )
        }
    }else{
            return (
                <View style={styles.screen}>
                    <Text style={{ fontSize: 30, position: 'absolute', top: 200,right:50 }}>
                        No More Cards Today
                </Text>
                </View>
            )
    }
            

    }else {
        return (
            <View style={styles.screen}>
                <Text style={{ fontSize: 30, position: 'absolute', top: 200,right:50 }}>
                    No Cards Today
                </Text>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    answerbtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    corbtn: {
        backgroundColor: '#9CCC65',
        padding: 25,
        borderTopRightRadius: 15,
        position: 'absolute',
        right: 0,
        paddingLeft: 114,
        bottom: 0
    },
    incobutton: {
        backgroundColor: '#D90037',
        padding: 25,
        borderTopLeftRadius: 15,
        paddingLeft: 95,
        position: 'absolute',
        bottom: 0
    },
    button: {
        backgroundColor: '#ADAD66',
        padding: 15,
        paddingHorizontal: 137,
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingBottom: 25,
    },
    moji: {
        color: '#FFF',
        fontSize: 20,


    },
    screen: {
        flex: 1,
        backgroundColor: '#E0E0DA',
        position: 'relative'

    },
    slidescreen: {
        flex: 1,
        backgroundColor: '#E0E0DA',
        height: 300,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,

    }

})

export default Deckanswer;