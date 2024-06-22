<script lang="ts">
    let text = '';
  </script>
  
  <div class="notepad">
    <textarea bind:value={text} placeholder="Type your text here..."></textarea>
  </div>
  
  <style>
    .notepad {
      width: 100%;
      height: 100%;
      padding: 5px;
      box-sizing: border-box;
    }
    textarea {
      width: 100%;
      height: 100%;
      resize: none;
      border: 1px solid #808080;
      background-color: #ffffff;
      font-family: 'Courier New', monospace;
      font-size: 12px;
      padding: 5px;
      box-sizing: border-box;
    }
  </style>