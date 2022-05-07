import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, TextInput  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainContainer from './MainContainer';



export default function Login () {
    const [page, setPage] = useState(true);
    const [username, onChangeUsername] = useState(null);
    const [password, onChangePassword] = useState(null);
    
    const login = () => {
        if (username == null || password == null) {
            alert("Please enter username and password !")
        } 
        
        else if (username == 'user1' && password == '123456'){
            setPage(previousState => !previousState)
        }

        else alert("Incorrect username or password")
    }


    return (
        (page && 
            <ScrollView
                contentInsetAdjustmentBehavior='automatic'
                showsVerticalScrollIndicator={false}
            >
        <View style={styles.container}>
            <View style={{
                backgroundColor: '#4C525C',
                borderRadius: 400,
                height: 400,
                width: 400,
                marginLeft: 170,
                justifyContent: 'flex-end',
                position: 'absolute',
                overflow: 'hidden',
            }} />

            <View style={{
                backgroundColor: '#75A7F7',
                borderRadius: 700,
                height: 700,
                width: 700,
                marginLeft: -220,
                marginTop: -370,
                justifyContent: 'flex-end',
                overflow: 'hidden',
                marginBottom: 100,
            }}>
                <Text style={{
                    paddingLeft: 225,
                    paddingBottom: 70,
                    fontSize: 48,  
                    fontWeight: 'bold',
                    color: 'white',
                }}>
                    Welcome to {'\n'}SmartClass
                </Text>
                
            </View>

            <View>
                <SafeAreaView>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeUsername}
                        value={username}
                        placeholder="Username"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangePassword}
                        value={password}
                        placeholder="Password"
                        secureTextEntry={true} 
                    />
                </SafeAreaView>
                <View style={{ 
                    marginTop: 24,
                    paddingHorizontal: 24,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 32 }}>Sign in</Text>
                    <TouchableOpacity
                        onPress={login}
                        style={{ 
                            backgroundColor: '#4C525C',
                            marginTop: -8,
                            height: 60,
                            width: 60,
                            borderRadius: 60,
                            justifyContent: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <Ionicons name='md-arrow-forward' style={{color: 'white', textAlign: 'center', fontSize: 32,}}/>  

                    </TouchableOpacity>
                </View>

                <View style={{ paddingHorizontal: 24, }}>
                    <TouchableOpacity
                        style={{ 
                            marginTop: 57,
                            textAlign: 'right',
                            marginBottom: 32,
                        }}
                    >
                        <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'right'}}>Forgot Password ?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View> 
        </ScrollView>
            
        ) || 
        (!page && 
        <MainContainer />
        )
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

    input: {
        fontSize: 16,
        height: 60,
        margin: 12,
        paddingHorizontal: 24,
        backgroundColor: '#E5E5E5',
        borderRadius: 20,
      },

    font16: {
        fontSize: 16
    },

});