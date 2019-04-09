// moveXY : Behavior_x -> Behavior_y -> Image -> Image
function moveXY(b_x, b_y, image) {
    registerB(image, 'x', b_x);
    registerB(image, 'y', b_y);    

    return image;
}

function move(b_vector, image) {
    registerB(image, 'x', transform(lift(b_vector), t => t.x));
    registerB(image, 'y', transform(lift(b_vector), t => t.y));
    return image;
}

function stretch(b_r, image) {
    registerB(image, 'r', b_r);
    return image;
}

function withColor(b_fillStyle, image) {
    registerB(image, 'fillStyle', b_fillStyle);    
    return image;
}

// over : Behavior_Image -> Behavior_Image -> Behavior_Image
function over(...is) {
    return new Over(...is);
}

// display : Image -> IO()
function display(r, time) {
    r.render(ctx);
}

class Ball {
    constructor(i={}) {
        this.r = i.r || 50;
        this.x = i.x || 0;
        this.y = i.y || 0;
        this.lineWidth = i.lineWidth || 5;
        this.strokeStyle = i.strokeStyle || 'black';
        this.fillStyle = i.fillStyle || 'lightblue';

        registerB(this, 'fillStyle');
        registerB(this, 'strokeStyle');
        registerB(this, 'lineWidth');
        registerB(this, 'x');
        registerB(this, 'y');
        registerB(this, 'r');
    }

    render(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.arc(this.x, this.y, Math.max(this.r-(ctx.lineWidth/2), 0), 0, 2*Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }
}


class Text {
    constructor(i={}) {
        this.x = i.x || 0;
        this.y = i.y || 0;
        this.text = i.text || '';
        this.font = '12px Arial'; // not configurable for now

        registerB(this, 'font');
        registerB(this, 'x');
        registerB(this, 'y');
        registerB(this, 'text');
    }

    render(ctx) {
        ctx.save();
        ctx.font = this.font;
        ctx.fillText(this.text, this.x, this.y);        
        ctx.restore();
    }
}

class Over {
    constructor(...is) {
        this.is = is;
        
        this.x = 0;
        this.y = 0;

        registerB(this, 'x');
        registerB(this, 'y');

        this.init = false;
    }

    render(ctx) {
        if (!this.init) {
            for (const i of this.is) {
                i.x = addb(lift(i.x), lift(this.x));
                i.y = addb(lift(i.y), lift(this.y));
                this.init = true;
            }
        }
        
        for (const i of this.is) {
            i.render(ctx);
        }
    }
}

function ball(r) {
    return new Ball({ r });
}

const blueBall = ball(200);

