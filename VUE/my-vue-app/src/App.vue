<template>
    <div class="container">
      <!-- Вводная информация -->
      <div v-if="!testSelected" class="intro">
        <h1>Добро пожаловать в тестовый центр</h1>
        <p>
          Здесь вы можете проверить свои знания, навыки и логику. 
          Выберите один из предложенных тестов, чтобы начать!
        </p>
      </div>
      
      <!-- Выбор теста -->
      <div v-if="!testSelected" class="test-selection">
        <button @click="selectTest('test1')" class="start-button">Тест 1</button>
        <button @click="selectTest('test2')" class="start-button">Тест 2</button>
        <button @click="selectTest('test3')" class="start-button">Тест 3</button>
      </div>
  
      <!-- Тест 1 -->
      <div v-if="testSelected === 'test1'">
        <Test1 @go-back="goBack" />
      </div>
  
      <!-- Тест 2 -->
      <div v-if="testSelected === 'test2'">
        <Test2 @go-back="goBack" />
      </div>
  
      <!-- Тест 3 -->
      <div v-if="testSelected === 'test3'">
        <Test3 @go-back="goBack" />
      </div>
    </div>
  </template>
  
  <script>
  import Test1 from './tests/Test1.vue';
  import Test2 from './tests/Test2.vue';
  import Test3 from './tests/Test3.vue';
  
  export default {
    components: {
      Test1,
      Test2,
      Test3,
    },
    data() {
      return {
        testSelected: null, // Стейт для отслеживания выбранного теста
      };
    },
    methods: {
      selectTest(test) {
        this.testSelected = test; // Устанавливаем выбранный тест
      },
      goBack() {
        this.testSelected = null; // Сбрасываем выбор теста, чтобы вернуть пользователя к выбору тестов
      },
    },
  };
  </script>
  
  <style scoped>
  /* Основной контейнер */
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center; /* Центрирование по вертикали */
    align-items: center; /* Центрирование по горизонтали */
    height: 100vh; /* Полная высота экрана */
    text-align: center;
    background: linear-gradient(to bottom right, #f0f0f0, #d9d9d9); /* Минималистичный градиент */
    font-family: 'Arial', sans-serif; /* Простой шрифт */
  }
  
  /* Вводная информация */
  .intro {
    margin-bottom: 20px;
    color: #333;
  }
  
  .intro h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }
  
  .intro p {
    font-size: 1.2rem;
    color: #555;
  }
  
  /* Выбор теста */
  .test-selection {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  /* Стиль для кнопок */
  .start-button {
    padding: 15px 30px;
    font-size: 1.2rem;
    cursor: pointer;
    border: none;
    border-radius: 10px;
    background-color: #007BFF;
    color: white;
    font-weight: bold;
    transition: transform 0.2s, background-color 0.3s;
  }
  
  .start-button:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
  
  .start-button:active {
    background-color: #003f7f;
    transform: scale(1);
  }
  
  /* Для заголовка */
  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  @media (max-width: 480px) {
  .intro h1 {
    font-size: 1.8rem;
  }

  .intro p {
    font-size: 1rem;
  }

  .start-button {
    padding: 12px 25px;
    font-size: 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  .test-selection {
    gap: 10px;
  }
}

/* Медиазапросы для планшетов (до 768px) */
@media (max-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }

  .intro p {
    font-size: 1.1rem;
  }

  .start-button {
    padding: 14px 28px;
    font-size: 1.1rem;
  }

  h1 {
    font-size: 2.2rem;
  }

  .test-selection {
    gap: 12px;
  }
}
  </style>
  