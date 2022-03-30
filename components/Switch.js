import React, { useState } from "react";
import { View, Switch, StyleSheet, Text, SafeAreaView, Image } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';


const SwitchButton = ( {switchName, time, state} ) => {
    const [isEnabled, setIsEnabled] = useState(state);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
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
                            {/* icon */}
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

                {/* <Image 
                    source={require('../assets/img/profile-pic.png')}
                    style={styles.profileImage}
                /> */}

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



// import * as React from 'react';
// import { View, Text, StyleSheet, SafeAreaView, Image, Switch } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// export default function SwitchButton() {
//     const [isEnabled, setIsEnabled] = useState(false);
//     const toggleSwitch = () => setIsEnabled(previousState => !previousState);

//     return (
//         <SafeAreaView>
//             <View style={[styles.headerWrapper, {paddingTop: 10}]}>
//                 <SafeAreaView>
//                     <View style={styles.switchContainer}>
//                         <View style={styles.switchHeader}>
//                             {/* icon */}
//                             <View>
//                                 <Ionicons name='home' style={styles.sensorData}/>
//                             </View>

//                             {/* switch name */}
//                             <Text>Door</Text>

//                             {/* Switch */}
//                             <View style={styles.container}>
//                                 <Switch
//                                     trackColor={{ false: "#767577", true: "#81b0ff" }}
//                                     thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
//                                     ios_backgroundColor="#3e3e3e"
//                                     onValueChange={toggleSwitch}
//                                     value={isEnabled}
//                                 />
//                             </View>
//                         </View>
//                         <Text>Opened 3 hours ago</Text>
//                     </View>
//                 </SafeAreaView>

//                 {/* <Image 
//                     source={require('../assets/img/profile-pic.png')}
//                     style={styles.profileImage}
//                 /> */}

//             </View>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center"
//     },

//     headerWrapper: {
//         paddingHorizontal: 24,
//     },

//     title: {
//         fontSize: 20, 
//         fontWeight: 'bold'
//     },


// });