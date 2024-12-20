<template>
    <div class="test-container">
      <h2 class="test-title">Тест на реакцию</h2>
      
      <div v-if="!testStarted" class="test-description">
        <p>В этом тесте ваша задача — как можно быстрее нажать на кнопку, когда она появится на экране.</p>
        <p>Кнопка будет показываться в случайный момент времени (от 2 до 5 секунд). Чем быстрее вы нажмете, тем лучше ваш результат!</p>
      </div>
  
      <div v-if="!testStarted" class="button-container">
        <button @click="startTest" class="start-button">Начать тест</button>
      </div>
  
      <div v-if="testStarted && !waitingForReaction && !resultVisible" class="timer">
        <p>{{ timerText }}</p>
      </div>
  
      <div v-if="waitingForReaction" class="reaction-button-container">
        <button @click="recordReaction" class="reaction-button">Клик!</button>
      </div>
  
      <div v-if="resultVisible" class="result">
        <p>Время реакции: {{ reactionTime }} миллисекунд</p>
        <p>Оценка: {{ evaluation }}</p>
        <button @click="startTest"class="start-button">Попробовать снова</button>
      </div>

      <button @click="goBack" class="back-button">Вернуться на главный экран</button>
    </div>
  </template>  
  
  <script>
  export default {
    data() {
      return {
        testStarted: false,
        waitingForReaction: false,
        reactionTime: null,
        timerInterval: null,
        waitTime: 0,
        timerText: 'Ждите сигнал...',
        resultVisible: false,
        startTime: null,
      };
    },
    computed: {
      evaluation() {
        return this.getEvaluation();
      },
    },
    methods: {
      startTest() {
        this.testStarted = true;
        this.waitingForReaction = false;
        this.reactionTime = null;
        this.resultVisible = false;
        this.timerText = 'Ждите сигнал...';
  
        this.waitTime = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
  
        this.timerInterval = setTimeout(this.showReactionButton, this.waitTime);
      },
  
      showReactionButton() {
        this.waitingForReaction = true;
        this.startTime = Date.now(); 
      },
  
      recordReaction() {
        const reactionTimeInMs = Date.now() - this.startTime;
        this.reactionTime = Math.round(reactionTimeInMs);
  
        clearTimeout(this.timerInterval);
        this.waitingForReaction = false;
        this.resultVisible = true;
      },
  
      getEvaluation() {
        if (this.reactionTime < 200) {
          return 'Отлично';
        } else if (this.reactionTime <= 400) {
          return 'Хорошо';
        } else {
          return 'Плохо';
        }
      },
  
      retryTest() {
        this.resultVisible = false;
        this.startTest();
      },
  
      goBack() {
        this.$emit('go-back'); 
      },
    },
  };
  </script>
  
  <style scoped>
  .test-container {
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
  
  .button-container {
    display: flex;
    justify-content: center;
    gap: 20px; 
    margin-bottom: 30px;
  }
  
  .start-button {
    background-color: #28a745;
    color: white;
    padding: 15px 30px;
    font-size: 1.2rem;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s ease, transform 0.2s;
  }
  
  .start-button:hover {
    background-color: #218838;
    transform: scale(1.05);
  }
  
  .timer p {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }
  
  .reaction-button-container {
    margin-top: 30px;
  }
  
  .reaction-button {
    background-color: #dc3545;
    color: white;
    padding: 20px 50px;
    font-size: 1.5rem;
    cursor: pointer;
    border: none;
    border-radius: 50px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, transform 0.2s;
  }
  
  .reaction-button:hover {
    background-color: #c82333;
    transform: scale(1.05);
  }
  
  .result {
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 20px;
    color: #333;
  }
  
  
  .back-button {
    background-color: #f44336;
    color: white;
    padding: 15px 30px;
    font-size: 1.2rem;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    margin-top: 30px;
    transition: background-color 0.3s ease, transform 0.2s;
  }
  
  .back-button:hover {
    background-color: #c0392b;
    transform: scale(1.05);
  }
  @media (max-width: 768px) {
    .test-title {
      font-size: 1.8rem;
    }

    .test-description {
      font-size: 1rem;
    }

    .start-button, .reaction-button, .retry-button, .back-button {
      padding: 10px 20px;
      font-size: 1rem;
    }

    .reaction-button {
      padding: 15px 40px;
      font-size: 1.3rem;
    }

    .timer p {
      font-size: 1.3rem;
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

    .start-button, .reaction-button, .retry-button, .back-button {
      padding: 8px 15px;
      font-size: 0.9rem;
    }

    .reaction-button {
      padding: 10px 30px;
      font-size: 1.1rem;
    }

    .timer p {
      font-size: 1.1rem;
    }

    .result {
      font-size: 1.1rem;
    }
  }
  </style>
  