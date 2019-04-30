// sets the resting position of the ball to the center of the canvas (assumes a square canvas)
const centerBX = b => add(b, centerX());
const centerBY = b => add(b, centerY());

const centerX = () => canvas.width/2;
const centerY = () => canvas.height/2;

// extends the range of the sin/cos from the normal -1 to 1 to the corners of the canvas
const boundX = (b, r=50) => mul(b, centerX()-r);
const boundY = (b, r=50) => mul(b, centerY()-r);

// must register the types for usage with integral
fran.defineApplicative(Vector, {
    pure: v => new Vector(v, v),
    fmap: (f, v) => new Vector(f(v.x), f(v.y)),
    apply: (vf, v) => new Vector(vf.x(v.x), vf.y(v.y)),
});

const mouse = fran.createExternalEvent(update => Arrow.fix(a => Arrow.seq([
    new ElemArrow('canvas'),
    new EventArrow('mousemove'),
    (e => {
        const x = e.clientX - e.target.offsetLeft,
              y = e.clientY - e.target.offsetTop;

        update(new Vector(x, y));
    }).lift(),
    a
])));

const mouseX = fran.createExternalEvent(update => Arrow.fix(a => Arrow.seq([
    new ElemArrow('canvas'),
    new EventArrow('mousemove'),
    (e => {
        const x = e.clientX - e.target.offsetLeft;

        update(x);
    }).lift(),
    a
])));

const mouseY = fran.createExternalEvent(update => Arrow.fix(a => Arrow.seq([
    new ElemArrow('canvas'),
    new EventArrow('mousemove'),
    (e => {
        const y = e.clientY - e.target.offsetTop;

        update(y);
    }).lift(),
    a
])));


