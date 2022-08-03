<template>
  <div class="badass-todo">

    <div class="title has-text-centered">
      Badass Todo
    </div>

    <form @submit.prevent="addTodo">
      <div class="field is-grouped mb-5">
        <p class="control is-expanded">
          <input v-model="newTodoContent" class="input" type="text" placeholder="Add a todo">
        </p>
        <p class="control">
          <button class="button is-info" :disabled="!newTodoContent">
            Add
          </button>
        </p>
      </div>
    </form>

    <div class="card mb-5" v-for="todo in todos" :key="todo.id" :class="{'has-background-success-light' : todo.done}">
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div class="column" :class="{'has-text-success line-through': todo.done}">{{todo.content}}</div>
            <div class="column is-5 has-text-right">
              <button @click="toggleDone(todo.id)" class="button" :class="todo.done ? 'is-success':'is-light'" >&check;</button>
              <button @click="deleteTodo(todo.id)" class="button is-danger ml-2">&cross;</button>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import {ref, onMounted} from 'vue'
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore"; 
  import {db} from '@/firebase'

const todoCollectionRefs = collection(db, "todos")
const todoCollectionQuery = query(todoCollectionRefs, orderBy("date", 'desc'));

  export default{
    name: 'App',
    setup(){
      const todos = ref([
        // {
        //   id: '1',
        //   content: 'Eat Ice',
        //   done: false
        // },
        // {
        //   id: '2',
        //   content: 'Eat Ice2',
        //   done: true
        // },
        // {
        //   id: '3',
        //   content: 'Eat Ice3',
        //   done: false
        // },
      ])

      const newTodoContent = ref('')

      onMounted(()=>{
        onSnapshot(todoCollectionQuery, (querySnapshot) => {
          const fbTodos = [];
          querySnapshot.forEach((doc) => {
            const todo = {
              id: doc.id,
              content: doc.data().content,
              done: doc.data().done
            }

            fbTodos.push(todo)
          });
          todos.value = fbTodos;
        });

      })

      return {todos, newTodoContent}
    },
    methods: {
      addTodo(){
        addDoc(todoCollectionRefs, {
          content: this.newTodoContent,
          done: false,
          date: Date.now()
        });

        this.newTodoContent = ''
      },
      deleteTodo(id) {
        // this.todos = this.todos.filter((todo)=> todo.id !== id)

        deleteDoc(doc(todoCollectionRefs, id));
      },
      toggleDone(id){
        const index = this.todos.findIndex(todo => todo.id === id)

        updateDoc(doc(todoCollectionRefs, id), {
          done: !this.todos[index].done
        });
      }
    }
  }



</script>

<style>
  @import '../node_modules/bulma/css/bulma.min.css';
  

  .badass-todo{
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
  }

  .line-through{
    text-decoration: line-through;
  }

</style>