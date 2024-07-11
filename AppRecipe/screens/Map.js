import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';

const GoogleMap = ({route}) => {
  const goals = [
    {
      coordinate: {
        latitude: 50.06168172160315,
        longitude: 19.937695978252187,
      },
      title: 'Kraków - Sukiennice',
      description: 'Wykonaj 10 pompek',
    },
    {
      coordinate: {
        latitude: 50.01574057469849,
        longitude: 20.99054679957058,
      },
      title: 'Tarnów - Akademia Tarnowska',
      description: 'Wykonaj 10 brzuszków',
    },
    {
      coordinate: {
        latitude: 52.22540737595341,
        longitude: 21.027918127145853,
      },
      title: 'Warszawa - Plac Sejmowy',
      description: 'Wykonaj 10 pompek',
    },
    {
      coordinate: {
        latitude: 51.0946608668652,
        longitude: 17.01922944761045,
      },
      title: 'Wrocław - Sky Tower',
      description: 'Wykonaj deskę 3 minuty',
    },
    {
      coordinate: {
        latitude: 54.446655624050685,
        longitude: 18.572079573044984,
      },
      title: 'Sopot - Molo',
      description: 'Wykonaj bieg w miejcu 5 minut',
    },
    {
      coordinate: {
        latitude: 53.76298571619332,
        longitude: 21.743275458687492,
      },
      title: 'Jezioro Śniardwy',
      description: 'Wykonaj 10 wyskoków w góre',
    },
    {
      coordinate: {
        latitude: 49.30790191190226,
        longitude: 19.937103094633454,
      },
      title: 'Zakopane - Gubałówka',
      description: 'Wykoanj rowerek 3 minuty',
    },
    {
      coordinate: {
        latitude: 22.4545431616412,
        longitude: 49.39507639807797,
      },
      title: 'Solina - Zapora Solińska',
      description: 'Wykonaj nożyce 4 minuty',
    },
    {
      coordinate: {
        latitude: 52.42287808291778,
        longitude: 16.935314235425256,
      },
      title: 'Poznań - Park Cytadela',
      description: 'Wykonaj wykroki w miejscu 30 razy',
    },
  ];
  const navigation = useNavigation();
  const [markers, setMarkers] = useState(goals);

  const [selectedRegion, setSelectedRegion] = useState({
    latitude: 50.01574057469849,
    longitude: 20.99054679957058,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [zoom, setZoom] = useState(14);

  const mapRef = useRef(null);
  const MAX_ZOOM_LEVEL = 20;
  const MIN_ZOOM_LEVEL = 3;
  const handleZoom = (isZoomIn = false) => {
    let currentZoomLevel = zoom;
    // if zoomlevel set to max value and user click on minus icon, first decrement the level before checking threshold value
    if (!isZoomIn && currentZoomLevel === MAX_ZOOM_LEVEL) {
      currentZoomLevel -= 1;
    }
    // if zoomlevel set to min value and user click on plus icon, first increment the level before checking threshold value
    else if (isZoomIn && currentZoomLevel === MIN_ZOOM_LEVEL) {
      currentZoomLevel += 1;
    }
    if (
      currentZoomLevel >= MAX_ZOOM_LEVEL ||
      currentZoomLevel <= MIN_ZOOM_LEVEL
    ) {
      return;
    }

    currentZoomLevel = isZoomIn ? currentZoomLevel + 1 : currentZoomLevel - 1;
    const zoomedInRegion = {
      ...selectedRegion,
      latitudeDelta: getLatLongDelta(
        currentZoomLevel,
        selectedRegion.latitude,
      )[1],
      longitudeDelta: getLatLongDelta(
        currentZoomLevel,
        selectedRegion.latitude,
      )[0],
    };

    setSelectedRegion(zoomedInRegion);
    setZoom(currentZoomLevel);
    mapRef?.current?.animateToRegion(zoomedInRegion, 100);
  };

  const sendData = () => {
    axios
      .post('http://10.0.2.2:3000/api/bmi/create', {
        weight,
        height,
        bmi,
        activityMode,
        sex: gender,
        userId,
      })
      .then(async user => {
        console.log(user.data.token);
        navigation.navigate('Login');
      })
      .catch(e => console.log(e));
  };

  function deleteEvent(index) {
    setTimeout(() => {
      console.log('Klik');
      console.log(index);
      setMarkers(goals.filter((_, index1) => index1 !== index));
      console.log(markers);
    }, 10000);
  }
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={selectedRegion}
        onRegionChangeComplete={region => {
          setSelectedRegion(region);
        }}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            onPress={event => deleteEvent(index)}
            onLong
          />
        ))}
      </MapView>
      <View>
        <TouchableOpacity
          onPress={() => handleZoom(true)}
          disabled={zoom === MAX_ZOOM_LEVEL}></TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleZoom()}
          disabled={zoom === MIN_ZOOM_LEVEL}></TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default GoogleMap;
