import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTasks } from '../context/TasksContext';
import colors from '../assets/colors';
import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
} from  '../assets/responsive';
export default function DetailScreen({ route, navigation }) {
  const { task } = route.params;
  const { updateTask } = useTasks();

  const [completed, setCompleted] = useState(task.completed);

  const handleToggle = async () => {
    const updatedTask = {
      ...task,
      completed: !completed,
    };

    setCompleted(prev => !prev);
    await updateTask(updatedTask);

    // Update route params so header/back navigation stays correct
    navigation.setParams({ task: updatedTask });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{task.title}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.label}>User ID</Text>
          <Text style={styles.value}>{task.userId}</Text>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.label}>Status</Text>
          <View
            style={[
              styles.statusBadge,
              completed ? styles.completed : styles.incomplete,
            ]}
          >
            <Text style={styles.statusText}>
              {completed ? 'Completed' : 'Incomplete'}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={handleToggle}
      >
        <Text style={styles.actionText}>
          {completed ? 'Mark as Incomplete' : 'Mark as Completed'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(16),
    backgroundColor: colors.screenBackground,
  },

  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: moderateScale(14),
    padding: scale(16),
    elevation: 3,
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: moderateScale(8),
    shadowOffset: { width: 0, height: 3 },
  },

  title: {
    fontSize: fontScale(18),
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: verticalScale(16),
  },

  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },

  label: {
    fontSize: fontScale(14),
    color: colors.textMuted,
  },

  value: {
    fontSize: fontScale(14),
    fontWeight: '500',
    color: colors.textSecondary,
  },

  statusBadge: {
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: moderateScale(14),
  },

  completed: {
    backgroundColor: colors.completedBg,
  },

  incomplete: {
    backgroundColor: colors.incompleteBg,
  },

  statusText: {
    fontSize: fontScale(13),
    fontWeight: '600',
    color: colors.textPrimary,
  },

  actionButton: {
    marginTop: verticalScale(24),
    backgroundColor: colors.primary,
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(12),
    alignItems: 'center',
  },

  actionText: {
    color: colors.textInverse,
    fontSize: fontScale(15),
    fontWeight: '600',
  },
});
