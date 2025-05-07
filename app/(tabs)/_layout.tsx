import { Tabs } from 'expo-router';
import {
  CreditCard,
  Grid2x2 as Grid,
  Chrome as Home,
  User,
  Users,
} from 'lucide-react-native';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const TAB_WIDTH = width / 5; // Assuming 5 tabs

export default function TabLayout() {
  // Use useSharedValue for values that drive animations
  const activeIndex = useSharedValue(0);

  const indicatorPosition = useDerivedValue(() => {
    // Use withSpring for a bouncy animation, or withTiming for a smooth transition
    return withSpring(activeIndex.value * TAB_WIDTH, {
      damping: 20,
      stiffness: 90,
    });
  });

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: indicatorPosition.value }],
    };
  });

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: 'none', // Hide the default tab bar
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F1F5F9',
          height: Platform.OS === 'android' ? 60 : 70,
          paddingBottom: Platform.OS === 'ios' ? 20 : 0,
          shadowOffset: {
            width: 0,
            height: -1,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
      }}
      tabBar={(props) => {
        const currentRoute = props.state.routes[props.state.index];
        const currentIndex = props.state.index;
        if (activeIndex.value !== currentIndex) {
          activeIndex.value = currentIndex;
        }

        return (
          <View
            style={[
              styles.tabBarContainer,
              { height: Platform.OS === 'android' ? 60 : 70 },
            ]}
          >
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
                home: Home,
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
                  style={[
                    styles.tabButton,
                    { paddingTop: Platform.OS === 'android' ? 5 : 10 },
                  ]}
                >
                  {Icon && (
                    <Icon
                      size={Platform.OS === 'android' ? 22 : 24}
                      color={isFocused ? '#7E3AF2' : '#94A3B8'}
                    />
                  )}
                  <Text
                    style={[
                      styles.tabBarLabel,
                      {
                        color: isFocused ? '#7E3AF2' : '#94A3B8',
                        fontSize: Platform.OS === 'android' ? 11 : 12,
                        marginTop: Platform.OS === 'android' ? 2 : 4,
                      },
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
        name="home"
        options={{
          title: 'Home',
          // Icon is now rendered in the custom tabBar
          tabBarIcon: () => null, // Or keep if you still use it elsewhere
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: 'Services',
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          title: 'Payments',
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: () => null,
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
