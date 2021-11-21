import React, { useEffect, useMemo } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { toggleFavorite } from '../store/actions/meals';

import Colors from '../consts/Colors';

const ListItem = props => {
    return (
        <View style={styles.listItem}>
           <DefaultText>{props.children}</DefaultText> 
        </View>
    );
};

const MealDetailsScreen = props => {

    const mealId = props.navigation.getParam('mealId');

    const availableMeals = useSelector(state =>  state.meals.filteredMeals);
    const isFavMeal = useSelector(state =>  state.meals.favoriteMeals.some(meal => meal.id === mealId));

    const selectedMeal = availableMeals.find(meal => meal.id === mealId);

    const dispatch = useDispatch();
    
    const toggleFavHandler = useMemo(() => {
        dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId]);

    useEffect(() => {
        props.navigation.setParams({ toggleFav: toggleFavHandler });   
    }, [toggleFavHandler]);
    
    useEffect(() => {
        props.navigation.setParams({ isFav: isFavMeal }); 
    }, [isFavMeal]);

    return (
        <ScrollView>
            <Image 
                source={{uri: selectedMeal.imageUrl}}
                style={styles.image}
            />
            <View style={styles.details}>
                <DefaultText>{selectedMeal.duration} min</DefaultText>
                <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            { selectedMeal.ingredients.map((ingredient, index) => (
                 <ListItem key={index}>{ingredient}</ListItem> 
            ))}
            <Text style={styles.title}>Steps</Text>
            { selectedMeal.steps.map((step, index) => (
                 <ListItem key={index}>{index+1}. {step}</ListItem> 
            ))}        
        </ScrollView>
    );
};

MealDetailsScreen.navigationOptions = navigationData => {
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFavorite = navigationData.navigation.getParam('toggleFav');
    const isFavorite = navigationData.navigation.getParam('isFav');

    return {
        headerTitle: mealTitle,
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
                title='Favorite'
                iconName={isFavorite ? 'ios-star-outline' : 'ios-star' }
                onPress={toggleFavorite}
            />
        </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center',
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: Colors.secondary,
        borderWidth: 1,
        padding: 10,
    }
});

export default MealDetailsScreen;
