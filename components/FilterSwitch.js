import React, { useState } from 'react';
import { Text, View, Switch, StyleSheet } from 'react-native';

import Colors from '../consts/Colors';

const FilterSwitch = props => {

    return (
        <View style={styles.container}>
                <Text>{props.label}</Text>
                <Switch 
                    trackColor={{ true: Colors.primary }}
                    thumbColor={Colors.accent}
                    value={props.state} 
                    onValueChange={props.onChange}
                />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15,
    },
});

export default FilterSwitch;