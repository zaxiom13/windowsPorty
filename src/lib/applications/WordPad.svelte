<script lang="ts">
    let text = '';
  </script>
  
  <div class="wordpad">
    <div class="toolbar">
      <button>Bold</button>
      <button>Italic</button>
      <button>Underline</button>
      <select>
        <option>Arial</option>
        <option>Times New Roman</option>
        <option>Courier New</option>
      </select>
      <select>
        <option>8</option>
        <option>10</option>
        <option>12</option>
        <option>14</option>
        <option>16</option>
      </select>
    </div>
    <textarea bind:value={text} placeholder="Type your text here..."></textarea>
  </div>
  
  <style>
    .wordpad {
      display: flex;
      flex-direction: column;
      height: 100%;
      font-family: 'Tahoma', sans-serif;
    }
    .toolbar {
      display: flex;
      gap: 5px;
      padding: 5px;
      background-color: #d4d0c8;
      border-bottom: 1px solid #808080;
    }
    button, select {
      font-size: 11px;
      padding: 2px 5px;
    }
    textarea {
      flex-grow: 1;
      resize: none;
      border: none;
      padding: 5px;
      font-family: 'Arial', sans-serif;
      font-size: 12px;
    }
  </style>