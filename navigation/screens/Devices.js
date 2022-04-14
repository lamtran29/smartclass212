import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from '../../components/Header'
import SwitchButton from '../../components/Switch'
import FanButton from '../../components/Fan'
import axios from 'axios';

let ledroom, ledhallway, door, light, humi, temp, fanstate;
var ledroomtime, ledhallwaytime, doortime;

async function lastValueLedroom(){
    const data = await axios.get('https://io.adafruit.com/api/v2/phongnguyen2001/feeds/ledroom/data');
    // ledroomtime = data.data[0].created_at - data.data[1].created_at;
    // console.log(ledroomtime);
    if(data.data[0].value == 1) ledroom = true;
    else ledroom = false;
}
async function lastValueLedHallway(){
    const data = await axios.get('https://io.adafruit.com/api/v2/phongnguyen2001/feeds/ledoutdoor/data');
    if(data.data[0].value == 3) ledhallway = true;
    else ledhallway = false;
}
async function lastValueDoor(){
    const data = await axios.get('https://io.adafruit.com/api/v2/phongnguyen2001/feeds/door/data');
    if(data.data[0].value == 5) door = true;
    else door = false;
}
async function lightsensor(){
    const data = await axios.get('https://io.adafruit.com/api/v2/phongnguyen2001/feeds/light-sensor/data');
    light = data.data[0].value;
}
async function temperaturesensor(){
    const data = await axios.get('https://io.adafruit.com/api/v2/phongnguyen2001/feeds/temp-sensor/data');
    temp = data.data[0].value;
}
async function lastfanvalue(){
    const data = await axios.get('https://io.adafruit.com/api/v2/phongnguyen2001/feeds/fan/data');
    fanstate = data.data[0].value; 
}
lastfanvalue();
lastValueDoor();
lastValueLedHallway();
lastValueLedroom();
lightsensor();
temperaturesensor();
export default function Devices({ navigation }) {
    return (
        <View style={styles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior='automatic'
                showsVerticalScrollIndicator={false}
            >
            {/* HEADER */}
            <Header />
            {/* <View style={styles.background}> */}
            <View>
                <View style={[styles.headerWrapper, {paddingTop: 20}]}>
        
                    <View style={[styles.sensor, {borderTopLeftRadius: 10, borderBottomLeftRadius: 10}]}> 
                        <SafeAreaView style={{alignItems: 'center', justifyContent: 'center', paddingTop: 10}}>
                            <Text style={styles.sensorData}>
                                <Ionicons name='thunderstorm' style={styles.sensorData}/> {temp} °C
                            </Text>
                            <Text style={{color: 'white'}}>
                                Temperature
                            </Text>
                        </SafeAreaView>
                    </View>
                    
                    <View style={[styles.sensor, {}]}> 
                        <SafeAreaView style={{alignItems: 'center', justifyContent: 'center', paddingTop: 10}}>
                            <Text style={styles.sensorData}>
                                <Ionicons name='sunny' style={styles.sensorData}/> {light} cd
                            </Text>
                            <Text style={{color: 'white'}}>
                                Light intensity
                            </Text>
                        </SafeAreaView>
                    </View>
                    
                    <View style={[styles.sensor, {borderBottomRightRadius: 10, borderTopRightRadius: 10,}]}> 
                        <SafeAreaView style={{alignItems: 'center', justifyContent: 'center', paddingTop: 10}}>
                            <Text style={styles.sensorData}>
                                <Ionicons name='water' style={styles.sensorData}/> 60 % 
                            </Text>
                            <Text style={{color: 'white'}}>
                                Humidity
                            </Text>
                        </SafeAreaView>
                    </View>
                </View>
                

                {/* DEVICES ON */}
                <View>
                    <Text style={[styles.title, {paddingHorizontal: 24, paddingTop: 24}]}>
                        All Devices
                    </Text>
                    <SwitchButton switchName={'Door'} time={'3 hours'}  state={door}/>           
                    <SwitchButton switchName={'Classroom Light'} time={'3 hours'} state={ledroom}/>           
                    <SwitchButton switchName={'Hallway Light'} time={'5 hours'} state={ledhallway}/>           
                    <FanButton state={fanstate}/>           
                    
                </View>
                
            </View>
            {/* SENSOR */}

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white', 
        paddingTop: 12, 
        borderTopLeftRadius: 30, 
        borderTopRightRadius: 30, 
        height: '100%'
    },

    container: {
        flex: 1,
    },

    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
    },

    profileImage: {
        width: 54,
        height: 54,
        borderRadius: 54,
    },

    title: {
        fontSize: 20, 
        fontWeight: 'bold'
    },

    // Sensor
    sensor: {
        flex: 1, 
        backgroundColor: "#75A7F7", 
        height: 77,
    },

    sensorData: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold'
    }

});