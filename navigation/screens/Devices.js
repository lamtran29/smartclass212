import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from '../../components/Header'
import SwitchButton from '../../components/Switch'
import FanButton from '../../components/Fan'

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
                                <Ionicons name='thunderstorm' style={styles.sensorData}/> 30 °C
                            </Text>
                            <Text style={{color: 'white'}}>
                                Temperature
                            </Text>
                        </SafeAreaView>
                    </View>
                    
                    <View style={[styles.sensor, {}]}> 
                        <SafeAreaView style={{alignItems: 'center', justifyContent: 'center', paddingTop: 10}}>
                            <Text style={styles.sensorData}>
                                <Ionicons name='sunny' style={styles.sensorData}/> 5 cd
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
                    <SwitchButton switchName={'Door'} time={'3 hours'}  state={true}/>           
                    <SwitchButton switchName={'Classroom Light'} time={'3 hours'} state={true}/>           
                    <SwitchButton switchName={'Hallway Light'} time={'5 hours'} state={false}/>           
                    <FanButton />           
                    
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