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

class Ball {
    constructor(i={}) {
        this.r = i.r || 50;
        this.x = i.x || 0;
        this.y = i.y || 0;
        this.lineWidth = i.lineWidth || 5;
        this.strokeStyle = i.strokeStyle || 'black';
        this.fillStyle = i.fillStyle || 'lightblue';

        // allow using a vector instead of x/y
        this.pos = i.pos || null;

        fran.defineBehavior(this, 'fillStyle');
        fran.defineBehavior(this, 'strokeStyle');
        fran.defineBehavior(this, 'lineWidth');
        fran.defineBehavior(this, 'x');
        fran.defineBehavior(this, 'y');
        fran.defineBehavior(this, 'r');
        fran.defineBehavior(this, 'pos');
    }

    render(ctx) {
        if (this.pos !== null) {
            this.x = this.pos.x;
            this.y = this.pos.y;
        }
        
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

        // allow using a vector instead of x/y
        this.pos = i.pos || null;

        fran.defineBehavior(this, 'font');
        fran.defineBehavior(this, 'x');
        fran.defineBehavior(this, 'y');
        fran.defineBehavior(this, 'text');
        fran.defineBehavior(this, 'pos');
    }

    render(ctx) {
        if (this.pos !== null) {
            this.x = this.pos.x;
            this.y = this.pos.y;
        }

        ctx.save();
        ctx.font = this.font;
        ctx.fillText(this.text, this.x, this.y);        
        ctx.restore();
    }
}

class Over {
    constructor(...is) {
        this.is = is;
        
        this.x = 100;
        this.y = 100;

        fran.defineBehavior(this, 'x');
        fran.defineBehavior(this, 'y');

        this.init = false;
    }

    destroy() {
        for (const i of this.is) {
            i.destroy();
        }
    }

    render(ctx) {
        if (!this.init) {
            for (const i of this.is) {
                //TODO: this all needs a fixin
                //i.x = addb(lift(i.x), lift(this.x));
                //i.y = addb(lift(i.y), lift(this.y));
                //                registerB(i, 'x', addb(lift(i.x), lift(this.x)));
                //                registerB(i, 'y', addb(lift(i.y), lift(this.y)));
            }
            this.init = true;
        }
        
        for (const i of this.is) {
            i.render(ctx);
        }
    }
}