const buttons = {

    "Clock2": () => {
        let buffer = [];
        for (let i=0; i<30; ++i) {
            buffer[i] = new Vector();
        }
        const speed = 0.15;

        const b = untilExternalEvent(new Vector(0, 0), mouse, (mouseV, prevPos) => {
            return lift(t => {
                // TODO: this is definitely a hack because I'm not using this
                // as an internal event, i'm using it for its side effect
                // however, it is more efficient than most things in fran
                buffer[0].iadd(mouseV.sub(buffer[0]).mul(speed));

                for (let i=1; i<30; ++i) {
                    buffer[i].iadd(buffer[i-1].sub(buffer[i]).mul(speed));
                }
                return buffer[0];
            });
        });

        let nums = [];
        // clock face - hours
        let delay = 0;
        for (let i=12; i>0; --i) {
            const p = i/12;
            const whole = Math.PI*2;
            const part = (p*whole)-Math.PI/2;
            const img = new Text({
                text: +i,
            });

            const radius = 50;
            
            let b1 = b; // we just need to use this once -- we should remove this though
            if (i !== 1) {
                // TODO: this is a hack that allows for the buffer update to happen
                b1 = t => buffer[i];
            }
            
            img.pos = addv(b1, lift(new Vector(Math.cos(part)*50, Math.sin(part)*50)));
            nums.unshift(img);
        }
        
        // clock face - date
        const date = new Date();
        const days = [
            'SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'
        ];
        const months = [
            'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
        ];
        const dayOfWeek = days[date.getDay()];
        const dayOfMonth = date.getDate();
        const year = date.getYear() + 1900;        
        const month = months[date.getMonth()];
        let todaysDate =  ' ' + dayOfWeek + ' ' + dayOfMonth + ' ' + month + ' ' + year + ' ';

        for (let i=0; i<todaysDate.length; ++i) {
            const p = i/(todaysDate.length-1);
            const whole = -Math.PI*2;
            const part = p*whole;
            const img = new Text({
                text: todaysDate[i],
            });
            const radius = 70;

            let x = mul(sin(add(div(time(), 2000), part)), radius);
            let y = mul(cos(add(div(time(), 2000), part)), radius);
            
            img.x = addb(x, lift(t => buffer[i].x));
            img.y = addb(y, lift(t => buffer[i].y));
            
            nums.unshift(img);
        }

        // seconds hand
        delay = 0;
        let radius = 0;
        for (let i=5; i>0; --i) {
            const img = new Text({
                text: 'o',
            });

            const rad = transform(time(), t => {
                const seconds = new Date().getSeconds();
                const fraction = seconds/60;
                return (fraction * (-Math.PI*2)) + Math.PI;
            });
            
            const x = mul(sin(rad), radius);
            const y = mul(cos(rad), radius);

            img.x = addb(t => buffer[i].x, x);
            img.y = addb(t => buffer[i].y, y);
            nums.unshift(img);
            radius += 10;
        }

        // minutes hand
        delay = 0;
        radius = 0;
        for (let i=4; i>0; --i) {
            const img = new Text({
                text: 'o',
            });

            const rad = transform(time(), t => {
                const minutes = new Date().getMinutes();
                const fraction = minutes/60;
                return (fraction * (-Math.PI*2)) + Math.PI;
            });
            
            const x = mul(sin(rad), radius);
            const y = mul(cos(rad), radius);

            img.x = addb(t => buffer[i].x, x);
            img.y = addb(t => buffer[i].y, y);
            nums.unshift(img);
            radius += 10;
        }

        // hours hand
        delay = 0;
        radius = 0;
        for (let i=3; i>0; --i) {
            const img = new Text({
                text: 'o',
            });

            const rad = transform(time(), t => {
                const minutes = new Date().getMinutes();
                const hours = new Date().getHours();                
                const fraction = ((hours*60)+minutes)/(60*12);
                return (fraction * (-Math.PI*2)) + Math.PI;
            });
            
            const x = mul(sin(rad), radius);
            const y = mul(cos(rad), radius);

            //            const v = addv(goToMouse(delay), lift(new Vector(x, y)));
            
            img.x = addb(t => buffer[i].x, x)
            img.y = addb(t => buffer[i].y, y);
            nums.unshift(img);
            radius += 10;
        }

        return over(...nums);
    },

    
    internalEvent: () => {
        const ball = new Ball();
        ball.pos = untilInternalEvent(new Vector(0, 0), prev => {
            if (fran.time > 1000) {
                return new Vector(100, 100);
            }
            // TODO: prev isn't great, it is always null the first time
            // Also, should allow for explicitly saying "return old behavior"

            // TODO: Need untilB switching
        });
        return ball;
    },

    clock: () => {
        const delayStep = 50;
        let nums = [];
        
        // clock face - hours
        let delay = 0;
        for (let i=12; i>0; --i) {
            const p = i/12;
            const whole = Math.PI*2;
            const part = (p*whole)-Math.PI/2;
            const img = new Text({
                text: +i,
            });

            const radius = 50;
            move(addv(later(untilExternalEvent(new Vector(0, 0), mouse), delay), lift(new Vector(Math.cos(part)*50, Math.sin(part)*50))), img);
            //            setTimeout(() => deregisterB(img, 'x'), 5000);  // TODO to show how to freeze a behavior
            nums.unshift(img);
            delay += delayStep;
        }
        
        // clock face - date
        delay = 0;
        const date = new Date();
        const days = [
            'SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'
        ];
        const months = [
            'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
        ];
        const dayOfWeek = days[date.getDay()];
        const dayOfMonth = date.getDate();
        const year = date.getYear() + 1900;        
        const month = months[date.getMonth()];
        let todaysDate =  ' ' + dayOfWeek + ' ' + dayOfMonth + ' ' + month + ' ' + year + ' ';

        for (let i=0; i<todaysDate.length; ++i) {
            const p = i/(todaysDate.length-1);
            const whole = -Math.PI*2;
            const part = p*whole;
            const img = new Text({
                text: todaysDate[i],
            });
            const radius = 70;

            let x = mul(sin(add(div(time(), 2000), part)), radius);
            let y = mul(cos(add(div(time(), 2000), part)), radius);
            
            //            let v = addv(goToMouse(delay), lift(new Vector(x, y)));
            
            const wiggle = mul(sin(div(time(), 100)), 100);
            const waggle = mul(cos(div(time(), 100)), 100);
            moveXY(addb(x, later(untilExternalEvent(0, mouseX), delay)), addb(y, later(untilExternalEvent(0, mouseY), delay)), img);
            nums.unshift(img);
            delay += delayStep;
        }

        // seconds hand
        delay = 0;
        let radius = 0;
        for (let i=5; i>0; --i) {
            const img = new Text({
                text: 'o',
            });

            const rad = transform(time(), t => {
                const seconds = new Date().getSeconds();
                const fraction = seconds/60;
                return (fraction * (-Math.PI*2)) + Math.PI;
            });
            
            const x = mul(sin(rad), radius);
            const y = mul(cos(rad), radius);

            moveXY(addb(later(untilExternalEvent(0, mouseX), delay), x), addb(later(untilExternalEvent(0, mouseY), delay), y), img);
            nums.unshift(img);
            delay += delayStep;
            radius += 10;
        }

        // minutes hand
        delay = 0;
        radius = 0;
        for (let i=4; i>0; --i) {
            const img = new Text({
                text: 'o',
            });

            const rad = transform(time(), t => {
                const minutes = new Date().getMinutes();
                const fraction = minutes/60;
                return (fraction * (-Math.PI*2)) + Math.PI;
            });
            
            const x = mul(sin(rad), radius);
            const y = mul(cos(rad), radius);

            //            const v = addv(goToMouse(delay), lift(new Vector(x, y)));
            
            moveXY(addb(later(untilExternalEvent(0, mouseX), delay), x), addb(later(untilExternalEvent(0, mouseY), delay), y), img);
            nums.unshift(img);
            delay += delayStep;
            radius += 10;
        }

        // hours hand
        delay = 0;
        radius = 0;
        for (let i=3; i>0; --i) {
            const img = new Text({
                text: 'o',
            });

            const rad = transform(time(), t => {
                const minutes = new Date().getMinutes();
                const hours = new Date().getHours();                
                const fraction = ((hours*60)+minutes)/(60*12);
                return (fraction * (-Math.PI*2)) + Math.PI;
            });
            
            const x = mul(sin(rad), radius);
            const y = mul(cos(rad), radius);

            //            const v = addv(goToMouse(delay), lift(new Vector(x, y)));
            
            moveXY(addb(later(untilExternalEvent(0, mouseX), delay), x), addb(later(untilExternalEvent(0, mouseY), delay), y), img);
            nums.unshift(img);
            delay += delayStep;
            radius += 10;
        }

        return over(...nums);
    },


    "Snake Clock": () => {
        let buffer = [];
        for (let i=0; i<30; ++i) {
            buffer[i] = new Vector();
        }
        const speed = 0.09;

        const b = untilExternalEvent(new Vector(0, 0), mouse, (mouseV, prevPos) => {
            return untilInternalEvent(t => buffer[0], pos => {
                // TODO: this is definitely a hack because I'm not using this
                // as an internal event, i'm using it for its side effect
                // however, it is more efficient than most things in fran
                if (pos !== null) {
                    buffer[0].iadd(mouseV.sub(buffer[0]).mul(speed));
                    for (let i=1; i<30; ++i) {
                        buffer[i].iadd(buffer[i-1].sub(buffer[i]).mul(speed));
                    }
                }
            });
        });

        const balls = [ new Ball() ];
        balls[0].pos = b;
        for (let i=1; i<30; ++i) {
            const ball = new Ball();
            ball.pos = t => {
                return buffer[i];
            };
            balls.unshift(ball);
        }
        
        return over(...balls);
    },

    /*
      moveToMouseAndSlowDown: () => {
      // when we say ball.x = integral(1) it is saying ball.x = integral of the velocity 1
      // when we say ball.x = integral(integral(1)) it is saying ball.x = integral of the integral of acceleration 1
      const ball = new Ball();

      const vel = stateIntegral(new Vector(0, 0), Vector);
      const pos = stateIntegral(vel, Vector);

      ball.pos = untilExternalEvent(new Vector(0, 0), mouse, (mouseV, prevPos) => {
      return untilInternalEvent(pos, pos => {
      // TODO: this is definitely a hack because I'm not using this
      // as an internal event, i'm using it for its side effect
      // however, it is more efficient than most things in fran
      if (pos !== null) {
      //                    console.log(prevPos);
      let d = mouseV.sub(pos);
      const a = d.mul(0.6);
      vel.update(a);
      }
      });

      /* Terminal velocity:
      return untilInternalEvent(pos, pos => {
      if (vel) {
      vel.integral = vel.get().limitMax(0.01);
      console.log(vel.integral);
      }
      });
    */


    // TODO: Problems
    // - need to make prevPos invisible -- don't want the user to have to worry
    // - nesting doesn't seem to work with integral of integral of vector
    // - what if i want access to the integrated value in here? i.e. implementing terminal velocity
    /*            
      return untilInternalEvent(pos, pos => {
      if (pos && mouseV.sub(pos).mag() < 50) {
      return pos;
      }
      });

    */


    followMouse: () => {
        // when we say ball.x = integral(1) it is saying ball.x = integral of the velocity 1
        // when we say ball.x = integral(integral(1)) it is saying ball.x = integral of the integral of acceleration 1
        const ball = new Ball();

        const vel = stateIntegral(new Vector(0, 0), Vector);
        const pos = stateIntegral(vel, Vector);

        ball.pos = untilExternalEvent(new Vector(0, 0), mouse, (mouseV, prevPos) => {
            return untilInternalEvent(pos, pos => {
                // TODO: this is definitely a hack because I'm not using this
                // as an internal event, i'm using it for its side effect
                // however, it is more efficient than most things in fran
                if (pos !== null) {
                    //                    console.log(prevPos);
                    let d = mouseV.sub(pos);
                    d.inorm();
                    const a = d.mul(0.001);
                    vel.update(a);
                }
            });

            /* Terminal velocity:
              return untilInternalEvent(pos, pos => {
              if (vel) {
              vel.integral = vel.get().limitMax(0.01);
              console.log(vel.integral);
              }
              });
            */


            // TODO: Problems
            // - need to make prevPos invisible -- don't want the user to have to worry
            // - nesting doesn't seem to work with integral of integral of vector
            // - what if i want access to the integrated value in here? i.e. implementing terminal velocity
            /*            
              return untilInternalEvent(pos, pos => {
              if (pos && mouseV.sub(pos).mag() < 50) {
              return pos;
              }
              });

            */
        });


        return ball;
    },

    followMouseAccelX: () => {
        // when we say ball.x = integral(1) it is saying ball.x = integral of the velocity 1
        // when we say ball.x = integral(integral(1)) it is saying ball.x = integral of the integral of acceleration 1
        const ball = new Ball();

        ball.x = untilExternalEvent(new Vector(0, 0), mouse, (mouseV, prevPos) => {
            // TODO: Problems
            //    - need to make prevPos invisible -- don't want the user to have to worry
            // - nesting doesn't work because we need to propagate the prev position of both velocity and acceleration, not just one of them
            return untilInternalEvent(integral(integral(0.0001), window.number, prevPos), pos => {
                if (pos && mouseV.x - pos < 50) {
                    return pos;
                }
            });
        });
        return ball;
    },


    vectorIntegralOfIntegral: () => {
        const ball = new Ball();
        ball.pos = integral(integral(new Vector(0.0001, 0.0001), Vector), Vector);
        return ball;
    },

    numericalIntegralOfIntegral: () => {
        const ball = new Ball();
        
        ball.x = integral(integral(0.001));
        ball.y = 100;
        
        return ball;
    },
    
    
    // questions: we should be caching certain amounts of events
    // how to add delay to untilExternalEventb
    asdf: () => {
        const ball = new Ball();
        ball.y  = 100;
        ball.x = later(untilExternalEvent(200, mouseX), 1000);
        // or we could do:
        // ball.x = later(untilExternalEvent(200, mouse, v => v.x), 1000);
        return ball;
    },
    

    text: () => {
        const text = new Text({
            text: 'aowiejfaowe'
        });

        move(mouse(100), text);
        return text;
    },
    
    followMouseArrowsUBL: () => {
        return moveXY(addb(30, untilExternalEvent(0, update => Arrow.seq([
            new ElemArrow('canvas'),
            new EventArrow('mousemove'),
            new LiftedArrow(e => {
                update(e.clientX - e.target.offsetLeft);
            })
        ]))), untilExternalEvent(0, update => Arrow.seq([
            new ElemArrow('canvas'),
            new EventArrow('mousemove'),
            new LiftedArrow(e => {
                update(e.clientY - e.target.offsetTop);
            })
        ])), new Ball());
    },
    
    arrowsUBL: () => {
        return moveXY(untilExternalEvent(10, update => Arrow.seq([
            new ElemArrow('canvas'),
            new EventArrow('click'),
            new LiftedArrow(e => {
                update(e.clientX - e.target.offsetLeft);
            })
        ])), untilExternalEvent(10, update => Arrow.seq([
            new ElemArrow('canvas'),
            new EventArrow('click'),
            new LiftedArrow(e => {
                update(e.clientY - e.target.offsetTop);
            })
        ])), new Ball());
    },

    followMouseArrows: () => {
        return moveXY(addb(30, untilExternalEvent(0, event(update => Arrow.seq([
            new ElemArrow('canvas'),
            new EventArrow('mousemove'),
            new LiftedArrow(e => {
                update(e.clientX - e.target.offsetLeft);
            })
        ])))), untilExternalEvent(0, event(update => Arrow.seq([
            new ElemArrow('canvas'),
            new EventArrow('mousemove'),
            new LiftedArrow(e => {
                update(e.clientY - e.target.offsetTop);
            })
        ]))), new Ball());
    },
    
    arrows: () => {
        return moveXY(untilExternalEvent(10, event(update => Arrow.seq([
            new ElemArrow('canvas'),
            new EventArrow('click'),
            new LiftedArrow(e => {
                update(e.clientX - e.target.offsetLeft);
            })
        ]))), untilExternalEvent(10, event(update => Arrow.seq([
            new ElemArrow('canvas'),
            new EventArrow('click'),
            new LiftedArrow(e => {
                update(e.clientY - e.target.offsetTop);
            })
        ]))), new Ball());
    },

    grow: () => {
        const ball = new Ball();

        // the "add" determines the minimum radius of the ball
        // the "div" slows down the rate of the animation
        // the "mul" extends the range of the cos function
        const r = centerY()/4;
        const waggle = add(mul(abs(cos(div(time(), 400))), centerY()-r), r);        
        return stretch(waggle, moveXY(centerX(), centerY(), ball));
    },
    
    transition1: () => {
        const ball = new Ball();

        function transition(duration, from, to) {
            return untilExternalEvent(from, predicate(gt(time(), duration)).handle(() => to));
        }
        
        moveXY(100, 100, ball);
        return ball;
    },
    
    recursiveUntilExternalEventB: () => {
        const ball = new Ball();
        
        function toggle(val, x, y) {
            return untilExternalEvent(val ? x : y, lbd().handle((time, lbu) => toggle(!val, x, y)));            
        }

        move(toggle(true, new Vector(100, 100), new Vector(200, 100)), ball);
        return ball;
    },

    wiggleWaggle: () => {
        const blueBall = new Ball();
        
        // dividing time by 200 to get a slower animation
        const wiggle = centerBX(boundX(sin(div(time(), 200))));        
        const waggle = centerBY(boundY(cos(div(time(), 200))));
        
        return moveXY(wiggle, waggle, blueBall);
    },

    leftMouseDown: () => {
        const ball = new Ball();
        const b = untilExternalEvent(new Vector(50, 50), lbd().handle(() => new Vector(100, 100)));
        move(b, ball);
        return ball;
    },

    leftMouseDownThenUp: () => {
        const ball = new Ball();

        const b = untilExternalEvent(new Vector(50, 50), lbd().handleVal((lbu) => untilExternalEvent(new Vector(200, 200), lbu.handle(() => new Vector(400, 400)))));
        move(b, ball);
        
        return ball;
    },

    grav: () => {
        const ball = new Ball();
        // need to find change in position to get velocity

        move(accelMouse(0.1), ball);
        
        return ball;
    },
    

    wiggleWaggle2: () => {
        const blueBall = new Ball();
        const wiggle = centerBX(boundX(sin(div(time(), 200))));

        const redBall = new Ball({ fillStyle: 'pink' });
        const waggle = centerBY(boundY(cos(div(time(), 200))));
        
        return over(moveXY(wiggle, centerY(), redBall), moveXY(centerX(), waggle, blueBall));
    },

    dance: () => {
        const blueBall = new Ball();
        const redBall = new Ball({ fillStyle: 'pink' });

        // wiggle/waggle for position
        const pwiggle = centerBX(boundX(sin(div(time(), 200))));        
        const pwaggle = centerBY(boundY(cos(div(time(), 200))));

        // wiggle/waggle for size (has different min/max than position wiggle/waggle)
        const swiggle = add(abs(mul(sin(div(time(), 200)), 40)), 10);
        const swaggle = add(abs(mul(cos(div(time(), 200)), 40)), 10);        

        const d1 = stretch(swiggle, moveXY(pwiggle, centerY(), redBall));
        const d2 = stretch(swaggle, moveXY(centerX(), pwaggle, blueBall));
        return over(d1, d2);
    },

    orbit: () => {
        const speed = 200;
        
        const blueBall = new Ball();
        const redBall = new Ball({ fillStyle: 'pink' });

        // wiggle/waggle for position
        const pwiggle = centerBX(boundX(sin(div(time(), speed))));        
        const pwaggle = centerBY(boundY(cos(div(time(), speed))));

        // wiggle/waggle for size (has different min/max than position wiggle/waggle)
        const swiggle = add(mul(sin(div(time(), speed)), 20), 30);
        const swaggle = add(mul(cos(div(time(), speed)), 20), 30);        

        const d1 = stretch(swiggle, moveXY(pwaggle, centerY(), redBall));
        const d2 = stretch(swaggle, moveXY(centerX(), pwiggle, blueBall));
        return over(d1, d2);
    },

    atom: () => {
        const speed = 200;
        
        const blueBall = new Ball();
        const redBall = new Ball({ fillStyle: 'pink' });

        // wiggle/waggle for position
        const pwiggle = mul(sin(div(time(), speed)), 100);        
        const pwaggle = mul(cos(div(time(), speed)), 100);

        // wiggle/waggle for size (has different min/max than position wiggle/waggle)
        const swiggle = add(mul(sin(div(time(), speed)), 20), 30);
        const swaggle = add(mul(cos(div(time(), speed)), 20), 30);        

        const d1 = stretch(swiggle, moveXY(addb(pwaggle, mouseX()), addb(mouseY(), 0), redBall));
        const d2 = stretch(swaggle, moveXY(addb(mouseX(), 0), addb(mouseY(), pwiggle), blueBall));

        // TODO: for some reason returning moveXY(mouseX(), mouseY(), over(d1, d2)) did not work... look into that
        return over(d1, d2);
    },

    atom2: () => {
        const speed = 200;
        
        const blueBall = new Ball();
        const redBall = new Ball({ fillStyle: 'pink' });
        const greenBall = new Ball({ fillStyle: 'lightgreen' });
        const yellowBall = new Ball({ fillStyle: 'yellow' });                

        // wiggle/waggle for position
        const pwiggle = mul(sin(div(time(), speed)), 100);        
        const pwaggle = mul(cos(div(time(), speed)), 100);
        const npwiggle = mul(sin(div(time(), speed)), -100);
        const npwaggle = mul(cos(div(time(), speed)), -100);        

        // wiggle/waggle for size (has different min/max than position wiggle/waggle)
        const swiggle = add(mul(sin(div(time(), speed)), 20), 20);
        const swaggle = add(mul(cos(div(time(), speed)), 20), 20);
        const nswaggle = add(mul(neg(cos(div(time(), speed))), 20), 20);
        const nswiggle = add(mul(neg(sin(div(time(), speed))), 20), 20);                        

        const d1 = stretch(swiggle, moveXY(pwaggle, 0, redBall));
        const d2 = stretch(swaggle, moveXY(0, pwiggle, blueBall));
        const d3 = stretch(nswiggle, moveXY(pwaggle, pwaggle, greenBall));
        
        return moveXY(mouseX(), mouseY(), over(d3, d2, d1));
    },

    /*
      dance2: () => {
      const speed = 150;
      
      const blueBall = new Ball();
      const redBall = new Ball({ fillStyle: 'pink' });
      const greenBall = new Ball({ fillStyle: 'lightgreen' });
      const purpleBall = new Ball({ fillStyle: 'purple' });        

      // wiggle/waggle for position
      const pwiggle = centerBX(boundX(sin(div(time, speed))));        
      const pwaggle = centerBY(boundY(cos(div(time, speed))));

      // negated position wiggle/waggle
      const npwiggle = centerBX(boundX(neg(sin(div(time, speed)))));                        
      const npwaggle = centerBY(boundY(neg(cos(div(time, speed)))));

      // wiggle/waggle for size (has different min/max than position wiggle/waggle)
      const swiggle = add(abs(mul(sin(div(time, speed)), 40)), 10);
      const swaggle = add(abs(mul(cos(div(time, speed)), 40)), 10);        

      const d1 = stretch(swiggle, moveXY(pwiggle, centerY(), redBall));
      const d2 = stretch(swaggle, moveXY(centerX(), pwaggle, blueBall));
      const d3 = stretch(swaggle, moveXY(pwaggle, npwaggle, greenBall));
      const d4 = stretch(swiggle, moveXY(pwiggle, pwiggle, purpleBall));        
      return over(over(d1, d4), over(d2, d3));
      },
    */

    acceleration: () => {
        const ball = new Ball();

        // simulates acceleration
        const waggle = centerBY(boundY(sin(squared(div(time(), 1000)))));
        return moveXY(centerX(), waggle, ball);
    },

    transform: () => {
        let ball = new Ball();

        const waggle = centerBY(boundY(sin(div(time(), 500))));

        // See source for cycleRainbow in tutorial.js
        // demonstrates how behaviors can be composed to alter any attribute (including color)
        withColor(cycleRainbow(waggle, centerY()), ball);
        
        return moveXY(centerX(), waggle, ball);
    },

    growTransform: () => {
        const ball = new Ball();

        // another example of combining scale with color
        const r = centerY()/4;
        const waggle = add(mul(abs(cos(div(time(), 400))), centerY()-r), r);        
        return stretch(waggle, moveXY(centerX(), centerY(), withColor(cycleRainbow(waggle, 200), ball)));
    },

    followMouseX: () => {
        const ball = new Ball();
        
        return moveXY(mouseX(), centerY(), ball);
    },

    followMouseXY: () => {
        const ball = new Ball();
        
        return moveXY(mouseX(), mouseY(), ball);
    },

    followMouseXY: () => {
        const ball1 = new Ball();
        let ball2 = new Ball();
        withColor('pink', ball2);
        
        return over(
            moveXY(mouseX(), mouseY(), ball1),
            moveXY(later(mouseX(), 100), later(mouseY(), 100), ball2),            
        );
    },

    snake: () => {
        let delay = 100;
        let items = [];
        for (let i=0; i<20; ++i) {
            items.push(moveXY(later(mouseX(), delay), later(mouseY(), delay), new Ball()));
            delay += 100;
        }
        return over(...items);
    },


    wiggleWaggleFollowMouse: () => {
        const speed = 200;
        const wiggle = mul(sin(div(time(), speed)), 100);
        const waggle = mul(cos(div(time(), speed)), 100);
        
        return moveXY(mouseX(), mouseY(),
                      over(
                          moveXY(wiggle, 0, new Ball()),
                          moveXY(0, waggle, new Ball({ fillStyle: 'pink' }))                    
                      ));
    },

    dna: () => {
        const speed = 200;        
        const wiggle = mul(sin(div(time(), speed)), 100);
        const waggle = mul(cos(div(time(), speed)), 100);

        let delay = 100;
        let items = [];
        for (let i=0; i<10; ++i) {
            const b1 = new Ball();
            const b2 = new Ball({ fillStyle: 'pink' });
            
            withColor(later(cycleRainbow(wiggle, 1000), delay), b1);
            withColor(later(cycleRainbow(waggle, 1000), delay), b2);
            
            items.push(
                moveXY(mouseX(delay), mouseY(delay),
                       over(
                           moveXY(later(wiggle, delay), 0, b1),
                           moveXY(0, later(waggle, delay), b2)                    
                       ))
            );
            delay += 100;
        }
        return over(...items);
    },
};

