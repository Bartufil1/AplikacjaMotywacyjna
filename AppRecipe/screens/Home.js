import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {CategoryCard, TrendingCard} from '../components';
import {useNavigation} from '@react-navigation/native';

import {SIZES, FONTS, COLORS} from '../screens/constants';
import axios from 'axios';
import {useState, useEffect} from 'react';
import AutocompleteInput from 'react-native-autocomplete-input';
import {ImageBackground} from 'react-native';
import {useRoute} from '@react-navigation/native';

const Home = () => {
  const [query, setQuery] = useState('');
  const route = useRoute();

  const [data, setData] = useState([]);
  const getData = () => {
    console.log(query);
    axios.get('http://10.0.2.2:3000/api/recipe/getAll').then(response => {
      setData(response.data);
      console.log(response.data);
    });
  };
  useEffect(() => {
    getData();
    getData2();
    setReady(true);
  }, []);

  const [data2, setData2] = useState([]);
  const getData2 = () => {
    axios.get('http://10.0.2.2:3000/api/recipe/getAll').then(response => {
      setData2(response.data);
      console.log(response.data);
    });
  };
  const [isReady, setReady] = useState(false);

  const getData3 = query => {
    console.log('c', query);
    axios.get(`http://10.0.2.2:3000/api/recipe/getAll`).then(response => {
      setData3(
        response.data.filter(recipe =>
          recipe.title.toLowerCase().startsWith(query.toLowerCase()),
        ),
      );
      console.log('dane', setData3);
    });
  };
  const [data3, setData3] = useState([]);

  const navigation = useNavigation();

  function renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Trening')}>
          <Image
            source={require('./image/gymwindow.png')}
            style={styles.headerImage}
          />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerQuestionText}>CO DZIŚ UGOTUJESZ ?</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Map')}>
          <Image
            source={require('./image/award.png')}
            style={styles.headerImage}
          />
        </TouchableOpacity>
      </View>
    );
  }
  function renderSearchBar() {
    return (
      <View style={styles.searchContainer}>
        <AutocompleteInput
          data={data3}
          value={query}
          onChangeText={text => {
            setQuery(text);
            getData3(text);
          }}
          flatListProps={{
            keyExtractor: (_, idx) => idx.toString(),
            renderItem: ({item}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Recipe', {id: item.id});
                }}
                style={styles.autocompleteItem}>
                <Text style={styles.autocompleteItemText}>{item.title}</Text>
              </TouchableOpacity>
            ),
          }}
          inputContainerStyle={[
            styles.inputContainer,
            {backgroundColor: 'orange'},
          ]}
          inputStyle={[styles.inputText, {fontSize: 14}]}
        />
      </View>
      /*
        <Text
            style={{
              marginTop: 5,
              color: "white",
              textAlign: "center",
              fontSize: 10,
            }}
          >
            Tu będzie wyszukiwarka
          </Text>
          */
    );
  }
  function renderSeeRecipeCard() {
    return (
      <View style={styles.seeRecipeContainer}>
        <View style={styles.seeRecipeImageContainer}>
          <Image style={styles.seeRecipeImage} />
        </View>
      </View>
    );
  }
  function renderTrendingSection() {
    return (
      <View style={styles.trendingSectionContainer}>
        <Text style={styles.trendingSectionTitle}>Top Przepisy na dziś</Text>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          renderItem={({item, index}) => {
            return (
              <TrendingCard
                key={index}
                recipeItem={item}
                containerStyle={[
                  styles.trendingCardContainer,
                  {marginLeft: index === 0 ? SIZES.padding : 0},
                ]}
                onPress={() => navigation.navigate('Recipe', {id: item.id})}
              />
            );
          }}
        />
      </View>
    );
  }

  function renderCategoryHeader() {
    return (
      <View style={styles.categoryHeaderContainer}>
        <Text style={styles.categoryHeaderText}>Kategorie</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>Pozostałe</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data2}
        keyExtractor={item => item.id.toString()}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {isReady && (
              <>
                {renderHeader()}
                {renderSearchBar()}
                {renderSeeRecipeCard()}
                {renderTrendingSection()}
                {renderCategoryHeader()}
              </>
            )}
          </View>
        }
        renderItem={({item}) => {
          return (
            <CategoryCard
              categoryItem={item}
              containerStyle={styles.categoryCardContainer}
              onPress={() => navigation.navigate('Recipe', {id: item.id})}
            />
          );
        }}
        ListFooterComponent={<View style={styles.footer} />}
      />
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    marginHorizontal: SIZES.padding,
    alignItems: 'center',
    height: 100,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerGreetingText: {
    color: 'orange',
    textAlign: 'center',
    fontSize: 24,
  },
  headerQuestionText: {
    marginTop: 5,
    color: 'gray',
    textAlign: 'center',
    fontSize: 18,
  },
  headerImage: {
    width: 65,
    height: 65,
    marginRight: 10,
  },
  seeRecipeContainer: {
    flexDirection: 'row',
    marginTop: SIZES.padding,
    marginHorizontal: SIZES.padding,
    borderRadius: 10,
    backgroundColor: 'lightGreen',
  },
  seeRecipeImageContainer: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seeRecipeImage: {
    // specify image styles here
  },
  trendingSectionContainer: {
    marginTop: 10,
  },
  trendingSectionTitle: {
    marginHorizontal: SIZES.padding,
    textAlign: 'center',
    fontSize: 20,
    color: 'orange',
  },
  trendingCardContainer: {
    marginLeft: SIZES.padding,
  },
  categoryHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: SIZES.padding,
  },
  categoryHeaderText: {
    flex: 1,
  },
  viewAllText: {
    color: 'orange',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  categoryHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: SIZES.padding,
  },
  categoryHeaderText: {
    flex: 1,
    ...FONTS.h2,
  },
  categoryHeaderLink: {
    color: COLORS.gray,
    ...FONTS.body3,
  },
  categoryCardContainer: {
    marginHorizontal: SIZES.padding,
  },
  footer: {
    marginBottom: 100,
  },
  searchContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: '#fff',
    width: 380,
  },
  inputText: {
    fontSize: 14,
  },
  autocompleteItem: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  autocompleteItemText: {
    fontSize: 14,
  },
});
