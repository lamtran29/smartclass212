import React, { useState } from "react";
import { View, Switch, StyleSheet, Text, SafeAreaView, Image } from "react-native";
import Ionicons from 'react-native-vector-icons//MaterialCommunityIcons';


const SwitchButton = ( {name, hour, minute, state} ) => {
  
    var message = "";
    var icon = 'home';
    if (name == 'door') {
        if (state)
            message = 'The classroom door is opened';
        else message = 'The classroom door is closed';
        icon = 'home';
    }

    else if (name == 'hallway light') {
        if (state)
            message = 'The hallway light is turned on';
        else message = 'The hallway light is turned off';
        icon = 'lightbulb';
    }
    
    else if (name == 'light') {
        if (state)
            message = 'The classroom light is turned on';
        else message = 'The classroom light is turned off';
        icon = 'lightbulb';
    }

    else if (name == 'fan') {
        if (state)
            message = 'The classroom fan is turned on';
        else message = 'The classroom fan is turned off';
        icon = 'fan';
    }
    
    return (
            <SafeAreaView>
            <View style={[styles.headerWrapper, {paddingTop: 10, marginBottom: 16}]}>
                <SafeAreaView>
                    <View style={{
                        backgroundColor: 'white',
                        borderRadius: 10,
                        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                        padding: 10,
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
                            <View style={{marginLeft: 12}}>
                                <Text style={{color: 'grey'}}>{hour}:{minute}</Text>
                                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                                    {message}
                                </Text>
                            </View>
                        </View>
                        
                        
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
