// moveXY : Behavior_x -> Behavior_y -> Image -> Image
function moveXY(b_x, b_y, image) {
    image.x = b_x;
    image.y = b_y;
    return image;
}

function move(b_vector, image) {
    image.x = transform(lift(b_vector), t => t.x);
    image.y = transform(lift(b_vector), t => t.y);
    return image;
}

function stretch(b_r, image) {
    image.r = b_r;
    return image;
}

function withColor(b_fillStyle, image) {
    image.fillStyle = b_fillStyle;
    return image;
}

// over : Behavior_Image -> Behavior_Image -> Behavior_Image
function over(...is) {
    return new Over(...is);
}

// display : Image -> IO()
function display(r, time) {
    r.render(ctx, time);
}

class Ball {
    constructor(i={}) {
        this.r = i.r || 50;
        this.x = i.x || 0;
        this.y = i.y || 0;
        this.lineWidth = i.lineWidth || 5;
        this.strokeStyle = i.strokeStyle || 'black';
        this.fillStyle = i.fillStyle || 'lightblue';
    }

    render(ctx, time) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = at(this.fillStyle, time);
        ctx.strokeStyle = at(this.strokeStyle, time);
        ctx.lineWidth = at(this.lineWidth, time);
        ctx.arc(at(this.x, time), at(this.y, time), Math.max(at(this.r, time)-(ctx.lineWidth/2), 0), 0, 2*Math.PI);
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
    }

    render(ctx, time) {
        ctx.save();
        ctx.font = at(this.font, time);
        ctx.fillText(this.text, at(this.x, time), at(this.y, time));        
        ctx.restore();
    }
}

class Over {
    constructor(...is) {
        this.is = is;
        
        this.x = 0;
        this.y = 0;

        this.init = false;
    }

    render(ctx, time) {
        if (!this.init) {
            for (const i of this.is) {
                i.x = addb(lift(i.x), lift(this.x));
                i.y = addb(lift(i.y), lift(this.y));
                this.init = true;
            }
        }
        
        for (const i of this.is) {
            i.render(ctx, time);
        }
    }
}

function ball(r) {
    return new Ball({ r });
}

// blueBall : Image_Ball
const blueBall = ball(200);

