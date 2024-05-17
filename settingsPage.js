import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SettingsPage = () => {
    const navigation = useNavigation();

    const goToEmailMaintenancePage = () => {
        navigation.navigate('emailMaintenancePage');
    };

    const goToHistoryPage = () => {
        navigation.navigate('computerHistory');
    };

    const goToSettingsPage = () => {
        navigation.navigate('settingsAppPage');
    };
    
    return (
        <View style={styles.container}>
        <Text style={{fontSize: 20, marginBottom: 5, color: "#CC0000", textAlign: 'center'}}>Settings Page</Text>

        <View>
            <TouchableOpacity
                onPress={goToEmailMaintenancePage} style={styles.button}
            >
                <Text style={styles.buttonText}>Maintenance Requests</Text>
            </TouchableOpacity>
        </View>

        <View>
            <TouchableOpacity
                onPress={goToHistoryPage} style={styles.button}
            >
                <Text style={styles.buttonText}>Check Computer History</Text>
            </TouchableOpacity>
        </View>

        <View>
            <TouchableOpacity
                onPress={goToSettingsPage} style={styles.button}
            >
                <Text style={styles.buttonText}>Application Settings</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginTop: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center', // Center content horizontally
        justifyContent: 'center', // Center content vertically
        backgroundColor: '#CC0000',
        borderRadius: 5,
    },
    button: {
        marginTop: 25,
        height: 50,
        width: 250,
        backgroundColor: '#CC0000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    buttonText: {
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default SettingsPage