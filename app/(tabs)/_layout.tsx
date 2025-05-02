import { Tabs } from 'expo-router';
import React from 'react';
import {
  ChromeIcon,
  CreditCard,
  Grid2x2 as Grid,
  Home,
  User,
  Users,
  Bell,
} from 'lucide-react-native';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const TAB_WIDTH = width / 5;

export default function TabLayout() {
  const activeIndex = useSharedValue(0);

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(activeIndex.value * TAB_WIDTH) }],
    };
  });

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // Hide the default tab bar completely
        tabBarStyle: {
          display: 'none', // Hide the default tab bar
        },
      }}
      // Provide a custom component to render the entire tab bar
      tabBar={(props) => {
        // Move useEffect outside of tabBar component
        return (
          <View style={styles.tabBarContainer}>
            {/* Animated indicator */}
            <Animated.View style={[styles.indicator, indicatorStyle]} />

            {/* Manually render tab bar buttons */}
            {props.state.routes.map((route, index) => {
              const { options } = props.descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;

              const isFocused = props.state.index === index;

              const onPress = () => {
                const event = props.navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  props.navigation.navigate(route.name, route.params);
                }
              };

              const onLongPress = () => {
                props.navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                });
              };

              // Determine icon component based on route name
              const Icon = {
                index: Home,
                services: Grid,
                community: Users,
                payments: CreditCard,
                profile: User,
                // Add other route names and their corresponding icons here
              }[route.name];

              return (
                <TouchableOpacity
                  key={route.key}
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={styles.tabButton}
                >
                  {Icon && (
                    <Icon
                      size={24} // Adjust size as needed
                      color={isFocused ? '#7E3AF2' : '#94A3B8'}
                    />
                  )}
                  <Text
                    style={[
                      styles.tabBarLabel,
                      { color: isFocused ? '#7E3AF2' : '#94A3B8' },
                    ]}
                  >
                    {label as string}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => <Home size={size} color={color} />,
        }}
        listeners={{
          tabPress: () => {
            activeIndex.value = 0;
          },
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: 'Services',
          tabBarIcon: ({ size, color }) => <Grid size={size} color={color} />,
        }}
        listeners={{
          tabPress: () => {
            activeIndex.value = 1;
          },
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          tabBarIcon: ({ size, color }) => <Users size={size} color={color} />,
        }}
        listeners={{
          tabPress: () => {
            activeIndex.value = 2;
          },
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          title: 'Payments',
          tabBarIcon: ({ size, color }) => (
            <CreditCard size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: () => {
            activeIndex.value = 3;
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => <User size={size} color={color} />,
        }}
        listeners={{
          tabPress: () => {
            activeIndex.value = 4;
          },
        }}
      />
    </Tabs>
  );
}


const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    height: 70, // Match your desired tab bar height
    backgroundColor: '#FFFFFF', // Your desired background color
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    alignItems: 'center',
    position: 'relative', // Needed for absolute positioning of indicator
  },
  indicator: {
    position: 'absolute',
    bottom: 0, // Position at the bottom of the tab bar
    left: 0,
    width: TAB_WIDTH,
    height: 3,
    backgroundColor: '#7E3AF2',
    borderRadius: 1,
    // The translateX is handled by animated style
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10, // Adjust padding to visually align with the indicator at the bottom
  },
  tabBarLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginTop: 4, // Space between icon and label
  },
});
