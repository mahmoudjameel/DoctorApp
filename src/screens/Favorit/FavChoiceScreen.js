import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  ActivityIndicator
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Container,List, Header, Tab,Tabs, TabHeading,Footer, FooterTab, Content, Button, ListItem, Icon, Left, Body, Right, Switch,Title,Item,Input} from 'native-base';
import { PRODUCT_CATEGORIES ,DISEASE_CATEGORIES,PERIODS } from '../../data/dummy-data';
import ProductCategoryGridTile from '../../components/ProductCategoryGridTile';
import DiseaseCategoryGridTile from '../../components/DiseaseCategoryGridTile';
import PeriodGridTile from '../../components/PeriodGridTile';
import TabTitle from '../../components/TabTitle';
import * as choicesAction from '../../store/actions/choices'
import { CHOICES } from '../../store/constants';


const FavChoiceScreen = props => {
    const periodId = props.navigation.getParam('periodId');
  const dispatch = useDispatch();

  const loadChoices = useCallback(async () =>{
      await dispatch(choicesAction.fetchChoices());
  }, [dispatch]);
  useEffect(() => {
    loadChoices()
  },[dispatch,loadChoices]);

  const choices_list = useSelector(state=>state.choices.choices);

  const renderChoicesGridItem = itemData =>{
    return (
      <PeriodGridTile
        title={itemData.item.name}
        onSelect={() => {
          props.navigation.navigate({
            routeName: 'FavProducts',
            params: {
              choiceId: itemData.item.id,
              periodId:periodId,
              title:itemData.item.name
            }
          });
        }}
      />
    );
  };
  
  return (
    
    <Container>
      {choices_list == null ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3F51B5" />
      </View>:
      <FlatList
          keyExtractor={(item, index) => item.id.toString()}
          data={choices_list}
          renderItem={renderChoicesGridItem}
          numColumns={2}
        />
        }
    </Container>
  );
};

FavChoiceScreen.navigationOptions = navigationData => {
    return {
      headerTitle: navigationData.navigation.getParam('title')
    };
  };

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default FavChoiceScreen;

