import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { firebase } from 'C:/Users/dylan/projects/Final-Project-expo-router/app/firebase.js';

import Login from "./(tabs)/userinfo/Login.js";
import Registration from "./(tabs)/userinfo/Registration.js";
import App from "./(tabs)/home/homeIndex.js";
import Header from "./components/pageHeader.js";
import ConfirmMaintenance from "./(tabs)/settings/confirmMaintenance.js";
import EmailMaintenancePage from "./(tabs)/settings/emailMaintenancePage.js";
import InventoryPage from "./(tabs)/checkit/inventoryAddition.js";
import ConfirmInventory from "./(tabs)/checkit/inventoryConfirmation.js";
import DeleteInventory from "./(tabs)/checkit/inventoryDeletion.js";
import CheckOutPage from "./(tabs)/checkit/checkoutPage.js";
import CheckOutDetailsPage from "./(tabs)/checkit/checkOutDetails.js";
import ConfirmCheckOut from "./(tabs)/checkit/checkOutConfirm.js";
import CheckInPage from "./(tabs)/checkit/checkinPage.js";
import CheckInDetailsPage from "./(tabs)/checkit/checkInDetails.js";
import ConfirmCheckIn from "./(tabs)/checkit/checkInConfirm.js";
import ComputerHistoryPage from "./(tabs)/settings/computerHistory.js";
import LotinventoryPage from "./(tabs)/checkit/inventoryLot.js";
import CheckOutLot from "./(tabs)/checkit/checkoutLot.js";
import CheckInLot from "./(tabs)/checkit/checkinLot.js";
import SettingsApp from "./(tabs)/settings/settingsAppPage.js";

const Stack = createStackNavigator();

function Index() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ 
            headerTitle: () => <Header name="Login" />,
            headerStyle:{ 
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor:'#CC0000',
            shadowColor: '#000',
            elevation: 25
            }
          }}
        />
        <Stack.Screen 
          name="Registration" 
          component={Registration} 
          options={{ 
            headerTitle: () => <Header name="Registration" />,
            headerStyle:{ 
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor:'#CC0000',
            shadowColor: '#000',
            elevation: 25
            }
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="homeIndex" 
        component={App} 
        options={{ 
          headerTitle: () => <Header name="Dashboard" />,
          headerStyle:{ 
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor:'#CC0000',
            shadowColor: '#000',
            elevation: 25
          }
        }}
      />
      <Stack.Screen 
        name="checkoutPage" 
        component={CheckOutPage} 
        options={{ 
          headerShown: true,
          title: 'Check-Out a Computer',
        }}
      />
      <Stack.Screen 
        name="checkOutDetails" 
        component={CheckOutDetailsPage} 
        options={{ 
          headerShown: true,
          title: 'Check-Out Confirmation',
        }}
      />
      <Stack.Screen 
        name="checkoutLot" 
        component={CheckOutLot} 
        options={{ 
          headerShown: true,
          title: 'Check-Out Confirmation',
        }}
      />
      <Stack.Screen 
        name="checkOutConfirm" 
        component={ConfirmCheckOut} 
        options={{ 
          headerShown: true,
          title: 'Thank you!',
        }}
      />
      <Stack.Screen 
        name="checkinPage" 
        component={CheckInPage} 
        options={{ 
          headerShown: true,
          title: 'Check-In a Computer',
        }}
      />
      <Stack.Screen 
        name="checkInDetails" 
        component={CheckInDetailsPage} 
        options={{ 
          headerShown: true,
          title: 'Check-In Confirmation',
        }}
      />
      <Stack.Screen 
        name="checkinLot" 
        component={CheckInLot} 
        options={{ 
          headerShown: true,
          title: 'Check-In Confirmation',
        }}
      />
      <Stack.Screen 
        name="checkInConfirm" 
        component={ConfirmCheckIn}
        options={{ 
          headerShown: true,
          title: 'Thank you!',
        }}
      />
      <Stack.Screen 
        name="inventoryAddition" 
        component={InventoryPage} 
        options={{ 
          headerShown: true,
          title: 'Add to Inventory',
        }}
      />
      <Stack.Screen 
        name="inventoryLot" 
        component={LotinventoryPage} 
        options={{ 
          headerShown: true,
          title: 'Add to Inventory',
        }}
      />
      <Stack.Screen 
        name="inventoryConfirmation" 
        component={ConfirmInventory} 
        options={{ 
          headerShown: true,
          title: 'Thank you!',
        }}
      />
      <Stack.Screen 
        name="inventoryDeletion" 
        component={DeleteInventory}
        options={{ 
          headerShown: true,
          title: 'Thank you!',
        }}
      />
      <Stack.Screen 
        name="emailMaintenancePage" 
        component={EmailMaintenancePage} 
        options={{ 
          headerShown: true,
          title: 'Maintenance Requests',
        }}
      />
      <Stack.Screen 
        name="confirmMaintenance" 
        component={ConfirmMaintenance} 
        options={{ 
          headerShown: true,
          title: 'Email-Confirmation',
        }}
      />
      <Stack.Screen 
        name="computerHistory" 
        component={ComputerHistoryPage} 
        options={{ 
          headerShown: true,
          title: 'Check Computer History',
        }}
      />
      <Stack.Screen 
        name="settingsAppPage" 
        component={SettingsApp} 
        options={{ 
          headerShown: true,
          title: 'Check Computer History',
        }}
      />
    </Stack.Navigator>
  );
}

export default Index



