class Tuple {
    constructor(i1, i2) {
        this.i1 = i1;
        this.i2 = i2; 
    }

    first() {
        return this.i1;
    }

    second() {
        return this.i2;
    }

    left(i1) {
        if (i1) {
            this.i1 = i1;
            return this;
        } else {
            return this.first();
        }
    }

    right(i2) {
        if (i2) {
            this.i2 = i2;
            return this;
        } else {
            return this.second();
        }
    }
}
