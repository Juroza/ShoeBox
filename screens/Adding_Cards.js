import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Picker} from '@react-native-community/picker';
import AweIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import { getGlobal,setGlobal} from 'reactn';
const Adding_Cards = () => {
  const Decks = getGlobal().Decks;
  const Card = getGlobal().Cards;
  const [format, setformat] = useState('flashcard');
  const [fontmass, setfontmass] = useState(18);
  const [question, setquestion] = useState('');
  const [answer, setanswer] = useState('');
  const [test, settest] = useState(null);
  const [go, setgo] = useState(false);
  const [optdeck, setdeck] = useState({
    allopt: Decks,
    curopt: 1,
  });
  const [Cardnew, setCardnew] = useState({
    question: '',
    answer: '',
    image: '',
    textsize: '',
    deck: '',
    format: '',
    level: 'Level_1',
    target: '',
  });
  const options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  function checkCard() {
    Cardnew.question = question;
    Cardnew.answer = answer;
    Cardnew.textsize = fontmass;
    Cardnew.format = format;
    Cardnew.deck = optdeck.curopt;
    Cardnew.level = 'Level_1'
    var today = new Date();
    console.log('today', today.getDate());
    var next = new Date();
    next.setDate(today.getDate() + 1);
    next.getDate();
    Cardnew.target = next;
    console.log(Cardnew);
    if (
      Cardnew.answer !== '' &&
      Cardnew.question !== '' &&
      Cardnew.question !== undefined &&
      Cardnew.answer !== undefined
    ) {
      saveCard(Cardnew);
      console.log('here');
      clear()
    } else {
      alert('Input Required');
      console.log(Cardnew);
    }
  }
  const selectImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      //console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        const path = response.uri.split('/');
        const fileName = path[path.length - 1];
        //let uri = "file://" + Platform.select({
        //android: RNFS.ExternalStorageDirectoryPath + "/Pictures/",
        //ios: RNFS.DocumentDirectoryPath + "/"
        //})
        // + "images/" + fileName
        //console.log('egeegegegr', uri)
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        setCardnew({
          image: {
            uri: source,
            filename: fileName,
          },
        });
      }
    });
  };
  const Womps = () => {
    try{
      if (Decks!=undefined&&Decks!=['space']) {
        return (
          <Picker
            style={styles.deckpicker}
            selectedValue={optdeck.curopt}
            onValueChange={(itemIndex, itemValue) => pickerChange(itemIndex)}>
            {
            Decks.map((v) => {
              if(v==='space'){
                v=null
              }
              return( 
              <Picker.Item label={v.deck} value={v.key} 

             />
              );
            })}
          </Picker>
        );
      } else {
        return null;
      }
    }catch(error){
      return null
    }
  };
  const saveCard = async () => {
    try {
      if (Cardnew === null || Cardnew === undefined) {
        console.log('Wrong oof');
      } else if (Card[0]=== 'space') {
        console.log('NewCard')
        Card.shift();
        Card.push(Cardnew)
        var saving = JSON.stringify(Card);
        await AsyncStorage.setItem('Cards', saving);
      } else{
        Card.push(Cardnew);
        var saving = JSON.stringify(Card);
        await AsyncStorage.setItem('Cards', saving);
      }
    } catch (error) {
      console.log('the error', error);
    }
    console.log(Card);
    interval()
  };
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
  function clear(){
    setquestion('')
    setanswer('')
  }
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
      setformat('bruh')
      setformat('flashcard')
    }
  }
  try {
    if (fontmass == 57) {
      setfontmass(fontmass - 1),
        Alert.alert('Reached Limit', 'Textsize cannot be increased further');
    } else if (fontmass == 11) {
      setfontmass(fontmass + 1);
      Alert.alert('Reached Limit', 'Text Size cannot be minimized further');
    }
  } catch (error) {}
  if(Decks!==['space']&&format==='flashcard') {
    return (
      <View style={styles.screen}>
        <Picker
          selectedValue={format}
          style={{
            width: 100,
            marginLeft: 150,
            marginTop: 2,
            width: 200,
            marginLeft: 10,
          }}
          onValueChange={(itemValue) => setformat(itemValue)}>
          <Picker.Item label="Flashcard" value="flashcard" />
          <Picker.Item label="Quiz" value="quiz" />
        </Picker>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 15,
            borderWidth: 1,
            borderTopColor: 'black',
          }}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.changingfont}>
              <Text> Fontsize:{fontmass}</Text>
              <AweIcon
                name="plus"
                size={25}
                onPress={() => setfontmass(fontmass + 1)}
              />
              <AweIcon
                name="minus"
                size={25}
                onPress={() => setfontmass(fontmass - 1)}
              />
            </TouchableOpacity>
            <Womps/>
          </View>
          <TouchableOpacity
            style={styles.imageselecter}
            onPress={() => selectImage()}>
            <Text style={{color: 'white'}}> Select Image</Text>
            <AweIcon name="camera-retro" size={20} />
          </TouchableOpacity>
          <View style={styles.enterting}>
            <TextInput
              style={styles.input}
              style={{fontSize: fontmass}}
              placeholder="Enter Question"
              multiline
              onChangeText={(text) => setquestion(text)}
            />
            <TextInput
              style={styles.input}
              style={{fontSize: fontmass}}
              placeholder="Enter Answer"
              multiline
              onChangeText={(text) => setanswer(text)}
            />
            <TouchableOpacity
              style={styles.enterbtn}
              onPress={() => checkCard()}
              >
              <Text style={{color: 'white'}}>Save</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{flexDirection:'row-reverse',position:'absolute',right:30,bottom:30}} 
          onPress={()=>interval()}
          >
            <Icon name='refresh' size={20}/>
          </TouchableOpacity>
        </ScrollView>
      </View>
  )
  } else if (Decks !== ['space']) {
    return (
      <View style={styles.screen}>
        <Picker
          selectedValue={format}
          style={{width: 100, marginLeft: 150, marginTop: 2}}
          onValueChange={(itemValue) => setformat(itemValue)}>
          <Picker.Item label="Flashcard" value="flashcard" />
          <Picker.Item label="Quiz" value="quiz" />
        </Picker>
        <ScrollView></ScrollView>
      </View>
    );
  }else {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#E0E0DA',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 40,
            color: 'black',
            position: 'absolute',
            top: 10,
            left: 20,
          }}>
          You Should Add Decks First...
        </Text>
        <Text>Open Today's Cards</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100
  },
  deckpicker: {
    width: 200,
    height: 120,
    position: 'absolute',
    right: 0,
  },
  imageselecter: {
    backgroundColor: '#ADAD66',
    padding: 15,
    width: 150,
    borderBottomRightRadius: 20,
  },
  enterting: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    marginVertical: 50,
    borderRadius: 18,
    backgroundColor: '#ADAD66',
    padding: 20,
    paddingHorizontal: 50,
  },
  moji: {
    color: '#FFF',
    fontSize: 20,
  },
  screen: {
    flex: 1,
    backgroundColor: '#E0E0DA',
  },
  clicker: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    width: 100,
  },
  picker: {
    backgroundColor: '#E0E0DA',
  },
  input: {
    flex: 1,
    borderRadius: 15,
    borderWidth: 10,
    borderColor: 'black',
    width: 200,
  },
  flashycard: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 3,
  },
  changingfont: {
    paddingBottom: 30,
    marginLeft: 5,
    paddingVertical: 10,
  },
  scrollingscr: {
    flex: 3,
    borderColor: 'black',
    borderWidth: 5,
  },
  mainscreen: {
    backgroundColor: '#E0E0DA',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  enterbtn: {
    borderRadius: 18,
    backgroundColor: '#ADAD66',
    padding: 20,
    paddingHorizontal: 50,
  },
});

export default Adding_Cards;
