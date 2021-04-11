function roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: any,
    color1: string,
    color2: string
) {
    if (typeof radius === "undefined") {
        radius = 5;
    }

    radius = { tl: radius, tr: radius, br: radius, bl: radius };

    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width - radius.br,
        y + height
    );
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    const grd = ctx.createLinearGradient(0, 0, 80, 0);
    grd.addColorStop(0, color1);
    grd.addColorStop(1, color2);
    ctx.fillStyle = grd;

    ctx.fill();
}
export const generateGradientImage = (color1: string, color2: string) => {
    if (typeof window === "undefined") {
        console.error("Only works in Client");
        return "";
    }
    const canvas = document.createElement("canvas");
    canvas.style.display = "none";
    canvas.width = 80;
    canvas.height = 48;
    document.body.append(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        return "";
    }
    roundRect(ctx, 0, 0, 80, 48, 4, color1, color2);

    const url = canvas.toDataURL();
    document.body.removeChild(canvas);
    canvas.remove();
    return url;
};