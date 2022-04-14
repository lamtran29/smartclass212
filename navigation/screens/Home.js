import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from '../../components/Header'
import SwitchButton from '../../components/Switch'
import FanButton from '../../components/Fan'
import axios from 'axios';

let ledroom, ledhallway, door, light, humi, temp, fanstate;

async function lastValueLedroom(){
    const data = await axios.get('https://io.adafruit.com/api/v2/phongnguyen2001/feeds/ledroom/data');
    if(data.data[0].value == 1) ledroom = true;
    else ledroom = false;
    console.log()
}
async function lastValueLedHallway(){
    const data = await axios.get('https://io.adafruit.com/api/v2/phongnguyen2001/feeds/ledoutdoor/data');
    if(data.data[0].value == 3) ledhallway = true;
    else ledhallway = false;
}
async function lastValueDoor(){
    const data = await axios.get('https://io.adafruit.com/api/v2/phongnguyen2001/feeds/door/data');
    if(data.data[0].value == 5) door = true;
}
async function lightsensor(){
    const data = await axios.get('https://io.adafruit.com/api/v2/phongnguyen2001/feeds/light-sensor/data');
    light = data.data[0].value;
}
async function temperaturesensor(){
    const data = await axios.get('https://io.adafruit.com/api/v2/phongnguyen2001/feeds/temp-sensor/data');
    temp = data.data[0].value;
    console.log(temp);
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

export default function Home() {
    return (
        <View style={styles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior='automatic'
                showsVerticalScrollIndicator={false}
            >
                <Header />
                {/* <View style={styles.background}> */}
                <View>
                    {/* SENSOR */}
                    <View style={[styles.headerWrapper, {paddingTop: 20}]}>
            
                        <View style={[styles.sensor, {borderTopLeftRadius: 20}]}> 
                            <SafeAreaView style={{alignItems: 'center', justifyContent: 'center', paddingTop: 10}}>
                                <Text style={styles.sensorData}>
                                    <Ionicons name='thunderstorm' style={styles.sensorData}/> {temp} °C
                                </Text>
                                <Text style={{color: 'white'}}>
                                    Temperature
                                </Text>
                            </SafeAreaView>
                        </View>
                        
                        <View style={[styles.sensor, {borderTopRightRadius: 20}]}> 
                            <SafeAreaView style={{alignItems: 'center', justifyContent: 'center', paddingTop: 10}}>
                                <Text style={styles.sensorData}>
                                    <Ionicons name='sunny' style={styles.sensorData}/> {light} cd
                                </Text>
                                <Text style={{color: 'white'}}>
                                    Light intensity
                                </Text>
                            </SafeAreaView>
                        </View>
                        
                    </View>
                    
                    <View style={styles.headerWrapper}>
                    
                        <View style={[styles.sensor, {borderBottomLeftRadius: 20}]}> 
                            <SafeAreaView style={{alignItems: 'center', justifyContent: 'center', paddingTop: 10}}>
                                <Text style={styles.sensorData}>
                                    <Ionicons name='water' style={styles.sensorData}/> 60 % 
                                </Text>
                                <Text style={{color: 'white'}}>
                                    Humidity
                                </Text>
                            </SafeAreaView>
                        </View>
                        
                        <View style={[styles.sensor, {borderBottomRightRadius: 20}]}> 
                            <SafeAreaView style={{alignItems: 'center', justifyContent: 'center', paddingTop: 10}}>
                                <Text style={styles.sensorData}>
                                    <Ionicons name='bulb' style={styles.sensorData}/> 3
                                </Text>
                                <Text style={{color: 'white'}}>
                                    Devices on
                                </Text>
                            </SafeAreaView>
                        </View>
                        
                    </View>

                    {/* DEVICES ON */}
                    <View>
                        <Text style={[styles.title, {paddingHorizontal: 24, paddingTop: 24}]}>
                            Devices on
                        </Text>
                        <SwitchButton switchName={'Door'} time={'3 hours'}  state={door} />
                        <SwitchButton switchName={'ClassroomLight'} time={'3 hours'} state={ledroom}/>            
                        {/* <FanButton />            */}
                        
                    </View>
                </View>
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
        height: 74,
        margin: 0.5,
    },

    sensorData: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold'
    }

});