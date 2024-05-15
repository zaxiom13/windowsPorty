<script lang="ts">
    export let direction: string;
  </script>
  
  <style>
    .resize-handle {
      position: absolute;
      background: transparent;
    }
  
    .resize-handle:hover {
      background: #95a5a6;
    }
  
    .resize-handle[data-direction*='top'] {
      top: -5px;
      height: 10px;
    }
  
    .resize-handle[data-direction*='bottom'] {
      bottom: -5px;
      height: 10px;
    }
  
    .resize-handle[data-direction*='left'] {
      left: -5px;
      width: 10px;
    }
  
    .resize-handle[data-direction*='right'] {
      right: -5px;
      width: 10px;
    }
  
    .resize-handle[data-direction='top-left'] {
      cursor: nwse-resize;
      width: 10px;
      height: 10px;
    }
  
    .resize-handle[data-direction='top-right'] {
      cursor: nesw-resize;
      width: 10px;
      height: 10px;
    }
  
    .resize-handle[data-direction='bottom-left'] {
      cursor: nesw-resize;
      width: 10px;
      height: 10px;
    }
  
    .resize-handle[data-direction='bottom-right'] {
      cursor: nwse-resize;
      width: 10px;
      height: 10px;
    }
  
    .resize-handle[data-direction='top'] {
      cursor: ns-resize;
      width: 100%;
    }
  
    .resize-handle[data-direction='bottom'] {
      cursor: ns-resize;
      width: 100%;
    }
  
    .resize-handle[data-direction='left'] {
      cursor: ew-resize;
      height: 100%;
    }
  
    .resize-handle[data-direction='right'] {
      cursor: ew-resize;
      height: 100%;
    }
  </style>
  
  <div class="resize-handle" data-direction={direction}></div>
  