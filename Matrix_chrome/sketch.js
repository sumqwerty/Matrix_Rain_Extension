console.log('ran sketch');
chrome.runtime.onMessage.addListener(gotMessage);
let myp5;
let disp = true;
let skt;

let s = function (sketch)
{
    skt = sketch;
    let minStrLen;
    let maxStrLen;
    let charSize = 20;
    let maxSpeed = 7;
    let minSpeed = 3;
    let charset = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '/', '*', ':', '=', '$'];
    let frmcnt = 0;
    let Strings = [];
    let cnvs;
    let scrlPos;
    
    class Matrix
    {
        constructor(tx)
        {
            this.x = tx;
            this.strLen = Math.floor(Math.random() * (maxStrLen - minStrLen) + minStrLen);
            this.chars = []

            for(let i=0; i<this.strLen; ++i)
            {
                this.chars[i] = charset[Math.floor(Math.random() * (charset.length - 0) + 0)];
            }
            
            this.curry = Math.floor(Math.random() * ((-this.strLen) - (-this.strLen*2)) + (-this.strLen*2));
            this.speed = Math.floor(Math.random() * (maxSpeed - minSpeed) + minSpeed);
            this.updFreq = Math.floor(Math.random() * (3 - 1) + 1);
            

        }

        move()
        {
            if(sketch.frameCount % this.speed === 0)
            {
                this.curry += 1;
                for(let i=0; i<this.strLen-1; ++i)
                {
                    this.chars[i] = this.chars[i+1];
                    if(Math.floor(Math.random() * (10 - 0) + 0) === this.updFreq)
                    {
                        this.chars[i] = charset[Math.floor(Math.random() * (charset.length - 0) + 0)];
                    }
                }
                this.chars[this.strLen-1] = charset[Math.floor(Math.random() * (charset.length - 0) + 0)];
            }
        }
        display()
        {
            sketch.fill(0, 255, 70);
            for(let i=0; i<this.strLen-1; ++i)
            {
                sketch.text(this.chars[i], this.x,((this.curry + i) * charSize) % sketch.height);
            }
            sketch.fill(140, 255, 170);
            sketch.text(this.chars[this.strLen-1],this.x,((this.curry + this.strLen - 1) * charSize) % sketch.height);
        }
    }

    reset = function()
    {
        charset = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '/', '*', ':', '=', '$'];
        frmcnt = 0;
        Strings = [];   
    }

    window.onscroll = function(e)
    {
        cnvs.position(Math.floor(window.scrollX),Math.floor(window.scrollY));
    }

    sketch.setup = function()
    {
        let h = document.body.clientHeight;
        let w = document.body.clientWidth;
        
        cnvs = sketch.createCanvas(sketch.windowWidth-charSize, sketch.windowHeight-charSize);

        for(let j=0; j<88; j += 2)
        {
            charset[charset.length] = String.fromCharCode(0x30A0 + j)
        }

        minStrLen = (sketch.height / charSize) / 2;
        maxStrLen = (sketch.height / charSize) * 7 / 8;

        for(let s=0; s<(sketch.width/charSize);++s)
        {
            Strings.push(new Matrix(s*charSize));
        }
        sketch.textFont('Consolas');
        
        cnvs.position(Math.floor(window.scrollX),Math.floor(window.scrollY));
        cnvs.style('pointer-events', 'none');
        sketch.clear();
    }

    sketch.draw = function()
    {   
        sketch.clear();
        for(let s=0; s<Strings.length; s += 1)
        {
            Strings[s].move();
            Strings[s].display();
        }
    }

};

function Closed(sketch)
{
    sketch.noLoop();
    sketch.noCanvas();   
}

function gotMessage(message, sender, sendResopnse)
{
    if(disp)
    {
        myp5 = new p5(s);
        disp = false;
    }
    else
    {
        Closed(skt);
        disp = true;
    }
}