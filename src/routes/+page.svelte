<script lang="ts">

	class Position{
		x = 0
		y = 0
		constructor(x: number, y: number){
			this.x = x
			this.y = y
		}
	}

	class Window {
		windowPosition = $state(new Position(0,0))
		width = $state(0)
		height = $state(0)
		isTitleBeingDragged = $state(false)
		titleClickLocation = $state(new Position(0,0))
		isBorderBeingDragged = $state(false)
		borderClickLocation = $state(new Position(0,0))

		constructor(){
			this.windowPosition = new Position(10,10)
			this.width = 100;
			this.height = 150;
		}

		registerTitleDown = (e: MouseEvent) => {
			this.isTitleBeingDragged = true
			this.titleClickLocation = new Position(e.offsetX, e.offsetY)
		}

		registerBorderDown = (e: MouseEvent) => {

			if (e.target !== e.currentTarget) return; // 
			this.isBorderBeingDragged = true
			this.borderClickLocation = new Position(e.offsetX, e.offsetY)	
		}

		registerMouseUp = (e: MouseEvent) => {
			this.isTitleBeingDragged = false
			this.isBorderBeingDragged = false
		}

		moveWindow = (e: MouseEvent) => {
			if(this.isTitleBeingDragged){
				this.windowPosition = new Position(
					e.clientX - this.titleClickLocation.x,
					e.clientY - this.titleClickLocation.y
			)}
			if(this.isBorderBeingDragged){
				// check if the right or bottom border is being dragged
				// if border click
				
		
			}
		}

	}

	let window = new Window()

</script>

<svelte:document
				 onmouseup={window.registerMouseUp}
				 onmousemove={window.moveWindow}
/>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="outer-wrapper" onmousedown={window.registerBorderDown}
style="position: absolute;
	top:{window.windowPosition.y}px;
	left:{window.windowPosition.x}px;
	width:{window.width}px;
	height:{window.height}px;">
<div class="window" onmousedown={(e) =>e.stopPropagation()}>
    
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="title" onmousedown={window.registerTitleDown}> 
		Title
	</div>
</div>
</div>
<style>
	.outer-wrapper{
		width: 100%;
		height: 100%;
		background-color: green;
		padding:10px;
	}
	.window{
		background-color: red;
		height: 100%;
	}
	.title{
		background-color: blue;
		user-select: none;
		height: 10%;
	}
</style>