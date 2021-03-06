import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/core';
import { Text, View } from '../../common/components/Themed';
import { StyleSheet } from 'react-native';
import { useNavigationOptions } from '../../hooks/useNavigationOptions';
import { BottomTabParamList } from '../../bottom-tabs';

export const Workout: React.FC = () => {
  const { params } = useRoute<RouteProp<BottomTabParamList, "Workout">>();

  useNavigationOptions({ headerTitle: params.name }, [params]);

  return (
    <View style={styles.container}>
      <Text>
        This is the page for the {params.name} workout
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
