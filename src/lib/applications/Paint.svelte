<script lang="ts">
import { onMount } from 'svelte';

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let isDrawing = false;
let color = '#000000';
let lineWidth = 1;
let tool = 'pencil';

onMount(() => {
  ctx = canvas.getContext('2d')!;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
});

function startDrawing(event: MouseEvent) {
  isDrawing = true;
  draw(event);
}

function stopDrawing() {
  isDrawing = false;
  ctx.beginPath();
}

function draw(event: MouseEvent) {
  if (!isDrawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = event.clientX + (2*rect.left);
  const y = event.clientY + (0.5*rect.top);

  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;

  if (tool === 'eraser') {
    ctx.strokeStyle = '#FFFFFF';
  }

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

</script>

<div class="paint-app">
  <div class="toolbar">
    <div class="tool-group">
      <button class:active={tool === 'pencil'} on:click={() => tool = 'pencil'}>Pencil</button>
      <button class:active={tool === 'eraser'} on:click={() => tool = 'eraser'}>Eraser</button>
    </div>
    <div class="tool-group">
      <input type="color" bind:value={color} />
      <select bind:value={lineWidth}>
        <option value={1}>1px</option>
        <option value={2}>2px</option>
        <option value={4}>4px</option>
        <option value={6}>6px</option>
      </select>
    </div>
    <div class="tool-group">
      <button on:click={clearCanvas}>Clear</button>
    </div>
  </div>
  <canvas
    bind:this={canvas}
    width={800}
    height={600}
    on:mousedown={startDrawing}
    on:mousemove={draw}
    on:mouseup={stopDrawing}
    on:mouseleave={stopDrawing}
  ></canvas>
</div>

<style>
.paint-app {
  display: flex;
  flex-direction: column;
  background-color: #ECE9D8;
  border: 1px solid #0A246A;
  font-family: 'Tahoma', sans-serif;
  width:100%;
  height:100%;
}

.toolbar {
  display: flex;
  background-color: #ECE9D8;
  padding: 5px;
  border-bottom: 1px solid #ACA899;
}

.tool-group {
  display: flex;
  margin-right: 10px;
}

button {
  background-color: #ECE9D8;
  border: 1px solid #ACA899;
  padding: 2px 5px;
  margin: 0 2px;
  cursor: pointer;
}

button:hover {
  background-color: #FDFCFE;
}

button.active {
  background-color: #D4D0C8;
  border-color: #404040;
}

input[type="color"] {
  width: 30px;
  height: 20px;
  padding: 0;
  border: 1px solid #ACA899;
}

select {
  background-color: #FFFFFF;
  border: 1px solid #ACA899;
}

canvas {
  background-color: #FFFFFF;
  cursor: crosshair;
}
</style>