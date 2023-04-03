    let background = new Image();
    background.src = "background.png";
    let startLogo = new Image();
    startLogo.src = "startLogo.png";
    let bgsound = new Audio();
    bgsound.src = "theForest.mp3";
    let winsound = new Audio();
    winsound.src ="victory.mp3"
    let losesound = new Audio();
    losesound.src ="gameOver.mp3"
    let canvas = document.getElementById("canvas1");
    let ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let canvas2 = document.getElementById("canvas2");
    let ctx2 = canvas2.getContext("2d");
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;
    let time = 2999;
    let duckToShoot = 50;
    let gameStart = false;
    let gameOver = false;
    let gameWin = false;

    let duckMoveLeft = [];
    function DuckMoveLeft(){
    this.spriteWidth = 91;
    this.spriteHeight = 97;
    this.sizeRandom = Math.random()*0.5+0.5;
    this.width = this.spriteWidth*this.sizeRandom;
    this.height = this.spriteHeight*this.sizeRandom;
    this.x = 0;
    this.y = Math.random()*(canvas.height - (this.height*3));
    this.vx = Math.random()*4+5;
    this.vy = Math.random()*3-3;
    this.markedForDeletion = false;
    this.image = new Image();
    this.image.src = "duckMoveLeft.png";
    this.frame = 0;
    this.timeSinceFlap = 0;
    this.flapInterval = Math.random()*50+150;
    this.randomColor = [Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255)]
    this.color = "rgb(" + this.randomColor[0] + "," + this.randomColor[1] + "," + this.randomColor[2] +")";
    this.update = function(deltaTime){
        this.x += this.vx;
        this.y += this.vy;
        if(this.y < 30 || this.y > (canvas.height - this.height*3)){
            this.vy = -this.vy;
        }
        if(this.x > canvas.width + this.width){
            markedForDeletion = true;
        }
        this.timeSinceFlap += deltaTime;
        if(this.timeSinceFlap > this.flapInterval){
            if (this.frame < 2){
        this.frame++;
        this.timeSinceFlap = 0
            } else{
        this.frame = 0;
            }
    }
    }
    this.draw = function(){
        ctx2.fillStyle = this.color;
        ctx2.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(this.image,this.frame*this.spriteWidth,0,
        this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height);  
    }
    }

    let duckFallDown = [];
    function DuckFallDown(x,y,width,height){
    this.image = new Image();
    this.image.src = "duckFallDown.png";
    this.spriteWidth = 67;
    this.spriteHeight = 110;
    this.x = x;
    this.y = y;
    this.vy = 2;
    this.width = width;
    this.height = height;
    this.frame = 0;
    this.markedForDeletion = false;
    this.sound = new Audio();
    this.sound.src = "duckQuack.mp3";
    this.timeSinceLastFrame = 0;
    this.frameInterval = 200;
    this.update = function(deltaTime){
        this.y += this.vy;
        if(this.frame == 0){
            this.sound.play();
        }
        this.timeSinceLastFrame += deltaTime;
        if(this.timeSinceLastFrame > this.frameInterval){
           this.frame++;
           this.timeSinceLastFrame = 0;
        }
        if(this.frame > 3){
            this.markedForDeletion = true;
        }
    }   
    this.draw = function(){
        ctx.drawImage(this.image,this.frame*this.spriteWidth,0,this.spriteWidth,this.spriteHeight,
        this.x,this.y,this.width,this.height);
    }
    }

    window.addEventListener("click",function(e){
        gameStart = true;
        let detectColor = ctx2.getImageData(e.x,e.y,1,1);
        let pc = detectColor.data;
        duckMoveLeft.forEach(function(duckMoveLeft){
            if(duckMoveLeft.randomColor[0] === pc[0] 
               && duckMoveLeft.randomColor[1] === pc[1]
               && duckMoveLeft.randomColor[2] === pc[2]){
               duckMoveLeft.markedForDeletion = true;
               duckFallDown.push(new DuckFallDown(duckMoveLeft.x, duckMoveLeft.y,
               duckMoveLeft.width,duckMoveLeft.height))
               duckToShoot--;
               }
        })
    })

    function drawWind(){
        ctx.font = "30px Impact"
        ctx.fillStyle = "black";
        ctx.fillText("Wind ⬅⬅" ,canvas.width - 142,45)
        ctx.fillStyle = "red";
        ctx.fillText("Wind ⬅⬅",canvas.width - 138,48)
    }
    
    function drawDuckToShoot(){
        ctx.font = "30px Impact"
        ctx.fillStyle = "white";
        ctx.fillText("Duck To Shoot ( " + " -_･) ︻デ═一 ",18,606)
        ctx.fillStyle = "black";
        ctx.fillText("Duck To Shoot ( " + " -_･) ︻デ═一 ",20,610)
        let duckIcon = new Image();
        duckIcon.src = "duckIcon2.png";
        for(let i = 0;i<duckToShoot;i++){
        ctx.drawImage(duckIcon,20*i + 10,620,30,30);
        }
    }

    function drawTimer(){
        ctx.font = "50px Impact"
        ctx.fillStyle = "black";
        ctx.fillText("Time left: " + time ,canvas.width-315,636)
        ctx.fillStyle = "red";
        ctx.fillText("Time left: " + time,canvas.width-310,640)
    }
    function updateTimer(){
        time -= 1;
    }
    
    function drawGameOver(){
        ctx.textAlign = "center";
        ctx.font = "75px Impact"
        ctx.fillStyle = "black";
        ctx.fillText("GAME OVER (╥﹏╥)",canvas.width/2,canvas.height/2)
    }

    function drawGameWin(){
        ctx.textAlign = "center";
        ctx.font = "75px Impact"
        ctx.fillStyle = "green";
        ctx.fillText("YOU WIN (￫𓎟￩)",canvas.width/2,canvas.height/2)
    }

    let timeToNextDuck = 0;
    let duckInterval = 600;
    function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx2.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(background,0,0,canvas.width,canvas.height);
    ctx.drawImage(startLogo,canvas.width/2 - startLogo.width/4,canvas.height/2 - startLogo.height/4,
    startLogo.width/2,startLogo.height/2);
    let deltaTime = 20;
    timeToNextDuck += deltaTime;
    if(timeToNextDuck > duckInterval){
        duckMoveLeft.push(new DuckMoveLeft());
        timeToNextDuck = 0
        duckMoveLeft.sort(function(a,b){
            return a.width - b.width;
        })
    }
    if(gameStart == true){
    bgsound.play();
    ctx.drawImage(background,0,0,canvas.width,canvas.height);
    drawWind();
    drawDuckToShoot();
    drawTimer();
    updateTimer();
    }
    if(time == 0){
        gameOver = true;
    }
    if(duckToShoot == 0){
        gameWin = true;
    }
    duckMoveLeft.forEach(function(duckMoveLeft){duckMoveLeft.update(deltaTime)})
    duckFallDown.forEach(function(duckFallDown){duckFallDown.update(deltaTime)})
    duckMoveLeft.forEach(function(duckMoveLeft){duckMoveLeft.draw()})
    duckFallDown.forEach(function(duckFallDown){duckFallDown.draw()})
    duckMoveLeft = duckMoveLeft.filter(function (duckMoveLeft){
        return duckMoveLeft.markedForDeletion == false;
    });
    duckFallDown = duckFallDown.filter(function (duckFallDown){
        return duckFallDown.markedForDeletion == false;
    });
    if(gameWin == true){
        bgsound.pause();
        ctx.drawImage(background,0,0,canvas.width,canvas.height);
        drawDuckToShoot();
        drawTimer();
        drawGameWin(); 
        winsound.play();
    } else if(gameOver == true){
        bgsound.pause();
        ctx.drawImage(background,0,0,canvas.width,canvas.height);
        drawDuckToShoot();
        drawTimer();
        drawGameOver();
        losesound.play();
    } else{
        requestAnimationFrame(animate)
    }
    }
    animate();