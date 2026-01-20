import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import { useTasks } from '../context/TasksContext';
import colors from '../assets/colors';
import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
} from  '../assets/responsive';



export default function HomeScreen({ navigation }) {
  const { tasks, loading, error, reload } = useTasks();
  const [filter, setFilter] = useState('ALL');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'COMPLETED') return task.completed;
    if (filter === 'INCOMPLETE') return !task.completed;
    return true;
  });

  if (loading) {
    return <ActivityIndicator style={styles.center} size="large" />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
        <Button title="Retry" onPress={reload} />
      </View>
    );
  }
  const FILTERS = [
    { key: 'ALL', label: 'All' },
    { key: 'COMPLETED', label: 'Completed' },
    { key: 'INCOMPLETE', label: 'Incomplete' },
  ];

  const TaskItem = ({ item, onPress }) => {
    const completed = item.completed;

    return (
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={onPress}
        style={styles.card}
      >
        <View style={styles.cardHeader}>
          <Text
            style={styles.title}
            numberOfLines={2}
          >
            {item.title}
          </Text>

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

        <Text style={styles.subText}>
          User ID: {item.userId}
        </Text>
      </TouchableOpacity>
    );
  };


  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        {FILTERS.map(({ key, label }) => {
          const isActive = filter === key;
          return (
            <TouchableOpacity
              key={key}
              onPress={() => setFilter(key)}
              activeOpacity={0.7}
              style={[
                styles.filterButton,
                isActive && styles.filterButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  isActive && styles.filterTextActive,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>


      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem
            item={item}
            onPress={() => navigation.navigate('Details', { task: item })}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        initialNumToRender={10}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No tasks found.
          </Text>
        }
      />

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(16),
    backgroundColor: colors.screenBackground,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  filters: {
    flexDirection: 'row',
    backgroundColor: colors.filterBackground,
    borderRadius: moderateScale(10),
    padding: scale(4),
    marginBottom: verticalScale(12),
  },

  filterButton: {
    flex: 1,
    paddingVertical: verticalScale(10),
    alignItems: 'center',
    borderRadius: moderateScale(8),
  },

  filterButtonActive: {
    backgroundColor: colors.primary,
  },

  filterText: {
    fontSize: fontScale(14),
    fontWeight: '500',
    color: colors.textSecondary,
    textAlign:'left',
  },

  filterTextActive: {
    color: colors.textInverse,
    fontWeight: '600',
  },

  listContent: {
    paddingBottom: verticalScale(16),
  },

  card: {
    backgroundColor: colors.cardBackground,
    padding: scale(14),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(12),
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: moderateScale(6),
    shadowOffset: { width: 0, height: 2 },
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: scale(8),
  },

  title: {
    flex: 1,
    fontSize: fontScale(16),
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign:'left',
  },

  statusBadge: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(12),
  },

  completed: {
    backgroundColor: colors.completedBg,
  },

  incomplete: {
    backgroundColor: colors.incompleteBg,
  },

  statusText: {
    fontSize: fontScale(12),
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign:'left',
  },

  subText: {
    marginTop: verticalScale(6),
    fontSize: fontScale(13),
    color: colors.textSecondary,
    textAlign:'left',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: verticalScale(40),
    color: colors.textMuted,
    fontSize: fontScale(14),
  },
});
