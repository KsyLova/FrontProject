<template>
  <div class="test-container">
    <div v-if="!testStarted" class="description">
      <h2>Тест на IQ</h2>
      <p>Этот тест поможет вам оценить ваш уровень интеллекта. Ответьте на все вопросы, и мы вычислим ваш IQ!</p>
    </div>

    <button v-if="!testStarted" @click="startTest" class="start-button">Начать тест</button>

    <div v-if="testStarted && currentQuestionIndex < questions.length && !testFinished" class="timer" id="timer">{{ timeLeft }} секунд</div>

    <div v-if="testStarted && currentQuestionIndex < questions.length && !testFinished" class="question-container">
      <div class="question-text">{{ currentQuestion.text }}</div>
      <div class="buttons-container">
        <button 
          v-for="(answer, index) in currentQuestion.answers" 
          :key="index"
          class="answer-button"
          @click="setAnswer(answer)"
        >
          {{ answer }}
        </button>
      </div>
    </div>

    <div v-if="testFinished" class="result">
      <p>{{ resultMessage }}</p>
      <button @click="resetTest" class="reset-button">Пройти тест заново</button>
    </div>

    <div class="button-container">
      <button @click="goBack" class="back-button">Вернуться на главный экран</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IQTest',
  data() {
    return {
      questions: [
        { text: 'Сколько будет 5 + 3?', answers: ['8', '7', '6', '9'], correct: '8' },
        { text: 'Какая фигура является следующей в последовательности: ◯, ◯, ◯, ?', answers: ['◯', '■', '△', '★'], correct: '◯' },
        { text: 'Какое число будет следующим в последовательности: 2, 4, 8, 16, ?', answers: ['32', '24', '20', '18'], correct: '32' },
        { text: 'Сколько будет 9 умножить на 7?', answers: ['63', '56', '72', '49'], correct: '63' },
        { text: 'Какое из чисел не подходит к остальным: 2, 3, 5, 7, 9?', answers: ['9', '7', '5', '3'], correct: '9' },
        { text: 'Что не является геометрической фигурой: квадрат, треугольник, пирамида, клетка?', answers: ['клетка', 'пирамида', 'треугольник', 'квадрат'], correct: 'клетка' },
        { text: 'Какое слово не является синонимом для остальных: сильный, мощный, слабый, крепкий?', answers: ['слабый', 'крепкий', 'мощный', 'сильный'], correct: 'слабый' },
        { text: 'Что будет следующим в ряду: 1, 4, 9, 16, ?', answers: ['25', '20', '30', '21'], correct: '25' },
        { text: 'В каком из этих слов содержится 4 буквы: зима, лето, осень, весна?', answers: ['лето', 'зима', 'осень', 'весна'], correct: 'лето' },
        { text: 'Что будет следующим в последовательности: 3, 6, 12, 24, ?', answers: ['48', '36', '72', '60'], correct: '48' }
      ],
      currentQuestionIndex: 0,
      answers: Array(10).fill(null),
      resultMessage: '',
      totalTestTime: 30, 
      timeLeft: 30, 
      timerInterval: null, 
      testStarted: false,
      testFinished: false, 
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    }
  },
  methods: {
    setAnswer(answer) {
      this.answers[this.currentQuestionIndex] = answer;
      this.nextQuestion();
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        this.calculateResult();
      }
    },
    calculateResult() {
      let score = 0;
      this.questions.forEach((question, index) => {
        if (this.answers[index] === question.correct) {
          score++;
        }
      });
      clearInterval(this.timerInterval); 
      this.resultMessage = `Ваш IQ: ${score * 10}.`;
      this.testFinished = true;
    },
    goBack() {
      clearInterval(this.timerInterval); 
      this.$emit('go-back');
    },
    startTest() {
      this.testStarted = true;
      this.startTestTimer(); 
    },
    startTestTimer() {
      this.timerInterval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          clearInterval(this.timerInterval);
          this.calculateResult(); 
        }
      }, 1000);
    },
    resetTest() {
      this.currentQuestionIndex = 0;
      this.answers = Array(10).fill(null);
      this.resultMessage = '';
      this.timeLeft = this.totalTestTime;
      this.testStarted = false;
      this.testFinished = false;
      clearInterval(this.timerInterval);
    }
  },
  beforeDestroy() {
    clearInterval(this.timerInterval); 
  }
};
</script>

<style scoped>
.back-button {
  background-color: #f44336;
  color: white;
  padding: 15px 30px;
  font-size: 1.2rem;
  cursor: pointer;
  border: none;
  margin-top: 30px;
  border-radius: 5px; 
  transition: transform 0.2s ease;
}

.back-button:hover {
  background-color: #d32f2f;
  transform: scale(1.1);
}

.test-container {
  text-align: center;
  padding: 20px;
}

.description {
  margin-bottom: 20px;
}

.description h2 {
  font-size: 24px;
  color: #333;
}

.description p {
  font-size: 18px;
  color: #555;
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
  background-color: #388E3C;
  transform: scale(1.05);
}

.start-button:active {
  background-color: #2C6B2F;
  transform: scale(1.1);
}

.question-container {
  margin-top: 30px;
}

.buttons-container {
  margin-top: 20px;
}

.answer-button {
  background-color: #007BFF;
  color: white;
  font-size: 18px;
  padding: 12px 30px;
  margin: 10px;
  border: none;
  cursor: pointer;
  border-radius: 15px; 
  transition: background-color 0.3s ease, transform 0.2s;
}

.answer-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.answer-button:active {
  background-color: #003f7f;
  transform: scale(1.1);
}

.result {
  margin-top: 30px;
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.timer {
  font-size: 18px;
  color: #555;
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}

.reset-button {
    background-color: #007BFF;
    color: white;
    padding: 15px 30px;
    font-size: 1.2rem;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    margin-top: 20px;
    transition: background-color 0.3s ease, transform 0.2s;
  }
  
  .reset-button:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
  @media (max-width: 768px) {
  .description h2 {
    font-size: 20px;
  }

  .description p {
    font-size: 16px;
  }

  .start-button,
  .reset-button,
  .back-button {
    font-size: 1rem;
    padding: 10px 20px;
  }

  .answer-button {
    font-size: 16px;
    padding: 10px 20px;
  }

  .result {
    font-size: 18px;
  }

  .test-container {
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .description h2 {
    font-size: 18px;
  }

  .description p {
    font-size: 14px;
  }

  .start-button,
  .reset-button,
  .back-button {
    font-size: 0.9rem;
    padding: 8px 15px;
  }

  .answer-button {
    font-size: 14px;
    padding: 8px 15px;
  }

  .result {
    font-size: 16px;
  }

  .test-container {
    padding: 5px;
  }
}
</style>