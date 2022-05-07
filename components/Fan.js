import React, { useState, useEffect, useRef } from "react";
import { View, Switch, StyleSheet, Text, SafeAreaView, Image, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import RadioGroup from 'react-native-radio-buttons-group';
import axios from 'axios';
const url_fan = 'https://io.adafruit.com/api/v2/phongnguyen2001/feeds/fan/data';
const KEY = '';

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
const FanButton = ( {state, time} ) => {
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
    
    const toggleSwitch = () => {
        let x;
        setIsEnabled(previousState => !previousState);
        axios.get(url_fan)
        .then(data=>{
            x = data.data[0].value;
            if(x == 0) x = 1;
            else x = 0;
            axios({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-AIO-Key': KEY
                },
                url: url_fan,
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
                    'X-AIO-Key': KEY
                },
                url: url_fan,
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
                    'X-AIO-Key': KEY
                },
                url: url_fan,
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
                    'X-AIO-Key': KEY
                },
                url: url_fan,
                data: JSON.stringify({ "value": 3 })
            }).then(data=>{console.log("success")}
            )
        }
    }
   
    var description = "";
    if (state == 0)
        description = 'Turned off ' + time + ' ago';
    else if (state == 1)
        description = 'Set to Low ' + time + ' ago';
    else if (state == 2)
        description = 'Set to Medium ' + time + ' ago';
    else if (state == 3)
        description = 'Set to High ' + time + ' ago';

    
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
                    
                        <Text style={{
                            fontSize: 16,
                            marginTop: 16,
                            marginLeft: 2,
                        }}>
                            {description}
                        </Text>
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
