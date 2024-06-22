<script lang="ts">
    let display = '0';
    let currentOperation = '';
    let previousValue = 0;
  
    function handleButtonClick(value: string) {
      if (value === 'C') {
        display = '0';
        currentOperation = '';
        previousValue = 0;
      } else if (value === '=') {
        calculate();
      } else if (['+', '-', '*', '/'].includes(value)) {
        currentOperation = value;
        previousValue = parseFloat(display);
        display = '0';
      } else {
        display = display === '0' ? value : display + value;
      }
    }
  
    function calculate() {
      const currentValue = parseFloat(display);
      let result = 0;
      switch (currentOperation) {
        case '+':
          result = previousValue + currentValue;
          break;
        case '-':
          result = previousValue - currentValue;
          break;
        case '*':
          result = previousValue * currentValue;
          break;
        case '/':
          result = previousValue / currentValue;
          break;
      }
      display = result.toString();
      currentOperation = '';
    }
  </script>
  
  <div class="calculator">
    <div class="display">{display}</div>
    <div class="buttons">
      {#each ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', 'C', '=', '+'] as button}
        <button on:click={() => handleButtonClick(button)}>{button}</button>
      {/each}
    </div>
  </div>
  
  <style>
    .calculator {
      width: 200px;
      margin: 10px auto;
      background-color: #d4d0c8;
      border: 2px solid #808080;
      border-top-color: #ffffff;
      border-left-color: #ffffff;
    }
    .display {
      background-color: #ffffff;
      border: 1px solid #808080;
      margin: 5px;
      padding: 5px;
      text-align: right;
      font-family: 'Courier New', monospace;
    }
    .buttons {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2px;
      padding: 5px;
    }
    button {
      background-color: #d4d0c8;
      border: 2px solid #808080;
      border-top-color: #ffffff;
      border-left-color: #ffffff;
      padding: 5px;
      font-family: 'Tahoma', sans-serif;
      font-size: 12px;
    }
    button:active {
      border: 2px solid #808080;
      border-bottom-color: #ffffff;
      border-right-color: #ffffff;
    }
  </style>