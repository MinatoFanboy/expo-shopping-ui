import React from 'react';

/** Router */
import { Tabs } from 'expo-router';

/** Tab Component */
import TabBar from '@/components/TabBar';

export default function TabLayout() {
    return (
        <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="index" options={{ title: 'Home' }} />
            <Tabs.Screen name="favorite" options={{ title: 'My Favorite' }} />
            <Tabs.Screen name="cart" options={{ href: null, title: 'My Cart' }} />
            <Tabs.Screen name="notification" options={{ href: null, title: 'Notifications' }} />
        </Tabs>
    );
}
