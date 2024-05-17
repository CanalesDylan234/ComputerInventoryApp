import React, { useEffect, useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import { db, firebase} from  '../../firebase';


const CheckInPage = () => {
    const navigation = useNavigation();

    // State Variables
    const [type, setType] = useState(Camera.Constants.Type.back); // Camera Type (front/back)
    const [permission, requestPermission] = Camera.useCameraPermissions(); // Camera Permission status
    // Barcode Status States
    const [scanned, setScanned] = useState(false); // Flag to track if a barcode has been scanned or not
    const [pendingBarcodes, setPendingBarcodes] = useState([]);
    const [scannedBarcodes, setScannedBarcodes] = useState([]);

    // Request camera permission when the component is created and inserted into the environment
    // Checks to see if camera permission has not been granted, if so it will call to request Permissions
    useEffect(() => {
        if (!permission) {
            requestPermission();
        }
    }, [permission, requestPermission]);


    // Handles the OnPress function for the Camera Barcode Scanner
    const handleBarCodeScanned = ({ type, data }) => {
        console.log('Scanned Barcode:', { type, data });
        alert(`Bar code has been scanned!\n Source reads: ${type}\n Data reads: ${data}`);
        setScanned(true);
        // Update the state variable from the array of recently Scanned Barcodes with the newest scan
        setScannedBarcodes((prevBarcodes) => [...prevBarcodes, { type, data }]);
        setPendingBarcodes((prevBarcodes) => [...prevBarcodes, { type, data }]);
    };

    // Function to toggle between front and back cameras
    const toggleCameraType = () => {
        setType(
            type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    };

    // Handles the OnPress function for the "Scan Again" button
    const handleScanButtonPress = () => {
        setScanned(false);
    };

    const handleConfirmButtonPress = async () => {
        try {
            // Get the reference for the node 'computers' in the database and set the flag to 
            // false so no computer is found yet
            const databaseRef = firebase.database().ref('computers');
            let computerFound = false;

            // Loop throuch each scanned barcode in the pendingBarcodes array and attempt to match the values
            // within the database to ensure it exists and it is able to be checked in
            for (const barcode of pendingBarcodes) {
                const { data } = barcode;
                // Query through the database to find a computer that matches the same data
                const snapshot = await databaseRef.orderByChild('data').equalTo(data).once('value');

                // if computer was found with same data from the barcode and within the database then mark as true
                // to show the user that computer does exist
                // Revieve the correct key for the computer and update its status to true to ensure that it is checked in
                if (snapshot.exists()) {
                    computerFound = true;
                    const computerKey = Object.keys(snapshot.val())[0];
                    await databaseRef.child(computerKey).update({ available: true });
                } else {
                    alert(`Computer "${data}" not found/available in the inventory.`);
                }
            }

            //
            if (computerFound) {
                navigation.navigate('checkInDetails', { scannedBarcodes });
            } else {
                setTimeout(() => {
                    alert('No computers were checked in.');
                }, 3000)
            }

            //
            setPendingBarcodes([]);
        } catch (error) {
            console.error("Error updating computer availability", error);
            alert("Error updating computer availability: ", error);
        }
    };

    // Handles the OnPress function for the "Currently-Scanned!" Button
    const handleCheckStoredBarcodes = () => {
        console.log('Stored Barcodes: ', scannedBarcodes);

        // Checks to see if there are any scanned barcodes ( at least 1)
        if (scannedBarcodes.length > 0) {
            // Create an alert that will format a list of the scanned barcodes
            const barcodeList = scannedBarcodes.map((barcode, index) => `${index + 1}. Type: ${barcode.type}, Data: ${barcode.data}`).join('\n');

            alert(`Scanned Barcodes:\n${barcodeList}`);
            // If there are no (0) barcodes scanned it will output the alert
        } else {
            alert(`No barcodes have been scanned yet!`);
        }
    };

    // Handles the OnPress function for the "Clear the Scanned Barcodes!" Button
    const handleClearScannedBarcodes = () => {
        // Clears the scanned barcodes array (sets to empty)
        setScannedBarcodes([]);
        alert('Previously Scanned Barcodes Have Been Cleared!');
    };

    // Navigate to Maintenance Page
    const handleMaintenanceRequest = () => {
        navigation.navigate('emailMaintenancePage');
    };

    // Render different UI based on camera permission status
    if (!permission) {
        return <Text>Requesting camera permission...</Text>;
    }

    if (permission.status !== 'granted') {
        return <Text>Camera permission not granted...</Text>;
    }

    // Return the main camera scanning UI
    return (
        // Ternary Else-If Operator
        <View style={styles.container}>
            {scanned ? (
                // Displayed when a barcode has been scanned successfully and asks user if they would like to scan another
                <View>
                    <Text style={styles.scanText}>Scan successful!</Text>
                    <View>
                        <TouchableOpacity style={styles.scanButton} onPress={handleScanButtonPress}>
                            <Text style={styles.buttonText}>Scan Again!</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity style={styles.scanButton} onPress={handleCheckStoredBarcodes}>
                            <Text style={styles.buttonText}>Check Current Scanned Computers!</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity style={styles.scanButton} onPress={handleClearScannedBarcodes}>
                            <Text style={styles.buttonText}>Need to restart? Clear all scanned computers!</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity style={styles.scanButton} onPress={handleConfirmButtonPress}>
                            <Text style={styles.buttonText}>Continue to Inventory Confirmation Page!</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            ) : (
                // Displayed when the user has yet to scan a barcode or is in the process of scanning
                <Camera
                    style={styles.camera}
                    type={type}
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonColumn} onPress={toggleCameraType}>
                            <Text style={styles.buttonText}>Flip Camera</Text>
                        </TouchableOpacity>
                        <Text></Text>
                        <TouchableOpacity style={styles.buttonColumn} onPress={handleMaintenanceRequest}>
                            <Text style={styles.buttonText}>Maintenance Request</Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            )}
        </View>
    );
}

export default CheckInPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
        width: '100%',
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
    },
    scanText: {
        fontSize: 26,
        marginBottom: 10,
        color: '#CC0000',
        textAlign: 'center',
    },
    scanButton: {
        backgroundColor: '#CC0000',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    conButton: {
        backgroundColor: '#CC0000',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
    },
    buttonColumn: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
    },
});