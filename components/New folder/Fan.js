import React, { useState, useEffect, useRef } from "react";
import { View, Switch, StyleSheet, Text, SafeAreaView, Image, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import RadioGroup from 'react-native-radio-buttons-group';
import axios from 'axios';

// function useInterval(callback, delay) {
//     const savedCallback = useRef();
  
//     // Remember the latest callback.
//     useEffect(() => {
//       savedCallback.current = callback;
//     }, [callback]);
  
//     // Set up the interval.
//     useEffect(() => {
//       function tick() {
//         savedCallback.current();
//       }
//       if (delay !== null) {
//         let id = setInterval(tick, delay);
//         return () => clearInterval(id);
//       }
//     }, [delay]);
// }

// let state;

// async function lastfanvalue(){
//     const data = await axios.get('https://io.adafruit.com/api/v2/phongnguyen2001/feeds/fan/data');
//     state = data.data[0].value; 
// }

// lastfanvalue();

function RadioButton({selected, optionName}) {
    return (
        <View style={{
            flexDirection: 'row',
        }}>
            <View style={[{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: '#000',
                alignItems: 'center',
                marginRight: 8,
                justifyContent: 'center',
            }]}>
                {
                selected ?
                    <View style={{
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: '#000',
                    }}/>
                    : null
                }
            </View> 
            <View style={{ marginRight: 24 }}>
                <Text style={{ fontSize: 16 }}>
                    {optionName}
                </Text>
            </View>
        </View>
    );
}
const FanButton = ( {state} ) => {
    const [isEnabled, setIsEnabled] = useState(state != 0);
    useEffect(() => {
        setIsEnabled(state != 0);
    }, [state]);

    const [low, setLow] = useState(state == 1);
    useEffect(() => {
        setLow(state == 1);
    }, [state]);
    
    const [medium, setMedium] = useState(state == 2);
    useEffect(() => {
        setMedium(state == 2);
    }, [state]);
    
    const [high, setHigh] = useState(state == 3);
    useEffect(() => {
        setHigh(state == 3);
    }, [state]);
    
    // useInterval(() => {
    //     lastfanvalue();
    //     setIsEnabled(state != 7);
    //     setLow(state == 8);
    //     setMedium(state == 9);
    //     setHigh(state == 10);
    // }, 1000);

    const toggleSwitch = () => {
        let x;
        setIsEnabled(previousState => !previousState);
        axios.get('https://io.adafruit.com/api/v2/phongnguyen2001/feeds/fan/data')
        .then(data=>{
            x = data.data[0].value;
            if(x == 0) x = 1;
            else x = 0;
            axios({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'X-AIO-Key': 'aio_Gsvl46SPpX844VDMJFUb2PbvzeZR'
                    'X-AIO-Key': 'aio_BYvE63u9nyDKsJhWmmyX2qcIIWOr'
                },
                url: 'https://io.adafruit.com/api/v2/phongnguyen2001/feeds/fan/data',
                data: JSON.stringify({ "value": x })
            }).then(data=>{console.log("success")}
            )
        })
        if (isEnabled) {
            setLow(false);
            setMedium(false);
            setHigh(false);
        }
        else setLow(true);
    }

    
    
    
    const onPressLow = () => {
        if (isEnabled) {
            setLow(true);
            setMedium(false);
            setHigh(false);
            axios({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'X-AIO-Key': 'aio_Gsvl46SPpX844VDMJFUb2PbvzeZR'
                    'X-AIO-Key': 'aio_BYvE63u9nyDKsJhWmmyX2qcIIWOr'
                },
                url: 'https://io.adafruit.com/api/v2/phongnguyen2001/feeds/fan/data',
                data: JSON.stringify({ "value": 1 })
            }).then(data=>{console.log("success")}
            )
        }
    }

    const onPressMedium = () => {
        if (isEnabled) {
            setLow(false);
            setMedium(true);
            setHigh(false);
            axios({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'X-AIO-Key': 'aio_Gsvl46SPpX844VDMJFUb2PbvzeZR'
                    'X-AIO-Key': 'aio_BYvE63u9nyDKsJhWmmyX2qcIIWOr'
                },
                url: 'https://io.adafruit.com/api/v2/phongnguyen2001/feeds/fan/data',
                data: JSON.stringify({ "value": 2 })
            }).then(data=>{console.log("success")}
            )
        }
    }

    const onPressHigh = () => {
        if (isEnabled) {
            setLow(false);
            setMedium(false);
            setHigh(true);
            axios({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'X-AIO-Key': 'aio_Gsvl46SPpX844VDMJFUb2PbvzeZR'
                    'X-AIO-Key': 'aio_BYvE63u9nyDKsJhWmmyX2qcIIWOr'
                },
                url: 'https://io.adafruit.com/api/v2/phongnguyen2001/feeds/fan/data',
                data: JSON.stringify({ "value": 3 })
            }).then(data=>{console.log("success")}
            )
        }
    }
   
    
    return (
            <SafeAreaView>
            <View style={[styles.headerWrapper, {paddingTop: 10, marginBottom: 16}]}>
                <SafeAreaView>
                    <View style={{
                        backgroundColor: 'white',
                        borderRadius: 30,
                        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                        padding: 24,
                    }}>
                        <View style={[styles.switchHeader, {marginBottom: 12}]}>
                            {/* icon */}
                            <View style={{
                                backgroundColor: '#D2E0EE',
                                width: 45,
                                height: 45,
                                borderRadius: 45,
                                alignItems: 'center', 
                                justifyContent: 'center',
                            }}>
                                <Ionicons name='fan' style={{
                                    color: '#75A7F7',
                                    fontSize: 22,
                                }}/>
                            </View>

                            {/* switch name */}
                            <Text style={{
                                marginLeft: 12,
                                fontSize: 16,
                                fontWeight: 'bold',
                                flex: 4,
                            }}>
                                Fan
                            </Text>

                            {/* Switch */}
                            <View style={styles.container}>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                />
                            </View>

                        </View>
                

                        <View style={{ flexDirection: 'row' }}>
                            
                            <TouchableOpacity onPress={onPressLow}>
                                <RadioButton selected={low} optionName={"Low"}/>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={onPressMedium}>
                                <RadioButton selected={medium} optionName={"Medium"}/>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={onPressHigh}>
                                <RadioButton selected={high} optionName={"High"}/>
                            </TouchableOpacity>
                        </View>
                    
                    </View>
                </SafeAreaView>

            </View>
        </SafeAreaView>


    
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    headerWrapper: {
        paddingHorizontal: 24,
    },

    switchHeader: {
        alignItems: 'center', 
        flexDirection: 'row',
    },

    title: {
        fontSize: 20, 
        fontWeight: 'bold'
    },


});

export default FanButton;
