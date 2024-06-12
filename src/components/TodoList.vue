<template>
    <div class="todo-container px-2">
      <label class="mt-3 mb-2"> Total completed todos: {{ completedCount }}</label>
      <div class="d-flex mb-3">
        <input class="form-control" v-model="newTodo" @keyup.enter="addNewTodo" placeholder="Add a new todo" />
        <button @click="addNewTodo" class="btn btn-info ms-2">{{!editingTodo ? 'Add' : 'Update'}}</button>
      </div>
      <div v-if="isLoading" class="text-center"> Loading please wait... </div>
      <ul v-else class="list-group">
        <li v-for="todo in todos" :key="todo.id" class="list-group-item todo-item d-flex align-space-between ">
          <label class="text-gold">
            <input type="checkbox" v-model="todo.done" @change="toggleDone()" />
            <span :class="{ 'text-decoration-line-through': todo.done }">{{ todo.label }}</span>
          </label>
          <div>
            <button @click="editTodo(todo)" class="btn btn-sm btn-primary">Edit</button>
            <button class="btn btn-sm btn-danger" @click="remove(todo.id)">Remove</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { computed, onMounted, ref, watch } from 'vue';
  import { useTodo } from '../composables/useTodo';
  import type { Todo } from '@/types/todo';
  
  const { todos, addTodo, toggleTodo, removeTodo, getTodos, updateTodo} = useTodo();
  const newTodo = ref<string>('');
  const editingTodo = ref<Todo | null>(null);
  const isLoading = ref<boolean>(false)

  onMounted(async() => {
    isLoading.value = true
    await getTodos()
    isLoading.value = false
  });

  const completedCount = computed(() =>
    todos.value.reduce((count, todo) => count + (todo.done ? 1 : 0), 0)
  );
  
  const addNewTodo = async () => {
    isLoading.value = true
    if (editingTodo.value) {
      await updateTodo(editingTodo.value.id!, newTodo.value);
      editingTodo.value = null;
      newTodo.value = ''
    }else {

      if (!newTodo.value.trim()) {
        alert('Todo cannot be empty');
        isLoading.value = false
        return;
      }
      
      if (todos.value.some((todo: Todo) =>{
        console.log(todo.label.toLowerCase()+" === "+newTodo.value.toLowerCase())
        if (todo.label && todo.label.toLowerCase() === newTodo.value.toLowerCase()) {
          alert(todo.label.toLowerCase()+" === "+newTodo.value.toLowerCase())
          return todo.label.toLowerCase()+" === "+newTodo.value.toLowerCase()
        }
         
      })) {
        alert('Todo already exists');
        isLoading.value = false
        return;
      }

      await addTodo(newTodo.value);
      newTodo.value = '';
    }
    isLoading.value = false
  };

  
  const editTodo = (todo: Todo) => {
    newTodo.value = todo.label;
    editingTodo.value = todo;
  }

  
  const toggleDone = async () => {
    isLoading.value = true
    await toggleTodo();
    isLoading.value = false
  };
  
  const remove = async (id: string) => {
    isLoading.value = true
    await removeTodo(id);
    isLoading.value = false
  };

  watch(newTodo, (todoLabel: string) => {
    if(!todoLabel){
      editingTodo.value = null;
    }
  });

  </script>
  
  <style scoped src="../../public/styles.css"></style>

  <style scoped>
  .todo-container {
    max-width: 600px;
    margin: 0 auto;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    border-bottom: 1px solid #ccc;
  }
  
  .done {
    text-decoration: line-through;
  }
  
  input[type='checkbox'] {
    margin-right: 0.5rem;
  }
  
  button {
    margin-left: 1rem;
  }
  </style>
  