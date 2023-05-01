import { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View, Text, Modal } from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import { getNearbyRegion, fetchMapsKey } from '../BackendAPI/Geocode';
import MapViewDirections from 'react-native-maps-directions'
import { useFocusEffect } from '@react-navigation/native';
import { googleKey } from '../App';



const Maps = () => {

    // const [longitude, setLongitude] = useState(0);
    // const [latitude, setLatitude] = useState(0);

    // const region = () => {

    //     getNearbyRegion().then((res) => {
    //         setLatitude(res.lat);
    //         setLongitude(res.lng);
    //     })
    //     return {
    //         latitude: latitude,
    //         longitude:longitude,
    //         latitudeDelta: .009,
    //         longitudeDelta: .009
    //     };
    // };

    const origin = { latitude: 33.879799, longitude: -117.885231};
    const destination = { latitude: 33.8120918, longitude: -117.9189742};
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>

            <MapView style={styles.map}
               region={{latitude:33.879799, longitude: -117.885231, latitudeDelta: .009,longitudeDelta: .009}}
               onPress={() => {setModalVisible(true)}}>

                <Marker
                    coordinate={{
                        latitude: 33.879799,
                        longitude: -117.885231,
                    }}
                />

                <Marker
                    coordinate={{
                        latitude: 33.8120918,
                        longitude: -117.9189742,
                    }}
                />
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    strokeWidth={3}
                    apikey={googleKey}
                />

            </MapView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <Pressable onPress={() => setModalVisible(true)} style={{height:50, width: '60%', backgroundColor: '#894AFF', position:'absolute', justifyContent:'center', alignItems:'center', alignSelf:'center', bottom:0, marginBottom: 10, borderWidth: 1, borderRadius: 8 }}>
                    <Text style={{color:'white'}}>View Order Details</Text>
            </Pressable>
            
               
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    map: {
        width: '100%',
        height: '100%',
    },

    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
    },
    
    buttonClose: {
        backgroundColor: '#2196F3',
    },

    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },

    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        height: 200,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        justifyContent:'center',
      },
      
});

export default Maps;