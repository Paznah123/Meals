import React from 'react';
import { View, Text, TouchableOpacity, TouchableNativeFeedback, StyleSheet, Platform } from 'react-native';

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
                <View style={{ ...styles.container, ...{ backgroundColor: Colors.accent}}}>
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
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        padding: 15,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20, 
        textAlign: 'right',
    },
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,  
        borderRadius: 10,
        overflow: Platform.OS === 'android' && Platform.Version >= 21 
            ? 'hidden': 'visible',    
        elevation: 4,  
    },
});

export default CategoryItem;