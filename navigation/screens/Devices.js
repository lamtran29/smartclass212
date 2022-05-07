import React, { useState, useEffect, useRef  } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from '../../components/Header'
import SwitchButton from '../../components/Switch'
import FanButton from '../../components/Fan'
import axios from 'axios';

let ledroom, ledhallway, door, light, humi, temp, fanstate;
var ledroomtime, ledhallwaytime, doortime, fantime;
var ledroomday, ledroomhour, ledroomminute;
var ledhallwayday, ledhallwayhour, ledhallwayminute;
var doortimeday, doortimehour, doortimeminute;
var fanday, fanhour, fanminute;
var ledresult = "";
var ledhallwayresult = "";
var doorresult = "";
var fanresult = "";

const url_ledroom = 'https://io.adafruit.com/api/v2/phongnguyen2001/feeds/ledroom/data';
const url_ledoutdoor = 'https://io.adafruit.com/api/v2/phongnguyen2001/feeds/ledoutdoor/data';
const url_door = 'https://io.adafruit.com/api/v2/phongnguyen2001/feeds/door/data';
const url_lightsensor = 'https://io.adafruit.com/api/v2/phongnguyen2001/feeds/light-sensor/data';
const url_tempsensor = 'https://io.adafruit.com/api/v2/phongnguyen2001/feeds/temp-sensor/data';
const url_humid = 'https://io.adafruit.com/api/v2/phongnguyen2001/feeds/humid/data';
const url_fan = 'https://io.adafruit.com/api/v2/phongnguyen2001/feeds/fan/data';
async function lastValueLedroom(){
    const data = await axios.get(url_ledroom);
    if(data.data[0].value == 1) ledroom = true;
    else ledroom = false;

    let currtime = Math.floor((new Date())/1000);
    ledroomtime = currtime - data.data[0].created_epoch;
    ledroomday = Math.floor(ledroomtime/86400);
    ledroomtime = ledroomtime - ledroomday*86400;
    ledroomhour = Math.floor(ledroomtime/3600);
    ledroomtime = ledroomtime - ledroomhour*3600;
    ledroomminute = Math.floor(ledroomtime/60);
    if (ledroomday != 0){
        if(ledroomday == 1) ledresult = ledroomday + " day";
        else ledresult = ledroomday + " days";
    }
    else if(ledroomhour != 0){
        if(ledroomhour == 1) ledresult = ledroomhour + " hour";
        else ledresult = ledroomhour + " hours";
    }
    else{
        if(ledroomminute == 1 || ledroomminute == 0) ledresult = ledroomminute + " minute";
        else ledresult = ledroomminute + " minutes";
    }  
}
async function lastValueLedHallway(){
    const data = await axios.get(url_ledoutdoor);
    if(data.data[0].value == 1) ledhallway = true;
    else ledhallway = false;

    let currtime = Math.floor((new Date())/1000);
    ledhallwaytime = currtime - data.data[0].created_epoch;
    ledhallwayday = Math.floor(ledhallwaytime/86400);
    ledhallwaytime = ledhallwaytime - ledhallwayday*86400;
    ledhallwayhour = Math.floor(ledhallwaytime/3600);
    ledhallwaytime = ledhallwaytime - ledhallwayhour*3600;
    ledhallwayminute = Math.floor(ledhallwaytime/60);
    if (ledhallwayday != 0){
        if(ledhallwayday == 1) ledhallwayresult = ledhallwayday + " day";
        else ledhallwayresult = ledhallwayday + " days";
    }
    else if(ledhallwayhour != 0){
        if(ledhallwayhour == 1) ledhallwayresult = ledhallwayhour + " hour";
        else ledhallwayresult = ledhallwayhour + " hours";
    }
    else{
        if(ledhallwayminute == 1 || ledhallwayminute == 0) ledhallwayresult = ledhallwayminute + " minute";
        else ledhallwayresult = ledhallwayminute + " minutes";
    }
}
async function lastValueDoor(){
    const data = await axios.get(url_door);
    if(data.data[0].value == 1) door = true;
    else door = false;

    let currtime = Math.floor((new Date())/1000);
    doortime = currtime - data.data[0].created_epoch;
    doortimeday = Math.floor(doortime/86400);
    doortime = doortime - doortimeday*86400;
    doortimehour = Math.floor(doortime/3600);
    doortime = doortime - doortimehour*3600;
    doortimeminute = Math.floor(doortime/60);
    if (doortimeday != 0){
        if(doortimeday == 1) doorresult = doortimeday + " day";
        else doorresult = doortimeday + " days";
    }
    else if(doortimehour != 0){
        if(doortimehour == 1) doorresult = doortimehour + " hour";
        else doorresult = doortimehour + " hours";
    }
    else{
        if(doortimeminute == 1 || doortimeminute == 0) doorresult = doortimeminute + " minute";
        else doorresult = doortimeminute + " minutes";
    }
}
async function lightsensor(){
    const data = await axios.get(url_lightsensor);
    light = data.data[0].value;
}
async function temperaturesensor(){
    const data = await axios.get(url_tempsensor);
    temp = data.data[0].value;
}
async function humidsensor(){
    const data = await axios.get(url_humid);
    humi = data.data[0].value;
}
async function lastfanvalue(){
    const data = await axios.get(url_fan);
    fanstate = data.data[0].value; 

    let currtime = Math.floor((new Date())/1000);
    fantime = currtime - data.data[0].created_epoch;
    fanday = Math.floor(fantime/86400);
    fantime = fantime - fanday*86400;
    fanhour = Math.floor(fantime/3600);
    fantime = fantime - fanhour*3600;
    fanminute = Math.floor(fantime/60);
    if (fanday != 0){
        if(fanday == 1) fanresult = fanday + " day";
        else fanresult = fanday + " days";
    }
    else if(fanhour != 0){
        if(fanhour == 1) fanresult = fanhour + " hour";
        else fanresult = fanhour + " hours";
    }
    else{
        if(fanminute == 1 || fanminute == 0) fanresult = fanminute + " minute";
        else fanresult = fanminute + " minutes";
    }
}

