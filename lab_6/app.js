import AddTodo from './components/AddTodo.js';
import TodoList from './components/TodoList.js';

const App = {
    components: { AddTodo, TodoList },
    data() {
        return {
            todos: [
                { text: 'Купить продукты', completed: false },
                { text: 'Сделать зарядку', completed: false},
                { text: 'Помыть полы', completed: false},
                { text: 'Сходить в зал', completed: false},
                { text: 'Протереть пыль', completed: false},
            ],
        };
    },
    methods: {
        addTodo(todoText) {
            if (todoText.trim()) {
                this.todos.push({ text: todoText.trim(), completed: false });
            }
        },
        deleteTodo(index) {
            this.todos.splice(index, 1);
        },
        toggleTodoStatus(index) {
            this.todos[index].completed = !this.todos[index].completed;
        },
    },
    template: `
        <div>
            <h1>Список дел</h1>
            <AddTodo @add-todo="addTodo" />
            <TodoList 
                :todos="todos" 
                @delete-todo="deleteTodo" 
                @toggle-status="toggleTodoStatus" 
            />
        </div>
    `,
};

Vue.createApp(App).mount('#app');
