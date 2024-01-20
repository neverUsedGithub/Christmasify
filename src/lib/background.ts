interface Flake {
    x: number;
    y: number;
    radius: number;
}

export function getRandom(min: number, max: number) {
    return Math.round(Math.random() * (max - min)) + min;
}

function drawCurves(ctx: CanvasRenderingContext2D, xoff: number, yoff: number, xmul: number = 1, ymul: number = 1) {
    ctx.beginPath();
    ctx.moveTo(0 * xmul + xoff, 244 * ymul + yoff);
    ctx.bezierCurveTo(
        -17.99629326113898 * xmul + xoff,
        237.74373575231948 * ymul + yoff,
        41 * xmul + xoff,
        12 * ymul + yoff,
        225 * xmul + xoff,
        231 * ymul + yoff,
    );
    ctx.bezierCurveTo(
        286.12119302757867 * xmul + xoff,
        303.7475069186942 * ymul + yoff,
        346 * xmul + xoff,
        6 * ymul + yoff,
        536 * xmul + xoff,
        244 * ymul + yoff,
    );
    ctx.bezierCurveTo(
        552.328864126896 * xmul + xoff,
        264.4540508536908 * ymul + yoff,
        606.9684024852988 * xmul + xoff,
        227.97961164567852 * ymul + yoff,
        668 * xmul + xoff,
        207 * ymul + yoff,
    );
    ctx.bezierCurveTo(
        700 * xmul + xoff,
        196 * ymul + yoff,
        742 * xmul + xoff,
        165 * ymul + yoff,
        810 * xmul + xoff,
        258 * ymul + yoff,
    );
    ctx.bezierCurveTo(
        838.1585634175319 * xmul + xoff,
        296.5109764386835 * ymul + yoff,
        856.1241897489566 * xmul + xoff,
        229.48247576074704 * ymul + yoff,
        945 * xmul + xoff,
        282 * ymul + yoff,
    );
    ctx.bezierCurveTo(
        967 * xmul + xoff,
        295 * ymul + yoff,
        1036 * xmul + xoff,
        231 * ymul + yoff,
        1001 * xmul + xoff,
        321 * ymul + yoff,
    );
    ctx.lineTo(1000 * xmul + xoff, 499 * ymul + yoff);
    ctx.lineTo(0 * xmul + xoff, 500 * ymul + yoff);
    ctx.fill();
}

export function addBackgroundEffect(canvas: HTMLCanvasElement) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d")!;
    const flakes: Flake[] = [];

    for (let i = 0; i < canvas.width / 10; i++) {
        flakes.push({
            y: -getRandom(20, canvas.height),
            radius: getRandom(5, 15),
            x: getRandom(0, canvas.width),
        });
    }

    function drawBackground() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";

        for (const flake of flakes) {
            flake.y += 3;

            if (flake.y >= canvas.height + flake.radius) {
                flake.y = -flake.radius - getRandom(20, 80);
                flake.radius = getRandom(5, 15);
                flake.x = getRandom(0, canvas.width);
            }

            ctx.beginPath();
            ctx.arc(flake.x, flake.y, flake.radius, 0, 2 * Math.PI);
            ctx.fill();
        }

        drawCurves(ctx, 0, canvas.height - 400, canvas.width > 1000 ? canvas.width / 1000 : 1);

        requestAnimationFrame(drawBackground);
    }

    requestAnimationFrame(drawBackground);
}