function update() {
    lastfanvalue();
    lastValueDoor();
    lastValueLedHallway();
    lastValueLedroom();
    lightsensor();
    temperaturesensor();
    humidsensor();
}

update();

function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
}

export default function Devices({ navigation }) {
    const [classDoor, setClassDoor] = useState(door);
    const [classLight, setClassLight] = useState(ledroom);
    const [hallwayLight, setHallwayLight] = useState(ledhallway);
    const [fan, setFan] = useState(fanstate);
    const [tempData, setTempData] = useState(temp);
    const [humidData, setHumidData] = useState(humi);
    const [lightData, setLightData] = useState(light);

    const [doorTime, setDoorTime] = useState(doorresult);
    const [rLightTime, setRLightTime] = useState(ledresult);
    const [hLightTime, setHLightTime] = useState(ledhallwayresult);
    const [fanTime, setFanTime] = useState(fanresult);
    
    useInterval(() => {
        update();
        setClassDoor(door);
        setClassLight(ledroom);
        setHallwayLight(ledhallway);
        setFan(fanstate);
        setTempData(temp);
        setLightData(light);
        setHumidData(humi);
        setDoorTime(doorresult);
        setRLightTime(ledresult);
        setHLightTime(ledhallwayresult);
        setFanTime(fanresult);
    }, 1000);

    return (
        <View style={styles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior='automatic'
                showsVerticalScrollIndicator={false}
            >
            {/* HEADER */}
            <Header />
            <View>
                <View style={[styles.headerWrapper, {paddingTop: 20}]}>
        
                    <View style={[styles.sensor, {borderTopLeftRadius: 10, borderBottomLeftRadius: 10}]}> 
                        <SafeAreaView style={{alignItems: 'center', justifyContent: 'center', paddingTop: 10}}>
                            <Text style={styles.sensorData}>
                                <Ionicons name='thunderstorm' style={styles.sensorData}/> {tempData} °C
                            </Text>
                            <Text style={{color: 'white'}}>
                                Temperature
                            </Text>
                        </SafeAreaView>
                    </View>
                    
                    <View style={[styles.sensor, {}]}> 
                        <SafeAreaView style={{alignItems: 'center', justifyContent: 'center', paddingTop: 10}}>
                            <Text style={styles.sensorData}>
                                <Ionicons name='sunny' style={styles.sensorData}/> {lightData} cd
                            </Text>
                            <Text style={{color: 'white'}}>
                                Light intensity
                            </Text>
                        </SafeAreaView>
                    </View>
                    
                    <View style={[styles.sensor, {borderBottomRightRadius: 10, borderTopRightRadius: 10,}]}> 
                        <SafeAreaView style={{alignItems: 'center', justifyContent: 'center', paddingTop: 10}}>
                            <Text style={styles.sensorData}>
                                <Ionicons name='water' style={styles.sensorData}/> {humidData} % 
                            </Text>
                            <Text style={{color: 'white'}}>
                                Humidity
                            </Text>
                        </SafeAreaView>
                    </View>
                </View>
                

                <View>
                    <Text style={[styles.title, {paddingHorizontal: 24, paddingTop: 24}]}>
                        All Devices
                    </Text>
                    <SwitchButton switchName={'Door'} time={doorTime}  state={classDoor}/>           
                    <SwitchButton switchName={'Classroom Light'} time={rLightTime} state={classLight}/>           
                    <SwitchButton switchName={'Hallway Light'} time={hLightTime} state={hallwayLight}/>      
                    <FanButton state={fan} time={fanTime}/>           
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