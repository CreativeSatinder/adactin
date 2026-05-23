import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import TodoItem from './src/components/TodoItem';
import AddTodoModal from './src/components/AddTodoModal';
import FilterBar from './src/components/FilterBar';

const STORAGE_KEY = '@todos_v1';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((data) => {
      if (data) setTodos(JSON.parse(data));
    });
  }, []);

  const persist = useCallback((updated) => {
    setTodos(updated);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const addTodo = useCallback(
    ({ title, priority, dueDate }) => {
      const todo = {
        id: Date.now().toString(),
        title,
        priority,
        dueDate,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      persist([todo, ...todos]);
    },
    [todos, persist]
  );

  const toggleTodo = useCallback(
    (id) => persist(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))),
    [todos, persist]
  );

  const deleteTodo = useCallback(
    (id) => {
      Alert.alert('Delete Todo', 'Remove this item?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => persist(todos.filter((t) => t.id !== id)) },
      ]);
    },
    [todos, persist]
  );

  const filteredTodos = todos.filter((t) => {
    const statusOk =
      statusFilter === 'all' ||
      (statusFilter === 'active' && !t.completed) ||
      (statusFilter === 'completed' && t.completed);
    const priorityOk = priorityFilter === 'all' || t.priority === priorityFilter;
    return statusOk && priorityOk;
  });

  const counts = {
    total: todos.length,
    done: todos.filter((t) => t.completed).length,
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ExpoStatusBar style="light" />
      <StatusBar backgroundColor="#6C63FF" barStyle="light-content" />

      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Todos</Text>
          <Text style={styles.headerSub}>
            {counts.done}/{counts.total} completed
          </Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <FilterBar
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          onStatusChange={setStatusFilter}
          onPriorityChange={setPriorityFilter}
        />

        {filteredTodos.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>{todos.length === 0 ? '📝' : '🔍'}</Text>
            <Text style={styles.emptyTitle}>
              {todos.length === 0 ? 'No todos yet' : 'No matches'}
            </Text>
            <Text style={styles.emptySubtitle}>
              {todos.length === 0
                ? 'Tap the + button to add your first todo'
                : 'Try adjusting the filters'}
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredTodos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TodoItem todo={item} onToggle={toggleTodo} onDelete={deleteTodo} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
          />
        )}
      </View>

      <AddTodoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={addTodo}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#6C63FF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: '#6C63FF',
  },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#fff' },
  headerSub: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  addBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: { fontSize: 28, color: '#fff', fontWeight: '300', lineHeight: 32 },
  body: {
    flex: 1,
    backgroundColor: '#F5F5FA',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  list: { paddingBottom: 24 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 80 },
  emptyIcon: { fontSize: 56, marginBottom: 12 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#444', marginBottom: 6 },
  emptySubtitle: { fontSize: 15, color: '#999', textAlign: 'center' },
});
