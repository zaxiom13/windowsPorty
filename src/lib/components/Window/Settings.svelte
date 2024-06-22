<script lang="ts">
    import { backgroundColor } from './backgroundColorStore';
    
    let soundEnabled = true;
    let screenSaverTimeout = 15;
  
    function handleApply() {
      // In a real application, you might want to save these settings to some persistent storage
      console.log('Settings applied');
    }
  </script>
  
  <div class="settings">
    <h2>Display Settings</h2>
    <div class="setting">
      <label for="background-color">Background Color:</label>
      <input type="color" id="background-color" bind:value={$backgroundColor}>
    </div>
  
    <h2>Sound Settings</h2>
    <div class="setting">
      <label>
        <input type="checkbox" bind:checked={soundEnabled}>
        Enable System Sounds
      </label>
    </div>
  
    <h2>Screen Saver</h2>
    <div class="setting">
      <label for="screensaver-timeout">Wait</label>
      <input type="number" id="screensaver-timeout" bind:value={screenSaverTimeout} min="1" max="60">
      <span>minutes</span>
    </div>
  
    <button class="apply-button" on:click={handleApply}>Apply</button>
  </div>
  
  <style>
    .settings {
      padding: 10px;
      font-family: 'Tahoma', sans-serif;
      font-size: 11px;
    }
    h2 {
      font-size: 14px;
      margin-top: 15px;
      margin-bottom: 5px;
      border-bottom: 1px solid #808080;
    }
    .setting {
      margin-bottom: 10px;
    }
    label {
      display: inline-block;
      width: 150px;
    }
    input[type="color"] {
      width: 50px;
      height: 20px;
      border: 1px solid #808080;
    }
    input[type="number"] {
      width: 40px;
    }
    .apply-button {
      background-color: #d4d0c8;
      border: 2px solid #808080;
      border-top-color: #ffffff;
      border-left-color: #ffffff;
      padding: 5px 10px;
      font-family: 'Tahoma', sans-serif;
      font-size: 11px;
      margin-top: 10px;
    }
    .apply-button:active {
      border: 2px solid #808080;
      border-bottom-color: #ffffff;
      border-right-color: #ffffff;
    }
  </style>