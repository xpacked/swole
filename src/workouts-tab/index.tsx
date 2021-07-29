import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { WorkoutList } from './workout-list';
import { Workout } from './workout';
import { IWorkout } from '../api';
import { Maybe } from '@unpacked/tool-belt';
import { useMaybeState } from '../hooks/useMaybeState';
import { Text } from '../common/components/Themed';

export type WorkoutsTabParams = {
  WorkoutList: { workouts: Maybe<IWorkout[]> };
  Workout: { name: string };
};

export type WorkoutsTabProps = {
  fetchWorkouts(): Promise<Maybe<IWorkout[]>>;
};

const { Navigator, Screen } = createStackNavigator<WorkoutsTabParams>();

export const WorkoutsTab: React.FC<WorkoutsTabProps> = (props) => {
  const [maybeWorkouts, setMaybeWorkouts] = useMaybeState<IWorkout[]>();

  async function fetchWorkouts() {
    const workouts = await props.fetchWorkouts();
    setMaybeWorkouts(workouts);
  }

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <Navigator>
      <Screen
        name="WorkoutList"
        options={{ headerTitle: 'Workouts' }}
      >
        {(props) => {
          return maybeWorkouts.inCaseOf({
            Just: (workouts) => <WorkoutList workouts={workouts} {...props} />,
            Nothing: () => <Text>Loading...</Text>
          });
        }}
      </Screen>
      <Screen
        name="Workout"
        component={Workout}
      />
    </Navigator>
  );
};
