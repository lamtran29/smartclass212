import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

function getYesterday(date) {
    return new Date(date.getTime() - 24*60*60*1000);
}
  
function getTomorrow(date) {
    return new Date(date.getTime() + 24*60*60*1000);
}

export default function Week() {
    var  days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    var today = new Date();
    var yesterday = getYesterday(today);
    var yesterday2 = getYesterday(yesterday);
    var yesterday3 = getYesterday(yesterday2);;
    var tomorrow = getTomorrow(today);
    var tomorrow2 = getTomorrow(tomorrow);
    var tomorrow3 = getTomorrow(tomorrow2);

    return (
        <View style={[styles.wrapper, {marginTop: 20}]}>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.title}>{yesterday3.getDate()}</Text>
                <Text style={styles.dateText}>{days[yesterday3.getDay()]}</Text>
            </View>

            <View style={{alignItems: 'center'}}>
                <Text style={styles.title}>{yesterday2.getDate()}</Text>
                <Text style={styles.dateText}>{days[yesterday2.getDay()]}</Text>
            </View>
            
            <View style={{alignItems: 'center'}}>
                <Text style={styles.title}>{yesterday.getDate()}</Text>
                <Text style={styles.dateText}>{days[yesterday.getDay()]}</Text>
            </View>
            
            <View style={{
                backgroundColor: '#CDDFFC',   
                paddingHorizontal: 16,
                paddingVertical: 12,
                marginTop: -12,
                borderRadius: 16,
                marginVertical: 0
            }}>
                    <Text style={[styles.title, {color: '#75A7F7'}]}>{today.getDate()}</Text>
                    <Text style={[styles.dateText, {color: '#75A7F7'}]}>{days[today.getDay()]}</Text>
                    <Text style={{fontSize: 40, color: '#75A7F7', textAlign: 'center', marginTop: -30, marginBottom: -10}}>.</Text>
            </View>
            
            <View style={{alignItems: 'center'}}>
                <Text style={styles.title}>{tomorrow.getDate()}</Text>
                <Text style={styles.dateText}>{days[tomorrow.getDay()]}</Text>
            </View>
            
            <View style={{alignItems: 'center'}}>
                <Text style={styles.title}>{tomorrow2.getDate()}</Text>
                <Text style={styles.dateText}>{days[tomorrow2.getDay()]}</Text>
            </View>
            
            <View style={{alignItems: 'center'}}>
                <Text style={styles.title}>{tomorrow3.getDate()}</Text>
                <Text style={styles.dateText}>{days[tomorrow3.getDay()]}</Text>
            </View>

            
        </View>
    );
}

const styles = StyleSheet.create({
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

});