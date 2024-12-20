<template>
    <div>
      <div v-if="!testStarted && !testEnded" class="menu">
        <h1 class="test-title">Тест Струпа</h1>
        <p class="test-description">
          Добро пожаловать! В этом тесте вам нужно выбрать правильное слово, которое соответствует цвету текста. У вас будет 10 секунд, чтобы ответить на максимальное количество вопросов.
        </p>
        <div class="button-container">
          <button @click="startTest" class="start-button">Начать тест</button>
          <button @click="returnToMenu" class="back-button">Вернуться на главный экран</button>
        </div>
      </div>
  
      <div v-if="testStarted" class="test">
        <div class="timer">{{ remainingTime }} секунд</div>
        <div class="word" :style="{ color: wordColor }">{{ wordText }}</div>
        <div class="buttons">
          <button
            v-for="(option, index) in options"
            :key="index"
            :style="{ backgroundColor: option.color }"
            class="button"
            @click="checkAnswer(option.text)"
          >
            {{ option.text }}
          </button>
        </div>
        <div class="result">Правильные ответы: {{ correctAnswers }}</div>
        <button @click="returnToMenu" class="back-button">Вернуться на главный экран</button>
      </div>
  
      <div v-if="testEnded" class="summary">
        <div class="result">Тест завершён! Правильные ответы: {{ correctAnswers }}.</div>
        <div class="result">Оценка: {{ evaluation }}</div>
        <div class="button-container">
          <button @click="startTest" class="start-button">Пройти тест снова</button>
          <button @click="returnToMenu" class="back-button">Назад на главный экран</button>
        </div>
      </div>
    </div>
  </template>  
  
  <script>
  export default {
    data() {
      return {
        words: [
          { text: 'Красный', color: 'red' },
          { text: 'Синий', color: 'blue' },
          { text: 'Зеленый', color: 'green' },
          { text: 'Желтый', color: 'yellow' },
        ],
        correctAnswers: 0,
        startTime: null,
        timerInterval: null,
        remainingTime: 10, 
        testStarted: false,
        testEnded: false,
        wordText: '',
        wordColor: '',
        options: [],
        evaluation: '',
      };
    },
    methods: {
      shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
      },
      updateTimer() {
        const elapsedTime = Date.now() - this.startTime;
        this.remainingTime = Math.max(0, 10 - Math.floor(elapsedTime / 1000));
  
        if (this.remainingTime <= 0) {
          this.endTest();
        }
      },
      startTest() {
        clearInterval(this.timerInterval);
        this.testStarted = true;
        this.testEnded = false;
        this.correctAnswers = 0;
        this.startTime = Date.now();
        this.remainingTime = 10; 
        this.timerInterval = setInterval(this.updateTimer, 1000); 
        this.nextQuestion();
        },
      nextQuestion() {
        if (this.remainingTime <= 0) { 
          this.endTest();
          return;
        }
  
        const currentWord = this.words[Math.floor(Math.random() * this.words.length)];
        this.wordText = currentWord.text;
        this.wordColor = this.words[Math.floor(Math.random() * this.words.length)].color;
  
        this.options = this.shuffle([...this.words]);
      },
      checkAnswer(selectedText) {
        if (selectedText === this.wordText) {
          this.correctAnswers++;
        }
        this.nextQuestion(); 
      },
      endTest() {
        clearInterval(this.timerInterval); 
        this.testStarted = false;
        this.testEnded = true;
        this.evaluate();
      },
      evaluate() {
        const percentage = (this.correctAnswers / 15) * 100; 
        if (percentage >= 90) {
          this.evaluation = 'Отлично!';
        } else if (percentage >= 70) {
          this.evaluation = 'Хорошо';
        } else {
          this.evaluation = 'Попробуйте еще раз';
        }
      },
      returnToMenu() {
        this.testStarted = false;
        this.testEnded = false;
        this.$emit('go-back');
      },
    },
  };
  </script>  
  
  <style scoped>
  body {
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
    background-color: #f0f0f0;
  }
  .hidden {
    display: none;
  }
  .menu, .test, .summary {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
    padding: 20px;
  }
  .test-title {
    font-size: 2rem;
    color: #333;
    margin-bottom: 20px;
  }
  .test-description {
    font-size: 1.2rem;
    color: #555;
    margin-bottom: 30px;
    line-height: 1.5;
  }
  .timer {
    font-size: 1.2rem;
    color: #555;
  }
  .word {
    font-size: 3rem;
    font-weight: bold;
    margin: 20px;
  }
  .buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .button {
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    color: white;
    font-weight: bold;
  }
  .result {
    margin-top: 20px;
    font-size: 1.5rem;
    color: #333;
  }
  .start-button, .back-button {
    background-color: #28a745;
    color: white;
    padding: 15px 30px;
    font-size: 1.2rem;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s ease, transform 0.2s;
  }
  .back-button {
    background-color: #f44336;;
    margin-top: 20px;
  }
  .start-button:hover, .back-button:hover {
    transform: scale(1.1);
  }
  .button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  @media (max-width: 768px) {
  .test-title {
    font-size: 1.8rem;
  }

  .test-description {
    font-size: 1rem;
  }

  .timer {
    font-size: 1.1rem;
  }

  .word {
    font-size: 2.5rem;
  }

  .button {
    padding: 8px 16px;
    font-size: 0.9rem;
  }

  .start-button, .back-button {
    padding: 8px 16px;
    font-size: 1rem;
  }

  .result {
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .test-title {
    font-size: 1.5rem;
  }

  .test-description {
    font-size: 0.9rem;
  }

  .timer {
    font-size: 1rem;
  }

  .word {
    font-size: 2rem;
  }

  .button {
    padding: 8px 14px;
    font-size: 0.8rem;
  }

  .start-button, .back-button {
    padding: 8px 14px;
    font-size: 1rem;
  }

  .result {
    font-size: 1.2rem;
  }
}
  </style>
  