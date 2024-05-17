import { View, Linking, StyleSheet, Text } from "react-native";
import { StatusBar } from 'expo-status-bar';

const SettingsApp = () => {
    // Open Device Settings Page
    Linking.openSettings();

    return (
        <View style={styles.container}>
            <Text style={styles.text}> You may now go back to the dashboard.</Text>
            <StatusBar style="auto" />
        </View>
    );
};

export default SettingsApp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
    },
});
