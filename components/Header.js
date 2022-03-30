import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';

export default function Header() {
    var  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var d = new Date();
    var month = months[d.getMonth()];
    var date = new Date().getDate(); 
    var year = new Date().getFullYear();
    return (
        <View style={{marginBottom: 28}}>
        <SafeAreaView>
                <View style={[styles.headerWrapper, {paddingTop: 28}]}>
                    <SafeAreaView>
                        <Text style={styles.title}>
                            Hello, Olivia Benson
                        </Text>
                        <Text  style={{fontSize: 18}} >
                            {month} {date}, {year}
                        </Text>
                    </SafeAreaView>

                    <Image 
                        source={require('../assets/img/profile-pic.png')}
                        style={styles.profileImage}
                    />

                </View>
        </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
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

});