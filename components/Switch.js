import React, { useState, useEffect } from "react";
import axios from 'axios';
import { View, Switch, StyleSheet, Text, SafeAreaView, Image } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { withRepeat } from "react-native-reanimated";

const url_door = 'https://io.adafruit.com/api/v2/phongnguyen2001/feeds/door/data';
const url_ledoutdoor = 'https://io.adafruit.com/api/v2/phongnguyen2001/feeds/ledoutdoor/data';
const url_ledroom = 'https://io.adafruit.com/api/v2/phongnguyen2001/feeds/ledroom/data';
const KEY = 'dien key vao day';

const SwitchButton = ( {switchName, time, state} ) => {
    const [isEnabled, setIsEnabled] = useState(state);
    useEffect(() => {
        setIsEnabled(state);
    }, [state]);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
 
        if (switchName == 'Door') {
            let x = 0;
            axios.get(url_door)
                .then(data=>{
                    if(data.data[0].value == 0) x = 1;
                    else x = 0;
                    axios({
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-AIO-Key': KEY
                        },
                        url: url_door,
                        data: JSON.stringify({ "value": x })
                    }).then(data=>{console.log("success")}
                    )
                })
        }
        else if (switchName == 'Hallway Light') {
            let x = 0;
            axios.get(url_ledoutdoor)
            .then(data=>{
                if(data.data[0].value == 0) x = 1;
                else x = 0;
                axios({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-AIO-Key': KEY
                    },
                    url: url_ledoutdoor,
                    data: JSON.stringify({ "value": x })
                }).then(data=>{console.log("success")}
                )
            })
            
        }
        else{
            let x = 0;
            axios.get(url_ledroom)
            .then(data=>{
                if(data.data[0].value == 1) x = 0;
                else x = 1;
                axios({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-AIO-Key': KEY
                    },
                    url: url_ledroom,
                    data: JSON.stringify({ "value": x })
                }).then(data=>{console.log("success")}
                )
            })
        }
    }

    var switchDescription = "";
    var icon = 'home';
    if (switchName == 'Door') {
        if (state)
            switchDescription = 'Opened ' + time + ' ago';
        else switchDescription = 'Closed ' + time + ' ago';
        icon = 'home';
    }

    else if (switchName.includes('Light')) {
        if (state)
            switchDescription = 'Turned on ' + time + ' ago';
        else switchDescription = 'Turned off ' + time + ' ago';
        icon = 'bulb';
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
                        <View style={styles.switchHeader}>
                            <View style={{
                                backgroundColor: '#D2E0EE',
                                width: 45,
                                height: 45,
                                borderRadius: 45,
                                alignItems: 'center', 
                                justifyContent: 'center',
                            }}>
                                <Ionicons name={icon} style={{
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
                                {switchName}
                            </Text>

                            {/* Switch */}
                            <View style={styles.container}>
                                <Switch
                                    trackColor={{ true: "#81b0ff", false: "#767577"  }}
                                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                />
                            </View>
                        </View>
                        
                        <Text style={{
                            fontSize: 16,
                            marginTop: 16,
                            marginLeft: 2,
                        }}>
                            {switchDescription}
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

export default SwitchButton;


