const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const GameScore = document.querySelector('#score')

canvas.width = window.innerWidth - 25
canvas.height =  window.innerHeight - 25

const grav = 0.5
this.sound = new Audio()
this.sound.src = "music/Princess Peach.mp3"
let Respawn = document.getElementById('Respawn')
let PlayAgain = document.getElementById('Play-Again') 

this.gameOver = false
this.timer = 0
this.projectiles = []

this.colliding = false

this.health = 3
let score = 0
this.FinalScore = 0

//Adds floor collision blocks to an array that can be used to check for collision
const array = []
for (let i = 0; i< floorCollision.length; i += 250 ){
    array.push(floorCollision.slice(i, i + 250))

}
const collisionBlocks = []

//goes through each tile to check whether there are collsion blocks placed there
array.forEach((row, y) => 
{
    row.forEach((colBlock,x) => {
        if( colBlock === 6063) {
            collisionBlocks.push( 
                new CollisionBlock({
                position: {
                    x: x * 32,
                    y: y * 32
                },
            }))
        }
    })
})

//Adds platform collision blocks to an array to check for platform collsions
const platformArray = []
for (let i = 0; i< platformCollisionBlocks.length; i += 250 ){
    platformArray.push(platformCollisionBlocks.slice(i, i + 250))

}

//Goes through each tile looking for platform collsion blocks on the map
const platformCollision = []

platformArray.forEach((row, y) => 
{
    row.forEach((colBlock,x) => {
        if( colBlock === 6063) {
            
            platformCollision.push( 
                new CollisionBlock({
                position: {
                    x: x * 32,
                    y: y * 32
                },
            }))
        }
    })
})



//Creates an instance of a new player
const player = new Player({
    position:
    {   
        x: -160,
        y: 200,
    },
    
    collisionBlocks,
    platformCollision,
    imageSrc: './img/Idle.png',
    frameRate: 10,
    

    animations: {
        Idle: {
            
            imageSrc: './img/Idle.png',
            frameRate: 9.9,
            
        },
        IdleLeft: {
            
            imageSrc: './img/Idle-Left.png',
            frameRate: 9.9,
            
        },
        Walk: {
            imageSrc :'./img/Run.png',
            frameRate: 5.9,
            
        },
        WalkB: {
            imageSrc: 'img/RunB.png',
            frameRate: 5.9,
            
        },
        Jump: {
            imageSrc: 'img/Jump.png',
            frameRate: 2,
            
        },
        JumpLeft: {
            imageSrc: 'img/Jump-Left.png',
            frameRate: 2,
           
        },
        Fall: {
            imageSrc: 'img/Fall.png',
            frameRate: 2,
        
        },
        FallLeft: {
            imageSrc: 'img/Fall-Left.png',
            frameRate: 2,
          
        },
        Attack: {
            imageSrc: 'img/Attack1.png',
            frameRate: 4,

        },
        AttackLeft: {
            imageSrc: 'img/LeftAttack1.png',
            frameRate: 4,
        },
        Death: {
            imageSrc: './img/Death.png',
            frameRate: 9,
        }
    }
})


