import React, { useState } from "react";
import { View, Switch, StyleSheet, Text, SafeAreaView, Image } from "react-native";
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import RadioGroup from 'react-native-radio-buttons-group';

const radioButtonsData = [{
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Low',
    value: 'option1'
}, {
    id: '2',
    label: 'Medium',
    value: 'medium'
}, {
    id: '3',
    label: 'High',
    value: 'high'
}]

const FanButton = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
   
    const [radioButtons, setRadioButtons] = useState(radioButtonsData)

    function onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray);
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
                        
                        <RadioGroup 
                            layout='row'
                            radioButtons={radioButtons} 
                            onPress={onPressRadioButton} 
                        />
                        
                        <Text style={{
                            fontSize: 16,
                            marginTop: 16,
                            marginLeft: 10,
                            }}>
                                Turned on 3 hours ago
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

export default FanButton;



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