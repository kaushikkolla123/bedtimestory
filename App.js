import * as React from 'react';
import { Text, View,TextInput, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function IconWithBadge({ name, badgeCount, color, size }) {
  return (
    <View style={{ width: 24, height: 24, margin: 5 }}>
      <Ionicons name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}

function HomeIconWithBadge(props) {
  // You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
  return <IconWithBadge {...props} badgeCount={3} />;
}

function HomeScreen() {
    const [value, onChangeText] = React.useState('read the story');
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor : 'lavender' }}>

      <TextInput
      style={{ height: 120, width: 410, borderColor: 'gray', borderWidth: 1 ,textAlign: 'center'}}
      onChangeText={text => onChangeText(text)}
      value={value}
    />
          <Text>ReadScreen!</Text>
    </View>
  );
}

function SettingsScreen() {
    function displayAlert (){
        alert('Thanks you for submitting the work')
    }
    const [value, onChangeText] = React.useState('read the story');
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: 'white' }}>
      
      <TextInput
      style={{ height: 120, width: 410, borderColor: 'gray', borderWidth: 1 ,textAlign: 'center'}}
      onChangeText={text => onChangeText(text)}
      value={value}
    />
          <Text>WriteScreen!</Text>
          <Button title="Submit" color=  "green" onPress = {displayAlert}/>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Home') {
              return (
                <HomeIconWithBadge
                  name={
                    focused
                      ? 'ios-information-circle'
                      : 'ios-information-circle-outline'
                  }
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'Settings') {
              return (
                <Ionicons
                  name={focused ? 'ios-list-box' : 'ios-list'}
                  size={size}
                  color={color}
                />
              );
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