//Class for collectible
    class Essence 
    {
        constructor({position})
        {
            this.position = position
            this.radius = 20
            this.image = new Image()
            this.image.src = './img/Essence.png'
            this.width = 30
            this.height = 30
        }

        draw()
        {
           
           context.drawImage(this.image,this.position.x, this.position.y,this.width, this.height)
        }
        update()
        {
            this.draw()
        }
    }

    //creates an Array that stores the different instances of Essence
    const Essences = [
        new Essence({
            position :
            {
                x: 1100,
                y: 825,
            },
        }),
        new Essence({
            position :
            {
                x: 2730,
                y: 770,
            },
        }),
        new Essence({
            position :
            {
                x: 3850,
                y: 600,
            },
        }),
        
        new Essence({
            position :
            {
                x: 7800,
                y: 800,
            },
        }),
        
    ]

    //Creates an instance of essence that is high up
    const AirEssence = 
    [
        new Essence({
            position :
            {
                x: 2900,
                y: 270,
            },
        }),
    ]
    
    //Creates instance of an enemy
    const enemy = new Enemy({
    position :
    {
        x: 820,
        y: 735,
    },
    
    imageSrc: './img/Enemy-Shooting.png',
    shooting: true,
    animations:
    {
        Shooting :
        {
            imageSrc : './img/Enemy-Shooting.png',
            frameRate: 6.95
        },
        Dead :
        {
            imageSrc : './img/Enemy-Dead(Left).png',
            frameRate : 8
        },
        ShootingRight:
        {
            imageSrc : './img/Enemy-Shooting-Right.png',
            frameRate: 6.95
        }
    },
    frameRate:6.95,
    dead : false

    })

    //Creates instance of a second enemy
    const enemy2 = new Enemy({
        position :
        {
            x: 2510,
            y: 670,
        },
        imageSrc: './img/Enemy-Shooting.png',
        shooting : true,
        frameRate:6.95,
        dead:false
        })

    //Creates instance of a third enemy
    const enemy3 = new Enemy({
        position :
        {
        x: 3650,
        y: 510,
        },
        imageSrc: './img/Enemy-Shooting.png',
        shooting : true,
        frameRate:6.95,
        dead:false
        })

    //Creates instance of a fourth enemy
    const enemy4 = new Enemy({
        position :
        {
        x: 3050,
        y: 190,
        },
        imageSrc: './img/Enemy-Shooting-Right.png',
        shooting : true,
        frameRate:6.95,
        dead:false
        })    
    

    //Stores what keys are pressed
    const keys = {
        d :
        {
            pressed: false,
        },
        a:
        {
            pressed: false,
        },
        space:
        {
            pressed : false,
        },
        m:
        {
            pressed : false,
        }

    }

    //Stores when mouse is clicked
    const mouse = 
    {
    mouse1:
    {
        clicked: false,
    }
        
    }


    //Creates instance of background map
    const background = new Sprite
    ({
        position: 
        {
            x: 0,
            y: 0, 
        },
        imageSrc: './img/Game map 5.png',
        
    }) 

    //Creates the starting camera when player spawns
    const cam =
    {
        position:
        {
            x: 0,
            y: 0,
        },
    }

    //Creates an array which stores the instance of many projectiles
    const projectiles = [ 
        new Projectile
        ({
            position:
            {
                x:enemy.position.x ,
                y:enemy.position.y + 55,
            },
            velocity:
            {
            x: -5,
            y:0, 
            },
            imageSrc: './img/projectile.png'
            
        })]

