import { Stack } from 'expo-router';
import React from 'react';

const CommunityLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="discussions/[id]"
        options={{
          presentation: 'card',
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="events/[id]"
        options={{
          presentation: 'card',
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="create-discussion"
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name="create-event"
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
    </Stack>
  );
};

export default CommunityLayout;