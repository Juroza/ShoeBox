import React from 'react';
import { View, StyleSheet, TouchableOpacity,ScrollView, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Text,Divider, Card,Input} from 'react-native-elements'
import { getGlobal, useState, useEffect } from 'reactn';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { TextInput } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
const Explore=()=>{
    const Decks = getGlobal().Decks
    const [name,setname] = useState()
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [docs,setdocs] = useState();
    const [changeup,setchangeup] = useState(true)
    const [search,setsearch] = useState()
    const [showpost,setpost] = useState(false)
    const [optdeck, setdeck] = useState({
        allopt: Decks,
        curopt: 1,
    });
    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);
    useEffect(()=>{
        const update = () => {
            firestore()
                .collection('Shared Decks')
                .get()
                .then(querySnapshot => {
                    console.log('Total users: ', querySnapshot.size);
                    let abc = []
                    querySnapshot.forEach(documentSnapshot => {
                        console.log('User ID: ', documentSnapshot.id, documentSnapshot.data().Deck)
                        console.log(documentSnapshot, 'docs');
                        abc.push(documentSnapshot.data())

                    });
                    setdocs(abc)
                    console.log(docs, 'pepo pog')
                });
        }
        update()

    },[changeup])
    function pickerChange(index) {
        var index = index - 1;
        console.log('hey', optdeck.allopt[index], index);
        Decks.map((v, i) => {
            console.log('gjeslf', i);
            var isit = Decks[index].key;
            console.log(isit);
            if (index === i) {
                setdeck({
                    allopt: Decks,
                    curopt: isit,
                });
                console.log('jojo', optdeck.curopt);
            }
        });
    }
    if (initializing) return null;
    if (!user) {
        return (
            <View style={styles.screen}>
                <Text h2>You'll need to login first</Text>
            </View>
        );
    }
    else if (showpost) {
        console.log('uyoiypipo')
        return (
            <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                <Text h2 style={{ position: "absolute", top: 10, left: 10 }}>
                    Upload Your Deck
                </Text>
                <Input
                placeholder='Name:'
                containerStyle={{position:"absolute",top:100}}        
                />
                <Input
                    placeholder='Description:'
                    containerStyle={{ position: "absolute", top: 150 }}
                />
                <Input
                    placeholder='Tags:'
                    containerStyle={{ position: "absolute", top: 200,marginTop:10 }}

                />
                <Picker
                    style={styles.deckpicker}
                    selectedValue={optdeck.curopt}
                    onValueChange={(itemIndex, itemValue) => pickerChange(itemIndex)}>
                    {
                        Decks.map((v) => {
                            if (v === 'space') {
                                v = null
                            }
                            return (
                                <Picker.Item label={v.deck} value={v.key}

                                />
                            );
                        })}
                </Picker>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.moji}>
                        Upload
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                        marginVertical: 30,
                        borderRadius: 18,
                        backgroundColor: '#D90037',
                        padding: 15,
                        paddingHorizontal: 50,
                        position: 'absolute',
                        top: 375,
                        right: 190
                    }}  onPress={()=>setpost(false)}>
                    <Text style={styles.moji}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
    else if(docs!==undefined) {
    return (
        <View style={styles.screen}>
            <Text h2 style={{position:"absolute",top:10,left:10}}>
                Search for Decks
            </Text>
            <Text h4 style={{ position: "absolute", top: 45, left: 10 }}>
                or create/share them
            </Text>
            <Input
                placeholder="Type here..."
                leftIcon={{ type: 'font-awesome', name: 'search' }}
                rightIcon={<TouchableOpacity onPress={()=>console.log('worrking')}>
                    <Icon
                        name="check" size={20} color="black"
                    />

                </TouchableOpacity>}
                onChangeText={(text) => setsearch(text)}
                containerStyle={{position:"absolute",top:80}}
            />
            <Button
            containerStyle={{ borderRadius: 20, position: "absolute", top: 145, backgroundColor:"#666663",left:10}}
            buttonStyle={{backgroundColor:'#666663'}}
                icon={
                    <Icon
                        name="upload"
                        size={30}
                        color="white"
                        style={{marginRight:10}}
                    />
                }
                title='Upload/Share your Deck'
                onPress={()=>setpost(true)}
            />
            <ScrollView style={styles.scrollscreen}>
                {docs.map((item) => {
                    return (
                       <View 
                       key={item.id}
                       style={styles.DeckCard}
                       >
                           <Text h4 style={{position:'absolute',top:10, left:20}}>
                               {item.Deck}
                           </Text>
                           <View style={{borderWidth:1,borderTopColor:'black',position:'absolute',top:40,left:20,paddingRight:250}}>
                           </View>
                            <Text style={{position:'absolute',top:50,left:20}}>
                                {item.description}
                            </Text>
                       </View>
                        )
                })}
            </ScrollView>
        </View>
    );
            }else{
                return(
                    <View style={{ justifyContent: "center", alignItems: 'center', flex: 1,backgroundColor: '#E0E0DA',}}>
                        <Button
                        loading
                        type='clear'
                        />
                    </View>
                )
            }
}



const styles = StyleSheet.create({
    deckpicker: {
        width: 200,
        height: 120,
        position: 'absolute',
        right: 150,
        top:230
    },
    DeckCard:{
        borderRadius:10,
        borderWidth:15,
        borderColor:'#D2D2CE',
        backgroundColor:'#94948F',
        margin:10,
        marginBottom:10,
        padding:70
    },
    buttono: {
        marginVertical: 50,
        borderRadius: 18,
        backgroundColor: '#ADAD66',
        padding: 20,
        paddingHorizontal: 50,
        opacity: 0.5

    },
    button: {
        marginVertical: 30,
        borderRadius: 18,
        backgroundColor: '#ADAD66',
        padding: 15,
        paddingHorizontal: 50,
        position:'absolute',
        top:375,
        right:10
    },
    moji: {
        color: '#FFF',
        fontSize: 20,


    },
    icons: {
        position: 'absolute',
        left: 0,
        marginTop: 23,
        marginLeft: 20
    },
    screen: {
        flex: 1,
        backgroundColor: '#E0E0DA',
        justifyContent:'center',

    },
    scrollscreen:{
        flex:1,
        borderWidth:1,
        borderTopColor:"black",
        marginTop: 200,
    },
    deckitem: {
        marginTop: 24,
        padding: 30,
        backgroundColor: '#ADAD66',
        fontSize: 30,
        borderBottomRightRadius: 20,
        marginBottom: 30
    },

})
export default Explore