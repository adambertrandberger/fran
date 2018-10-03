class Vector {
    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;
    }

    izero() {
        this.x = 0;
        this.y = 0;
        
        return this;
    }

    add(other) {
        return new Vector(this.x+other.x, this.y+other.y);
    }

    iadd(other) {
        this.x += other.x;
        this.y += other.y;

        return this;
    }

    sadd(scalar) {
        return new Vector(this.x+scalar, this.y+scalar);
    }

    isadd(scalar) {
        this.x = this.x+scalar;
        this.y = this.y+scalar;

        return this;
    }

    sub(other) {
        return new Vector(this.x-other.x, this.y-other.y);
    }

    isub (other) {
        this.x -= other.x;
        this.y -= other.y;

        return this;
    }
    
    ssub(scalar) {
        return new Vector(this.x-scalar, this.y-scalar);
    }

    issub(scalar) {
        this.x = this.x-scalar;
        this.y = this.y-scalar;

        return this;
    }

    mul(scalar) {
        return new Vector(this.x*scalar, this.y*scalar);
    }

    imul(scalar) {
        this.x = this.x*scalar;
        this.y = this.y*scalar;

        return this;
    }

    vmul(other) {
        return new Vector(this.x*other.x, this.y*other.y);
    }

    ivmul(other) {
        this.x = this.x*other.x;
        this.y = this.y*other.y;

        return this;
    }

    vdiv(other) {
        const x = other.x === 0 ? 0 : this.x/other.x;
        const y = other.y === 0 ? 0 : this.y/other.y;        
        
        return new Vector(x, y);
    }

    ivdiv(other) {
        const x = other.x === 0 ? 0 : this.x/other.x;
        const y = other.y === 0 ? 0 : this.y/other.y;        

        this.x = x;
        this.y = y;

        return this;
    }

    div(scalar) {
        return new Vector(this.x/scalar, this.y/scalar);
    }

    idiv(scalar) {
        if (scalar > 0) {
            this.x /= scalar;
            this.y /= scalar;
        } else {
            this.x = 0;
            this.y = 0;
        }

        return this;
    }

    mag() {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    limitMax(v) {
        return new Vector(Math.min(this.x, v), Math.min(this.y, v));
    }

    limitMin(v) {
        return new Vector(Math.max(this.x, v), Math.max(this.y, v));
    }

    limit(v) {
        return this.limitMax(v).limitMin(-v);
    }

    dot(other) {
        return this.x*other.x+this.y*other.y;
    }

    abs() {
        return new Vector(Math.abs(this.x), Math.abs(this.y));
    }

    norm() {
        const mag = this.mag();
        if (mag === 0) {
            return new Vector();
        } else {
            return new Vector(this.x/mag, this.y/mag);
        }
    }

    inorm() {
        const mag = this.mag();
        if (mag !== 0) {
            this.x = this.x/mag;
            this.y = this.y/mag;
        }
        
        return this;
    }

    direction(angle=null) {
        if (angle) {
            var mag = this.mag();
            return new Vector(Math.cos(angle) * mag, Math.sin(angle) * mag);
        } else {
            return Math.atan2(this.y, this.x);
        }
    }

    clone() {
        return new Vector(this.x, this.y);
    }
}
