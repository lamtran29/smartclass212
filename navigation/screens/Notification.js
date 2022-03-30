import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from '../../components/Header'
import Message from '../../components/Message'


function getYesterday(date) {
    return new Date(date.getTime() - 24*60*60*1000);
}
  
function getTomorrow(date) {
    return new Date(date.getTime() + 24*60*60*1000);
}

export default function Notification({ navigation }) {
    var  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var today = new Date();
    var yesterday = getYesterday(today);
    var yesterday2 = getYesterday(yesterday);

    return (
        <View style={styles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior='automatic'
                showsVerticalScrollIndicator={false}
            >
            {/* HEADER */}
            <Header />
            {/* <View style={styles.background}> */}
            <View >
                {/* Today */}
                <View style={{marginTop: 24}}> 
                    <Text style={styles.date}>{months[today.getMonth()]} {today.getDate()}, {today.getFullYear()}</Text>
                    <Message 
                        name='fan' 
                        hour = '20'
                        minute = '00'
                        state = {false}
                    />
                    <Message 
                        name='light' 
                        hour = '18'
                        minute = '30'
                        state = {true}
                    />
                    <Message 
                        name='hallway light' 
                        hour = '18'
                        minute = '30'
                        state = {true}
                    />   
                </View>
                
                {/* Yesterday */}
                <View style={{marginTop: 24}}> 
                    <Text style={styles.date}>{months[yesterday.getMonth()]} {yesterday.getDate()}, {yesterday.getFullYear()}</Text>
                    <Message 
                        name='light' 
                        hour = '20'
                        minute = '00'
                        state = {false}
                    />
                    <Message 
                        name='door' 
                        hour = '18'
                        minute = '30'
                        state = {false}
                    />
                    <Message 
                        name='hallway light' 
                        hour = '18'
                        minute = '30'
                        state = {true}
                    />   
                </View>

                {/* Before yesterday */}
                <View style={{marginTop: 24}}> 
                    <Text style={styles.date}>{months[yesterday2.getMonth()]} {yesterday2.getDate()}, {yesterday2.getFullYear()}</Text>
                    <Message 
                        name='fan' 
                        hour = '20'
                        minute = '00'
                        state = {false}
                    />
                    <Message 
                        name='door' 
                        hour = '18'
                        minute = '30'
                        state = {false}
                    />
                    <Message 
                        name='hallway light' 
                        hour = '18'
                        minute = '30'
                        state = {true}
                    />   
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