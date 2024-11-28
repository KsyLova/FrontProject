import TodoItem from './TodoItem.js';

export default {
    props: ['todos'],
    components: { TodoItem },
    methods: {
        deleteTodo(index) {
            this.$emit('delete-todo', index);
        },
        toggleStatus(index) {
            this.$emit('toggle-status', index);
        },
    },
    template: `
        <ul class="todo-list">
            <TodoItem
                v-for="(todo, index) in todos"
                :key="index"
                :todo="todo"
                :index="index"
                @delete-todo="deleteTodo"
                @toggle-status="toggleStatus"
            />
        </ul>
    `,
};
