import { describe, it, expect, beforeEach } from 'vitest'
import { fetchTodos, saveTodos } from '../../src/services/todoService';
import { Todo } from '../../src/types/todo';

describe('todoService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should fetch todos from local storage', () => {
    const todos: Todo[] = [{ id: '1', label: 'Test Todo', done: false }];
    localStorage.setItem('vue-todo-app', JSON.stringify(todos));
    expect(fetchTodos()).toEqual(todos);
  });

  it('should save todos to local storage', () => {
    const todos: Todo[] = [{ id: '1', label: 'Test Todo', done: false }];
    saveTodos(todos);
    expect(localStorage.getItem('vue-todo-app')).toEqual(JSON.stringify(todos));
  });
});