let animation = null;

let clicked = false;
for (const button in buttons) {
    const f = buttons[button];
    const e = document.createElement('a');
    e.text = button;
    e.className = 'button';
    
    const code = document.querySelector('#code');

    function handler() {
        mousePositions = [];
        mouseTimes = [];
        window.loopTime = 0;
        window.image = f();

        code.innerHTML = f.toString();
    }    
    e.addEventListener('click', handler);

    const container = document.querySelector('#buttons');
    container.append(e);

    if (!clicked) {
        if (window.image)
            window.image.destroy();
        handler();
        clicked = true;
    }
}

let isFullscreen = false;
const fullscreen = document.querySelector('#fullscreen');
fullscreen.addEventListener('click', () => {
    if (!isFullscreen) {
        canvas.height = window.innerHeight - 100;
        canvas.width = window.innerWidth - 100;
    } else {
        canvas.height = 400;
        canvas.width = 400;        
    }
    isFullscreen = !isFullscreen;
});

const cycleRainbow = (b1, max) => transform(b1, t => {
    const length = t;
    const maxLength = max;
    
    const i = (length * 255 / maxLength);
    const r = Math.round(Math.sin(0.024 * i + 0) * 127 + 128);
    const g = Math.round(Math.sin(0.024 * i + 2) * 127 + 128);
    const b = Math.round(Math.sin(0.024 * i + 4) * 127 + 128);
    
    const colorString = 'rgb(' + r + ',' + g + ',' + b + ')';

    return colorString;
});