function animate()
{    
    
    timer++
    //Enemies shoot every time the timer reaches a multiple of 100
    if(timer % 100 === 0 && this.health > 0 )
            {
                if(enemy.shooting == true)
                {
                    
                    projectiles.push(new Projectile({
                    position:
                    {
                        x:enemy.position.x,
                        y:enemy.position.y + 55,
                    },
                    velocity:
                    {
                       x: -5,
                       y:0, 
                    },
                    imageSrc: './img/projectile.png' 
                    }))   
                    
                    
                
                }

                //If enemy is seen by player camera they start shooting
                if(player.camera.position.x + player.camera.width - 50 >= enemy2.position.x && enemy2.shooting === true)
                {
                    
                    projectiles.push(new Projectile({
                    position:
                    {
                        x:enemy2.position.x,
                        y:enemy2.position.y + 55,
                    },
                    velocity:
                    {
                       x: -5,
                       y:0, 
                    },
                    imageSrc: './img/projectile.png'
                    }))
                }

                //If enemy is seen by player camera they start shooting
                if(player.camera.position.x + player.camera.width - 50 >= enemy3.position.x && enemy3.shooting === true)
                {
                    
                    projectiles.push(new Projectile({
                    position:
                    {
                        x:enemy3.position.x,
                        y:enemy3.position.y + 55,
                    },
                    velocity:
                    {
                       x: -5,
                       y:0, 
                    },
                    imageSrc: './img/projectile.png'
                    }))
                }

                //If enemy is seen by player camera they start shooting
                if(player.camera.position.x + player.camera.width - 50 >= enemy4.position.x && enemy4.shooting === true)
                {
                    
                    projectiles.push(new Projectile({
                    position:
                    {
                        x:enemy4.position.x + 100,
                        y:enemy4.position.y + 55,
                    },
                    velocity:
                    {
                       x:5,
                       y:0, 
                    },
                    imageSrc: './img/projectile-Right.png'
                    }))
                }
               
            }
            
        

     

    this.sound.play() // Plays music
    sound.volume = 0.1 //Turns volume down
    context.fillStyle = 'white'
    context.fillRect(0,0,canvas.width,canvas.height)
        
    
    context.save()
    context.scale(1.01,1)// Scales map down
    context.translate(cam.position.x,cam.position.y)
    background.update() 
    player.update()// Updates player positions, hitbox etc

    
    //Checks for collision betweeen essence and player, also adds to score if collided
    Essences.forEach((Essence,i) =>
    {
        
        Essence.draw()

        if(Math.hypot(Essence.position.x - player.position.x , Essence.position.y - player.position.y - 200 ) < Essence.width/2 + player.width/2)
        {
            
            Essences.splice(i, 1)
            this.FinalScore++
            
            score += 1
            GameScore.innerHTML = score
        }
    })

    //Checks for collision between the player and 
    AirEssence.forEach((Essence,i) =>
    {
        
        Essence.draw()

        if(Math.hypot(Essence.position.x - player.position.x - 300, Essence.position.y - player.position.y - 200 ) < Essence.width/2 + player.width/2)
        {
            AirEssence.splice(i, 1)
            this.FinalScore++
            
            score += 1
            GameScore.innerHTML = score
        }
    })
    player.collideWithRightWallCheck()
    
    
    enemy.update()
    enemy2.update()
    enemy3.update()
    enemy4.update()
   
    projectiles.forEach((projectile, index) => 
        {
           
            if(projectile.position.x  <= 0)
            {
                setTimeout(() => 
                {
                    projectiles.splice(index,1)
                },0)
                
            }
            else if (projectile.colliding === true)
            { 
                this.colliding = true
                setTimeout(() => 
                {
                    this.health--
                       
                    
                    projectiles.splice(index,1)
                },0)
                
                setTimeout(() =>
                {
                   if(this.health === 0)
                   {
                    this.gameOver = true
                    document.querySelector('#GameOver').style.display = 'flex'
                    this.sound.pause()
                   }
                    
                
                },2000)
                
            }
            else
            {
                projectile.update()
               
            }
            

           
            
        })
    
    
       
    

    ///Creates collsion blocks where they are on the tilemap
   
    //collisionBlocks.forEach((collisionBlock) => {
    //    collisionBlock.update()
    //})
    
  
    if (keys.d.pressed )
    {   
        mouse.mouse1.clicked = false
        player.direction = 'right'
        player.clicking = 'No'
        player.spriteChange('Walk')
        player.state = 'WalkRight'
        player.velocity.x = 5
        player.moveCameraLeft({canvas, cam})

    } 
    else if (keys.a.pressed ) 
    {   player.direction = 'left'
        player.clicking = 'No'
        player.spriteChange('WalkB')
        player.state = 'WalkLeft'
        player.velocity.x = -5
        player.moveCameraRight({canvas, cam})
    }
    else
    {
        player.velocity.x = 0
    }
    
    if(keys.d.pressed) 
    {
        
        //background.position.y = background.position.y - 3
    }
    else if (keys.a.pressed)
    {
        
    }
    else if (player.velocity.y === 0 || player.velocity.x === 0 && player.dead === 'false')
    {
        
        if (player.direction === 'right')
        {
            player.clicking = 'No'
            player.spriteChange('Idle')
            player.state = 'Idle'
            
        }
        else 
        {
            player.clicking = 'No'
            player.spriteChange('IdleLeft')
            player.direction = 'IdleLeft'
            player.state = 'IdleLeft'
            
        }
    }

    if (player.velocity.y < 0 ) 
    {
        player.moveCameraDown({canvas, cam})
        if(player.direction === 'right')
        {
            player.clicking = 'No'
            player.spriteChange('Jump')
            player.state = 'JumpRight'
        }
        else
        {
            player.direction = 'left'
            player.clicking = 'No'
            player.spriteChange('JumpLeft')
            player.state = 'JumpLeft'
        }    
    }
    if (player.velocity.y > 0 )
    {
        player.moveCameraUp({cam, canvas})
        if(player.direction === 'right')
        {
            player.clicking = 'No'
            player.spriteChange('Fall')
            player.state = 'FallRight'
        }
        else
        {
            player.direction = 'left'
            player.clicking = 'No'
            player.spriteChange('FallLeft')
            player.state = 'FallLeft'
        } 

    }
 

    if(player.position.y > 1080) 
    {
        this.health = 0
        this.gameOver = true
       document.querySelector('#GameOver').style.display = 'flex'
       this.sound.pause()
    }

    if (this.health === 0)
    {
        player.spriteChange('Death')
        player.velocity.x === 0 
        player.velocity.y === 0
       // player.currentFrame = 0
        player.frameBuffer = 9
        document.querySelector('#Health').style.width = '0px'
    }

    context.restore()
    
    if(this.gameOver === false)
    { 
     requestAnimationFrame(animate)
    }


    if(this.health === 2)
    {
        document.querySelector('#Health').style.width = '200px'
    }

    if(this.health === 1)
    {
        document.querySelector('#Health').style.width = '100px'
    }

    if(this.FinalScore === 5)
    {
        document.querySelector('#You-Win').style.display = 'flex'
        player.velocity.x = 0
        player.velocity.y = 0
        
    }
    

    
   
}


animate()

Respawn.addEventListener('click', () =>
{document.querySelector('#GameOver').style.display = 'none'
location.reload()
})

PlayAgain.addEventListener('click',() =>
{
    document.querySelector('#You-Win').style.display = 'none'
    location.reload()
})



