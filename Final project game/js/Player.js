class Player extends Sprite
{
    
    constructor({position, collisionBlocks, platformCollision, imageSrc, frameRate, scale = 3, animations,  }) // added "animations"
    {
        super({ imageSrc, frameRate, scale,})//
        this.position = position
        
        

        this.velocity =
        {
            x:0,
            y:1,
        }
        
        this.collisionBlocks = collisionBlocks
        this.platformCollision = platformCollision
        this.dead = false
        
        this.hitbox = 
        {
            position: 
            {
               x: this.position.x,
               y: this.position.y,
            },
            width: 10,
            height: 10,
        }
        
        this.AttackHitbox = 
        {
            position: 
            {
                x: this.position.x,
                y: this.position.y,
            },
            width: 10,
            height: 10,
        }
        

        this.camera = 
        {
            position: 
            {
                x: this.position.x,
                y: this.position.y
            },
            width: 200,
            height: 100,
        }

        this.animations = animations
        this.direction = 'right'
        this.state = 'Idle'
        this.clicking = 'Yes'
        this.Attacking
        this.LeftAttacking
        
        for (let keys in this.animations) {//
            const image = new Image()//
            image.src = this.animations[keys].imageSrc//

            this.animations[keys].image = image//
        }

        for(let mouse in this.animations) {
            const image = new Image()
            image.src = this.animations[mouse].imageSrc
        }
    }

    spriteChange(keys) {
        if(this.image === this.animations[keys].image || !this.loaded ) return
       
        this.currentFrame = 0
        this.image = this.animations[keys].image//
        this.frameBuffer = this.animations[keys].frameBuffer
        this.frameRate = this.animations[keys].frameRate
    }

    spriteChange(animations) 
    {
        if(this.image === this.animations.Death.image)
        {
            if(this.currentFrame === this.animations.Death.frameRate - 1)
            this.dead = true
         return
        }

        if (this.image === this.animations.Attack.image && this.currentFrame < this.animations.Attack.frameRate - 1 
            ||
            this.image === this.animations.AttackLeft.image && this.currentFrame < this.animations.AttackLeft.frameRate - 1) 
        return

        switch(animations)
        {
            case 'Idle' :
            if(this.image !== this.animations.Idle.image)
            {
                this.image = this.animations.Idle.image
                this.frameRate = this.animations.Idle.frameRate
                this.currentFrame = 0
            }
            break

            case 'IdleLeft' :
                if(this.image !== this.animations.IdleLeft.image)
            {
                this.image = this.animations.IdleLeft.image
                this.frameRate = this.animations.IdleLeft.frameRate
                this.currentFrame = 0
            }
            break

            case 'Walk' :
                if(this.image !== this.animations.Walk.image)
            {
                this.image = this.animations.Walk.image
                this.frameRate = this.animations.Walk.frameRate
                this.currentFrame = 0
            }
            break

            case 'WalkB' :
                if(this.image !== this.animations.WalkB.image)
            {
                this.image = this.animations.WalkB.image
                this.frameRate = this.animations.WalkB.frameRate
                this.currentFrame = 0
            }
            break

            case 'Jump' :
                if(this.image !== this.animations.Jump.image)
            {
                this.image = this.animations.Jump.image
                this.frameRate = this.animations.Jump.frameRate
                this.currentFrame = 0
            }
            break

            case 'JumpLeft' :
                if(this.image !== this.animations.JumpLeft.image)
            {
                this.image = this.animations.JumpLeft.image
                this.frameRate = this.animations.JumpLeft.frameRate
                this.currentFrame = 0
            }
            break

            case 'Fall' :
                if(this.image !== this.animations.Fall.image)
            {
                this.image = this.animations.Fall.image
                this.frameRate = this.animations.Fall.frameRate
                this.currentFrame = 0
            }
            break

            case 'FallLeft' :
                if(this.image !== this.animations.FallLeft.image)
            {
                this.image = this.animations.FallLeft.image
                this.frameRate = this.animations.FallLeft.frameRate
                this.currentFrame = 0
            }
            break

            case 'Attack' :
                if(this.image !== this.animations.Attack.image)
            {
                this.image = this.animations.Attack.image
                this.frameRate = this.animations.Attack.frameRate
                this.currentFrame = 0
            }
            break  

            case 'AttackLeft' :
                if(this.image !== this.animations.AttackLeft.image)
            {
                this.image = this.animations.AttackLeft.image
                this.frameRate = this.animations.AttackLeft.frameRate
                this.currentFrame = 0
            }
            break  

            case 'Death' :
                if(this.image !== this.animations.Death.image)
                {
                    this.image = this.animations.Death.image
                    this.frameRate = this.animations.Death.frameRate
                    this.currentFrame = 0
                }


        }
       
    }

    updateCamera()
    {
        this.camera = 
        {
            position: 
            {
                x: this.position.x -200,
                y: this.position.y -200
            },
            width: window.innerWidth - 90,
            height: window.innerHeight -100,
        }
    }

    moveCameraLeft({canvas, cam}) 
    {
        const CameraRight = this.camera.position.x + this.camera.width
        const sum2 = canvas.width
        if(CameraRight >= 8000 ) return
            if(CameraRight >= sum2 + Math.abs(cam.position.x))
            {
            cam.position.x -= this.velocity.x
            }
        
    }

    moveCameraRight({canvas, cam}) 
    {
        if(this.camera.position.x <= 0) return
            if(this.camera.position.x <= Math.abs(cam.position.x))
            {
            cam.position.x -= this.velocity.x
            }
        
    }

    moveCameraDown({canvas, cam})
    {
        if ( this.camera.position.y + this.velocity.y <= 0) return 
        if(this.camera.position.y <= Math.abs(cam.position.y))
        {
            cam.position.y -= this.velocity.y
        }
    }

    moveCameraUp({canvas, cam})
    {
        if ( this.camera.position.y + this.camera.height + this.velocity.y >=1056) return 
        if(this.camera.position.y + this.camera.height >= Math.abs(cam.position.y) + canvas.height)
        {
            cam.position.y -= this.velocity.y
        }
    }


    collideWithRightWallCheck()
    {
        if(this.hitbox.position.x + this.hitbox.width + this.velocity.x + 70 >= 7999 || this.hitbox.position.x + this.velocity.x <= 0)
        {
            this.velocity.x = 0
        }
    }
    Attacking()
    {
        this.spriteChange('Attack')
        this.attack = true
    }

    LeftAttacking()
    {
        this.spriteChange('AttackLeft')
        this.attack = true
    }
    update()
    {
    this.draw()
    this.updateFrames()
    this.updateHitbox()
    this.updateAttackHitbox()
    this.updateCamera()
    
    
    ///Camera Box

    //context.fillStyle = 'rgba(255, 255, 0, 0.5)'
    //context.fillRect(this.camera.position.x, this.camera.position.y,this.camera.width,this.camera.height)
   

    ///Player Hitbox

    //context.fillStyle = 'rgba(0, 255, 0, 0.5)'
    //context.fillRect(this.hitbox.position.x, this.hitbox.position.y,this.hitbox.width,this.hitbox.height)



    ///Player Attack Hitbox


    //context.fillStyle = 'rgba(0, 0, 0, 0.5)'
    //context.fillRect(this.AttackHitbox.position.x, this.AttackHitbox.position.y,this.AttackHitbox.width,this.AttackHitbox.height)

    
    
    this.position.x += this.velocity.x
    
    this.updateHitbox()
    this.checkHCollisions()
    this.Gravity()
    this.updateHitbox()
    this.checkVCollisions()

    }

    
    

    updateHitbox() {
        this.hitbox = {
            position: {
               x: this.position.x + 173 ,
               y: this.position.y  ,
            },
            width: 60,
            height: 105,
        }
        if(this.image === this.animations.Walk.image)
        {
            this.hitbox.position.x = this.hitbox.position.x -20
            this.hitbox.width = 60
        }   

        if (player.direction === 'IdleLeft' )
        {
           this.hitbox.position.x = this.hitbox.position.x - 44
            
        }

        

    }

    updateAttackHitbox() {
        this.AttackHitbox = {
            position: {
               x: this.position.x + 270 ,
               y: this.position.y + 3  ,
            },
            width:  0,
            height: 0,
        }
        if(this.image === this.animations.AttackLeft.image)
        {
            this.AttackHitbox.position.x = this.AttackHitbox.position.x - 225
            this.AttackHitbox.width = 100
            this.AttackHitbox.height = 84
        }
        if ( player.state === 'Attacking')
        {
            
            this.AttackHitbox.width = 100
            this.AttackHitbox.height = 84
        }
        
    }

    checkHCollisions () 
    {
        for (let i = 0; i < this.collisionBlocks.length; i++)
        {
            const block1 = this.collisionBlocks[i]

            if (
                collision({
                object1: this.hitbox,
                object2: block1,
            })
            ) {
                if ( this.velocity.x > 0)
                {
                    this.velocity.x = 0
                    const offsetH = this.hitbox.position.x - this.position.x + this.hitbox.width 
                    this.position.x = block1.position.x - offsetH - 10
                    break
                }

                if ( this.velocity.x < 0)
                {
                    this.velocity.x = 0
                    const offsetH = this.hitbox.position.x - this.position.x 
                    this.position.x = block1.position.x + block1.width - offsetH + 0.01
                    break
                }
            }
        }

        for (let i = 0; i < this.platformCollision.length; i++)
        {
            const block1 = this.platformCollision[i]

            if (
                collision({
                object1: this.hitbox,
                object2: block1,
            })
            ) {
                if ( this.velocity.x > 0)
                {
                    this.velocity.x = 0
                    const offsetH = this.hitbox.position.x - this.position.x + this.hitbox.width 
                    this.position.x = block1.position.x - offsetH + 50
                    break
                }

                if ( this.velocity.x < 0)
                {
                    this.velocity.x = 0
                    const offsetH = this.hitbox.position.x - this.position.x 
                    this.position.x = block1.position.x + block1.width - offsetH + 0.01
                    break
                }
            }
        }

        
    }

    Gravity() {
        this.velocity.y += grav
        this.position.y += this.velocity.y
        
    }

    checkVCollisions () 
    {
        for (let i = 0; i < this.collisionBlocks.length; i++)
        {
            const block1 = this.collisionBlocks[i]

            if (
                collision({
                object1: this.hitbox,
                object2: block1,
            })
            ) {
                if ( this.velocity.y > 0)
                {
                    this.velocity.y = 0

                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                    this.position.y = block1.position.y - offset - 0.01
                    break
                }

                if ( this.velocity.y < 0)
                {
                    this.velocity.y = 0

                    const offset = this.hitbox.position.y - this.position.y 
                    this.position.y = block1.position.y + block1.height - offset - 20
                    break
                }
            }
        }

        for (let i = 0; i < this.platformCollision.length; i++)
        {
            const block1 = this.platformCollision[i]

            if (
                collision({
                object1: this.hitbox,
                object2: block1,
            })
            ) {
                if ( this.velocity.y > 0)
                {
                    this.velocity.y = 0

                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                    this.position.y = block1.position.y - offset - 0.01
                    break
                }

            }
        }
    }   
}