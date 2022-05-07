import React, { useState, useEffect, useRef  } from "react";
import ReactDOM from "react-dom";
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from '../../components/Header'
import Message from '../../components/Message'
import axios from 'axios';
import SwitchButton from '../../components/Switch'
import FanButton from '../../components/Fan'

function getYesterday(date) {
    return new Date(date.getTime() - 24*60*60*1000);
}

let ledroom, ledhallway, door, light, humi, temp, fanstate;
var ledroomtime, ledhallwaytime, doortime, fantime;
var ledroomday, ledroomhour, ledroomminute;
var ledhallwayday, ledhallwayhour, ledhallwayminute;
var doortimeday, doortimehour, doortimeminute;
var ledresult = "";
var ledhallwayresult = "";
var doorresult = "";

var listOfNoti = [];

async function lastValueLedroom(){
    const data = await axios.get('https://io.adafruit.com/api/v2/phongnguyen2001/feeds/ledroom/data');
        
    if (listOfNoti.filter(e => e.time === data.data[0].created_epoch).length > 0) return;
    for (let i = 0; i < 3; i++) {
        if (listOfNoti.filter(e => e.time === data.data[i].created_epoch).length > 0) return;
        if(data.data[i].value == 1) ledroom = true;
        else ledroom = false;
        ledroomtime = data.data[i].created_epoch;
        listOfNoti.push({name: 'light', time: ledroomtime, state: ledroom})
    }
}
async function lastValueLedHallway(){
    const data = await axios.get('https://io.adafruit.com/api/v2/phongnguyen2001/feeds/ledoutdoor/data');
        
    if (listOfNoti.filter(e => e.time === data.data[0].created_epoch).length > 0) return;
    for (let i = 0; i < 3; i++) {   
        if (listOfNoti.filter(e => e.time === data.data[i].created_epoch).length > 0) return;
        if(data.data[i].value == 1) ledhallway = true;
        else ledhallway = false;
        ledhallwaytime = data.data[i].created_epoch;
        listOfNoti.push({name: 'hallway light', time: ledhallwaytime, state: ledhallway})
    }
        
}
async function lastValueDoor(){
    const data = await axios.get('https://io.adafruit.com/api/v2/phongnguyen2001/feeds/door/data');
    

    if (listOfNoti.filter(e => e.time === data.data[0].created_epoch).length > 0) return;
    for (let i = 0; i < 3; i++) {   
        if (listOfNoti.filter(e => e.time === data.data[i].created_epoch).length > 0) return;
        if(data.data[i].value == 1) door = true;
        else door = false;
        doortime = data.data[i].created_epoch;
        listOfNoti.push({name: 'door', time: doortime, state: door})
    }
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

    if (listOfNoti.filter(e => e.time === data.data[0].created_epoch).length > 0) return;
    for (let i = 0; i < 3; i++) {   
        if (listOfNoti.filter(e => e.time === data.data[i].created_epoch).length > 0) return;
        fanstate = data.data[0].value; 
        fantime = data.data[i].created_epoch;
        listOfNoti.push({name: 'fan', time: fantime, state: fanstate})
    }
}

function update() {
    lastfanvalue();
    lastValueDoor();
    lastValueLedHallway();
    lastValueLedroom();
    lightsensor();
    temperaturesensor();
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

export default function Notification ({ navigation }) {
    const [classDoor, setClassDoor] = useState(door);
    const [classLight, setClassLight] = useState(ledroom);
    const [hallwayLight, setHallwayLight] = useState(ledhallway);
    const [fan, setFan] = useState(fanstate);
    const [tempData, setTempData] = useState(temp);
    const [lightData, setLightData] = useState(light);

    useInterval(() => {
        update();
        listOfNoti.sort((a, b) => (a.time > b.time) ? -1 : 1)
        setNotiList(listOfNoti);
        setClassDoor(door);
        setClassLight(ledroom);
        setHallwayLight(ledhallway);
        setFan(fanstate);
        setTempData(temp);
        setLightData(light);
    }, 1000);

    var  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var today = new Date();
    var yesterday = getYesterday(today);
    var yesterday2 = getYesterday(yesterday);

    const [notiList, setNotiList] = useState(listOfNoti);

    return (
        <View style={styles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior='automatic'
                showsVerticalScrollIndicator={false}
            >
            {/* HEADER */}
            <Header />

            <View >
                <View style={{marginTop: 12}}> 
                    {notiList.map(item => {
                        return <Message 
                            name= {item.name}
                            time = {new Date(item.time*1000).toLocaleString()}
                            state = {item.state}
                        />
                    })}
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

    date: {
        paddingHorizontal: 24, 
        fontWeight: 'bold',
        fontSize: 16
    }

});


// import React, { useState } from "react";
// import ReactDOM from "react-dom";

// const Input = () => {
//   return <input placeholder="Your input here" />;
// };

// const Form = () => {
//   const [inputList, setInputList] = useState([]);

//   const onAddBtnClick = event => {
//     setInputList([<Input key={inputList.length} />].concat(inputList));
    
//   };
//   var list = [
//     { color: 3, size: 'XXL' },
//     { color: 1, size: 'XL' },
//     { color: 1, size: 'M' },
//     { color: 1, size: 'Ms' },
//     { color: 7, size: 'Mf' },
//   ]
  
//   list.push({ color: 4, size: 'Mfas' })
//   list.sort((a, b) => (a.color > b.color) ? 1 : -1)
//   // list = [];

//   return (
//     <div>
//       <button onClick={onAddBtnClick}>Add input</button>
//       {/* {inputList} */}
//       <ul>
//         {list.map(item => {
//           return <li>{item.size}</li>;
//         })}
//       </ul>
//     </div>
//   );
// };

// ReactDOM.render(<Form />, document.getElementById("form"));
