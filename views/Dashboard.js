import React from 'react';
import { SafeAreaView } from 'react-native';
import { View, Text } from 'react-native';
import styleDashboard from '../styles/styleDashboard';

export default function Dashboard({email}) {
  return (
    <SafeAreaView style={styleDashboard.container}>
      <Text style={{color: 'white'}}>{email}</Text>
     </SafeAreaView>
  );
}
