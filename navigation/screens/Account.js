import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Account({ navigation }) {
    return (
        <View style={styles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior='automatic'
                showsVerticalScrollIndicator={false}
            >
                <View style={{
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginTop: 40}}>
                    <Image 
                        source={require('../../assets/img/profile-pic.png')}
                        style={styles.profileImage}
                    />

                    <Text style={{
                        marginTop: 12,
                        fontWeight: 'bold',
                        fontSize: 24
                    }}>
                        Olivia Benson
                    </Text>

                </View>

                <View style={{ 
                    marginTop: 40,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                    padding: 24,
                }}>
                    <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                        <Text style={styles.title}>Email:</Text>
                        <Text style={styles.font16}>oliviathecat@name.com</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                        <Text style={styles.title}>Phone number:</Text>
                        <Text style={styles.font16}>0123456789</Text>
                    </View>
                    
                    <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                        <Text style={styles.title}>Last Login:</Text>
                        <Text style={styles.font16}>12:30 April 1, 2022</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.title}>Account created:</Text>
                        <Text style={styles.font16}>March 1, 2022</Text>
                    </View>
                    
                </View>

                <View style={{ 
                    marginTop: 24,
                    backgroundColor: '#75A7F7',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 40,
                    borderRadius: 10
                }}>
                    <Text style={{ 
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'white'
                    }}>
                        Đăng xuất
                    </Text>
                </View>
            </ScrollView>
        </View>


    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        alignContent: 'center',
    },

    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
    },

    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 90,
    },

    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 12,
    },

    font16: {
        fontSize: 16
    },

});