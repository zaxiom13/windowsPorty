<script lang="ts">
	export let direction: string;
</script>

<div class="resize-handle" data-direction={direction} on:mousedown></div>

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

	.resize-handle {
		position: absolute;
		width: 10px;
		height: 10px;
		background-color: transparent;
		z-index: 1000;
	}

	.resize-handle.top-left {
		top: 0;
		left: 0;
		cursor: nwse-resize;
	}
	.resize-handle.top-right {
		top: 0;
		right: 0;
		cursor: nesw-resize;
	}
	.resize-handle.bottom-left {
		bottom: 0;
		left: 0;
		cursor: nesw-resize;
	}
	.resize-handle.bottom-right {
		bottom: 0;
		right: 0;
		cursor: nwse-resize;
	}
	.resize-handle.top {
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		cursor: ns-resize;
		width: 100%;
		height: 5px;
	}
	.resize-handle.bottom {
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		cursor: ns-resize;
		width: 100%;
		height: 5px;
	}
	.resize-handle.left {
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		cursor: ew-resize;
		width: 5px;
		height: 100%;
	}
	.resize-handle.right {
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		cursor: ew-resize;
		width: 5px;
		height: 100%;
	}
</style>
