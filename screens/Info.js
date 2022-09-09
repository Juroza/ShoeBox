import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';


const Info = () => {
    return (
        <View style={styles.screen}>
            <Text>
                Info
            </Text>
        </View>
    )
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
        alignItems: 'center',
        backgroundColor: '#E0E0DA',

    }

})
export default Info;