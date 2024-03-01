import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "native-base";
import Home from "../../screens/Home";
import Cart from "../../screens/Cart";
import React from "react";
import { capitalizeFirstLetter, colors } from "../../utils";


const Tab = createBottomTabNavigator();

export const AppNavigation: React.FC = () => {

  const routes: { [key: string]: 'home' | 'cart' } = {
    Home: "home",
    Cart: "cart",
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false, // This line hides the header
          tabBarLabel: ({ focused }) => {
            return (
              <Text fontSize='xs' style={{ color: focused ? colors.primary : 'gray' }}>{capitalizeFirstLetter(routes[route.name])}</Text>
            );
          },
          tabBarIcon: ({ focused }) => {

            return <Ionicons name={`${routes[route.name]}${!focused ? '-outline' : ''}`} size={20} color={focused ? colors.primary : 'gray'} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Cart" component={Cart} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
