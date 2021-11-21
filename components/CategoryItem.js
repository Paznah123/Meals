import React from 'react';
import { View, Text, TouchableOpacity, Image, TouchableNativeFeedback, StyleSheet, Platform } from 'react-native';

import Colors from '../consts/Colors';

const CategoryItem = props => {
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) 
        TouchableCmp = TouchableNativeFeedback;

    return (
        <View style={styles.gridItem} >
            <TouchableCmp 
                style={{ flex: 1 }}
                onPress={props.onSelect}>
                <View style={{ ...styles.container }}>
                    <Image source={{ uri: props.imageUrl }} style={styles.bgImage}/>
                    <Text style={styles.title} numberOfLines={2}>{props.title}</Text>
                </View>
            </TouchableCmp>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 10,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 15, 
        textAlign: 'right',
    },
    gridItem: {
        flex: 1,
        margin: 5,
        height: 150,  
        borderRadius: 10,
        overflow: Platform.OS === 'android' && Platform.Version >= 21 
            ? 'hidden': 'visible',    
    },
    bgImage: {
        width: '100%',
        height: '95%',
        margin: 5,
        justifyContent: 'center',
        borderRadius: 10,
        overflow: 'hidden',
    },
});

export default CategoryItem;