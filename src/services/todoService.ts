import type { Todo } from "@/types/todo";

const TODO_KEY = 'vue-todo-app';

export const fetchTodos = (): Todo[] => {
  const todos = localStorage.getItem(TODO_KEY);
  return todos ? JSON.parse(todos) : [];
};

export const saveTodos = (todos: Todo[]): void => {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
};
