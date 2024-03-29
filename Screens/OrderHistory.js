import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Pressable } from 'react-native';
import { getOrders } from '../BackendAPI/Read_Write_UserOrders';
import Ionicon from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';

const OrderHistory = (props) => {
    
    const [userOrders, setUserOrders] = useState([]);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [restaurantName, setRestaurantName] = useState('');
    const [pickupLocation, setPickupLocation] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    
    const navigation = useNavigation();

    //getting the recent orders whenever this page appears or "focuses"
    useFocusEffect(
        useCallback(() => {

            getOrders(auth.currentUser.uid)
            .then(result => {setUserOrders(result)});
            
            AsyncStorage.getItem('lat')
                .then(function (value){
                    const val = JSON.parse(value);
                    setLatitude(val);
                });
            
            AsyncStorage.getItem('lng')
            .then(function (value){
                const val = JSON.parse(value);
                setLongitude(val);
            });
            
            AsyncStorage.getItem('totalPrice')
                .then(function (value){
                    const val = JSON.parse(value);
                    setTotalPrice(val);
                });
            
            AsyncStorage.getItem('restaurantName')
            .then(function (value){
                setRestaurantName(value);
            });
            
            AsyncStorage.getItem('pickupLocation')
            .then(function (value){
                setPickupLocation(value);
            });

            return () => {console.log("Unfocused here.")};
            },[])
    );

    

    const RenderOrders = ({RestaurantName, OrderDate, OrderItems, TotalCost, Progress}) => {

        return(
            <View>
                <View style = {styles.orderContainer}> 
    
                    <View style={styles.titleContainer}> 
                        <Text style={styles.RestaurantTitle}>
                            {RestaurantName}
                        </Text>
                        <Ionicon name = "arrow-forward-circle" size={20} style={{alignSelf:'center', color:'#894AFF'}} onPress={() => {
                            navigation.navigate('Delivery', { cost: totalPrice, location: pickupLocation, name: restaurantName, lat: latitude, lng: longitude});

                        }}/>
                    </View>
                    
                    <View style={styles.orderDetailsContainer}> 
    
                        <Text style={styles.orderDetailsFont}>
                            {OrderDate} 
                        </Text>
    
                        <View  
                            style={styles.dotSeparator}
                        />
    
                        <Text style={styles.orderDetailsFont}>${TotalCost}</Text>
    
                        <View  
                            style={styles.dotSeparator}
                        />
    
                        <Text style={styles.orderDetailsFont}>
                             {OrderItems.length} items
                        </Text>

                        <View
                            style={styles.dotSeparator}
                        />

                        <Text style={styles.orderDetailsFont}>
                             {Progress}
                        </Text>

                    </View>
    
                     {
                        OrderItems.map((item) => {
                            return <Text style={styles.itemOrderContainer}>{item}</Text>
                        })
                    } 
                    
                </View>
    
                <View style={styles.listSeparator}/>
            </View>
    
    
        )
    }
    

    return (
        <SafeAreaView style = {styles.container}> 
                <FlatList
                    data={userOrders}
                    renderItem={({item}) => <RenderOrders RestaurantName={item["Restaurant"]} OrderDate={item["Order_Date"].toDate().toDateString()} OrderItems={item["Orders"]} TotalCost={item["Total_Price"]} Progress={item["orderCompleted"]}/> }
                    keyExtractor={item => item["id"]}
                />
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor:'white',
        width: "100%"
    },

    RestaurantTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5
    },
    orderContainer: {
        marginLeft: 10,
        marginTop: 10,
        marginRight: 10,
        
    },
    titleContainer: {
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:'#CED0CE',
        marginBottom:5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    orderDetailsContainer: {
        flexDirection: 'row',
        marginBottom:5
    },
    orderDetailsFont:{
        fontSize:11,
    },

    viewReceiptButtonContainer:{
        height:20,
        width:100,
        backgroundColor:'lightgrey',
        borderRadius:10,
        justifyContent:'center',
    },

    reOrderButtonContainer:{
        height:20,
        width:100,
        backgroundColor:'lightgrey',
        borderRadius:10,
        justifyContent:'center',
        marginLeft:10
    },
    dotSeparator:{
        borderWith: StyleSheet.hairlineWidth,
        width:3,
        height:3,
        borderRadius:1.5,
        backgroundColor:'black',
        alignSelf:'center',
        marginLeft:5,
        marginRight:5
    },
    listSeparator: {
        borderBottomWidth:10,
        borderBottomColor:'#DCDCDC'
    },
    itemOrderContainer: {
        marginBottom: 10,
    },
    textContainer:{
        width:'100%',
        alignItems:'center'
    },

    buttonText:{
        fontWeight:'bold',
        fontSize:12
    }
})


export default OrderHistory;