export default {
    data() {
        return {
            todoText: '',
        };
    },
    methods: {
        addTodo() {
            if (this.todoText.trim()) {
                this.$emit('add-todo', this.todoText);
                this.todoText = '';
            } else {
                alert('Введите текст задачи!');
            }
        },
    },
    template: `
        <div class="add-todo-container">
            <input
                v-model="todoText"
                placeholder="Добавить задачу"
                class="add-input"
            />
            <button @click="addTodo" class="add-button">Добавить</button>
        </div>
    `,
};
