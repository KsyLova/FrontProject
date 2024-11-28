export default {
    props: ['todo', 'index'],
    template: `
        <li class="todo-item">
            <span :class="{ completed: todo.completed }" class="todo-text">
                {{ todo.text }}
            </span>
            <div class="todo-buttons">
                <button @click="$emit('toggle-status', index)" class="status-button">
                    {{ todo.completed ? 'Вернуть' : 'Выполнено' }}
                </button>
                <button @click="$emit('delete-todo', index)" class="delete-button">
                    Удалить
                </button>
            </div>
        </li>
    `,
};
