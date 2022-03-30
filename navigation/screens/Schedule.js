import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from '../../components/Header'
import SwitchButton from '../../components/Switch'
import FanButton from '../../components/Fan'
import Week from '../../components/Week'

export default function Schedule({ navigation }) {
    return (
        <View style={styles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior='automatic'
                showsVerticalScrollIndicator={false}
            >
                <Header />
                <View style={styles.background}>
                    <Week />
                    <Text style={[styles.title, {paddingHorizontal: 24, paddingTop: 24}]}>
                        Today's schedule
                    </Text>


                    <View style={[styles.wrapper, {marginTop: 24}]}>
                        <View style={[styles.times, { marginRight: 24}]}>
                            <Text style={styles.time}>06.00</Text>
                            <Text style={styles.time}>08.00</Text>
                            <Text style={styles.time}>10.00</Text>
                            <Text style={styles.time}>12.00</Text>
                            <Text style={styles.time}>14.00</Text>
                            <Text style={styles.time}>16.00</Text>
                            <Text style={styles.time}>18.00</Text>
                            <Text style={styles.time}>20.00</Text>
                            <Text style={styles.time}>22.00</Text>
                        </View>


                        <View style={styles.tasks}>
                            <View style={[styles.task, {
                                paddingVertical: 16,
                                marginBottom: 30,
                            }]}>
                                <Text style={styles.taskText}>Software Engineering</Text>
                                <Text style={styles.taskText}>Prof. Taylor</Text>
                            </View>

                            <View style={[styles.task, {
                                paddingVertical: 40,
                                marginBottom: 88,
                            }]}>
                                <Text style={styles.taskText}>Computer Network</Text>
                                <Text style={styles.taskText}>Prof. Benjamin</Text>
                            </View>

                            <View style={[styles.task, {
                                paddingVertical: 40,
                            }]}>
                                <Text style={styles.taskText}>Database Systems</Text>
                                <Text style={styles.taskText}>Prof. Meridith</Text>
                            </View>
                        </View>
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

    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
    },


    title: {
        fontSize: 16, 
        fontWeight: 'bold'
    },

    dateText: {
        color: 'grey'
    },

    times: {
        flexDirection: 'column',
    },  

    time: {
        color: 'grey',
        marginBottom: 32,
    },

    tasks: {
        flexDirection: 'column',
        width: '80%',
    },

    task: {
        backgroundColor: '#75A7F7',
        borderRadius: 12,
        paddingHorizontal: 16,
    },

    taskText: {
        color: 'white', 
        fontWeight: 'bold'
    }
});