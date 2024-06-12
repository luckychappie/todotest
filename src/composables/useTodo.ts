import { ref } from 'vue';
import { fetchTodos, saveTodos } from '../services/todoService';
import { v4 as uuidv4 } from 'uuid';
import type { Todo } from '@/types/todo';

export const useTodo = () => {
  const todos = ref<Todo[]>([]);

  const getTodos = async () => {
    todos.value = await fetchTodos()
  };

  const addTodo = async (label: string) => {
    const newTodo: Todo = { id: uuidv4(), label, done: false };
    todos.value = [...todos.value, newTodo];
    await saveTodos(todos.value);
  };

  const toggleTodo = async (id: string) => {
    
    const updateTodos = todos.value = await todos.value.map(todo =>
      todo.id === id ? { ...todo } : todo
    );
    
    saveTodos(updateTodos);
  };

  const updateTodo = async (id: string, editLabel: string) => {
    
    todos.value = await todos.value.map(todo =>
      todo.id === id ? { ...todo, label: editLabel } : todo
    );
    
    saveTodos(todos.value);
  };

  const removeTodo = async (id: string) => {
    todos.value = await todos.value.filter(todo => todo.id !== id);
    saveTodos(todos.value);
  };

  return { todos, addTodo, toggleTodo, removeTodo, getTodos, updateTodo };
};
