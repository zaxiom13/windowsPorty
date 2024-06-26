<script lang="ts">
    import { writable, type Writable } from 'svelte/store';
  
    interface Element {
      type: 'button' | 'input' | 'label';
      x: number;
      y: number;
      id: number;
    }
  
    let canvas: HTMLDivElement;
    let elements: Writable<Element[]> = writable([]);
    let activeView: 'canvas' | 'code' = 'canvas';
  
    const paletteItems = [
      { type: 'button', label: 'Button' },
      { type: 'input', label: 'Input' },
      { type: 'label', label: 'Label' }
    ] as const;
  
    function handleDragStart(event: DragEvent, type: Element['type']) {
      event.dataTransfer?.setData('text/plain', type);
    }
  
    function handleDragOver(event: DragEvent) {
      event.preventDefault();
    }
  
    function handleDrop(event: DragEvent) {
      event.preventDefault();
      const type = event.dataTransfer?.getData('text/plain') as Element['type'] | undefined;
      if (type && canvas) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        elements.update(els => [...els, { type, x, y, id: Date.now() }]);
      }
    }
  
    function deleteElement(id: number) {
      elements.update(els => els.filter(el => el.id !== id));
    }
  
    $: generatedCode = (() => {
      let code = '<script lang="ts">\n\n<\/script>\n\n<div class="generated-app">\n';
      
      $elements.forEach(el => {
        switch (el.type) {
          case 'button':
            code += `  <button style="position: absolute; left: ${el.x}px; top: ${el.y}px;">Button</button>\n`;
            break;
          case 'input':
            code += `  <input type="text" style="position: absolute; left: ${el.x}px; top: ${el.y}px;" />\n`;
            break;
          case 'label':
            code += `  <label style="position: absolute; left: ${el.x}px; top: ${el.y}px;">Label</label>\n`;
            break;
        }
      });
  
      code += '</div>\n\n<style>\n  .generated-app {\n    position: relative;\n    width: 100%;\n    height: 100%;\n  }\n</style>';
      
      return code;
    })();
  </script>
  
  <div class="windows-maker">
    <div class="tabs">
      <button class:active={activeView === 'canvas'} on:click={() => activeView = 'canvas'}>Design</button>
      <button class:active={activeView === 'code'} on:click={() => activeView = 'code'}>Generated Code</button>
    </div>
  
    {#if activeView === 'canvas'}
      <div class="canvas-view">
        <div class="palette">
          {#each paletteItems as item}
            <div
              class="palette-item"
              draggable="true"
              on:dragstart={(e) => handleDragStart(e, item.type)}
            >
              {item.label}
            </div>
          {/each}
        </div>
        
        <div
          class="canvas"
          bind:this={canvas}
          on:dragover={handleDragOver}
          on:drop={handleDrop}
        >
          {#each $elements as element (element.id)}
            <div
              class="canvas-element"
              style="position: absolute; left: {element.x}px; top: {element.y}px;"
            >
              {#if element.type === 'button'}
                <button>Button</button>
              {:else if element.type === 'input'}
                <input type="text" />
              {:else if element.type === 'label'}
                <label>Label</label>
              {/if}
              <button class="delete-btn" on:click={() => deleteElement(element.id)}>X</button>
            </div>
          {/each}
        </div>
      </div>
    {:else}
      <div class="code-view">
        <pre>{generatedCode}</pre>
      </div>
    {/if}
  </div>
  
  <style>
    .windows-maker {
      display: flex;
      flex-direction: column;
      height: 100%;
      font-family: 'Tahoma', sans-serif;
    }
  
    .tabs {
      display: flex;
      background-color: #d4d0c8;
      border-bottom: 1px solid #808080;
    }
  
    .tabs button {
      padding: 5px 10px;
      border: none;
      background-color: transparent;
      cursor: pointer;
      font-size: 12px;
    }
  
    .tabs button.active {
      background-color: #ffffff;
      border: 1px solid #808080;
      border-bottom: none;
    }
  
    .canvas-view, .code-view {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
  
    .palette {
      display: flex;
      padding: 10px;
      background-color: #f0f0f0;
      border-bottom: 1px solid #ccc;
    }
  
    .palette-item {
      background-color: #fff;
      border: 1px solid #808080;
      padding: 5px 10px;
      margin-right: 10px;
      cursor: move;
      font-size: 12px;
    }
  
    .canvas {
      flex-grow: 1;
      position: relative;
      background-color: #fff;
      border: 1px solid #808080;
      overflow: auto;
    }
  
    .canvas-element {
      position: absolute;
    }
  
    .delete-btn {
      position: absolute;
      top: -10px;
      right: -10px;
      background-color: #ff0000;
      color: #ffffff;
      border: 1px solid #800000;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      font-size: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  
    .code-view {
      background-color: #ffffff;
      border: 1px solid #808080;
      overflow: auto;
      padding: 10px;
    }
  
    pre {
      white-space: pre-wrap;
      word-wrap: break-word;
      font-family: 'Courier New', monospace;
      font-size: 12px;
      margin: 0;
    }
  </style>