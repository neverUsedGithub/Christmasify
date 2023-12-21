<script lang="ts">
    import hatImage from "./assets/santa-hat.png";
    import { addBackgroundEffect } from "./lib/background";

    let canvas: HTMLCanvasElement;

    let santaHatImage: HTMLImageElement;
    let selectedFile: File | null = null;
    let previewImage: string | null = null;

    $: {
        canvas && addBackgroundEffect(canvas);
    }

    function onFileSelected(e: Event) {
        selectedFile = (e.target as HTMLInputElement).files![0];
    }

    $: {
        if (selectedFile) {
            const img = new Image();
            img.addEventListener("load", () => {
                const drawCanvas = document.createElement("canvas");
                const canvasSize = 400;
                const imageSize = 300;
                const sizeDiff = canvasSize - imageSize;
                const hatSize = sizeDiff;
                const hatXOffset = 10;
                const inset = sizeDiff / 2;
                const hatOverlap = 30;

                drawCanvas.width = canvasSize;
                drawCanvas.height = canvasSize;

                const ctx = drawCanvas.getContext("2d")!;

                ctx.drawImage(img, inset, inset, imageSize, imageSize);
                ctx.drawImage(
                    santaHatImage,
                    canvasSize / 2 - hatSize / 2 + hatXOffset,
                    inset - hatOverlap,
                    hatSize,
                    hatSize,
                );

                previewImage = drawCanvas.toDataURL();
            });
            img.src = URL.createObjectURL(selectedFile);
        }
    }
</script>

<canvas class="background-canvas" bind:this={canvas}></canvas>

<main>
    <img src={hatImage} alt="santa hat" hidden bind:this={santaHatImage} />
    <div class="popup">
        <input type="file" id="image-uploader" hidden on:change={(e) => onFileSelected(e)} />
        <label for="image-uploader" class="image-container">
            {#if selectedFile}
                <img src={previewImage} alt="output" />
            {/if}
        </label>
        <span class="how-to">Select Your PFP</span>
    </div>
</main>

<style>
    .how-to {
        font-weight: bold;
        color: #5c5c5c;
    }

    .background-canvas {
        background: #1c8bad;
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: -1;
    }

    .popup {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background: rgb(30, 30, 30);
        border-radius: 32px;
        padding: 32px;
        gap: 32px;
    }

    .image-container {
        display: block;
        width: 400px;
        height: 400px;
        cursor: pointer;
        border-radius: 16px;
        overflow: hidden;
        outline: 10px dashed rgb(60, 60, 60);
    }
</style>
