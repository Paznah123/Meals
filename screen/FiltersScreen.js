import React , { useState, useEffect, useMemo }from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import FilterSwitch from '../components/FilterSwitch';
import { setFilters } from '../store/actions/meals';

const FiltersScreen = props => {

    const { navigation } = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);
    const [isVegan, setIsVegan] = useState(false);

    const dispatch = useDispatch();

    const saveFilters = useMemo(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegetarian: isVegetarian,
            vegan: isVegan
        };

        dispatch(setFilters(appliedFilters));
    }, [isGlutenFree, isLactoseFree, isVegetarian, isVegan] );

    useEffect(() => {
        navigation.setParams({ save: saveFilters });
    }, [saveFilters] );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Available Filters</Text>
            <FilterSwitch 
                label='Gluten-free'
                state={isGlutenFree}
                onChange={newVal => setIsGlutenFree(newVal)}
            />    
            <FilterSwitch 
                label='Lactose-free'
                state={isLactoseFree}
                onChange={newVal => setIsLactoseFree(newVal)}
            />    
            <FilterSwitch 
                label='Vegetarian'
                state={isVegetarian}
                onChange={newVal => setIsVegetarian(newVal)}
            />    
            <FilterSwitch 
                label='Vegan'
                state={isVegan}
                onChange={newVal => setIsVegan(newVal)}
            />    
        </View>
    )
}

FiltersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title='menu' 
                    iconName='ios-menu'
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title='Save' 
                    iconName='ios-save'
                    onPress={ navData.navigation.getParam('save') }
                />
            </HeaderButtons>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        margin: 20,
        textAlign: 'center',
    },
});

export default FiltersScreen;
