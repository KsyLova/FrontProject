<template>
    <div class="button-container">
      <button @click="selectTest('test1')">Тест 1</button>
      <button @click="selectTest('test2')">Тест 2</button>
      <button @click="selectTest('test3')">Тест 3</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      selectTest(test) {
        this.$emit('select-test', test); 
      },
    },
  };
  </script>
  
  <style>
  .button-container {
    display: flex;
    justify-content: center; 
    align-items: center; 
    height: 100vh; 
    flex-direction: column; 
  }
  
  button {
    margin: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  </style>
  