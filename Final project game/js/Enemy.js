class Enemy
{
    constructor({position, frameRate , frameBuffer = 12, imageSrc, shooting, animations})
    {
        this.image = new Image()
        
        this.image.onload = () => {
            const scale = 2
            this.width = 170
            this.height = 130 
            this.loaded = true
        }
        this.image.src = imageSrc
        this.frameRate = frameRate
        this.frameBuffer = frameBuffer
        this.pastFrames = 0
        this.currentFrame = 0
        this.position = position
        this.animations = animations
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
        this.velocity =
        {
            x:1,
            y:1
        }
        this.shooting = shooting
        this.score = 0
        this.showHitbox = true

    }

    spriteChange() {
        if(this.image === this.animations.image || !this.loaded ) return
       
        this.currentFrame = 0
        this.image = this.animations.image//
        this.frameBuffer = this.animations.frameBuffer
        this.frameRate = this.animations.frameRate
    }

    spriteChange(animations)
    {
        if(this.image === this.animations.Dead.image)
            {
                if(this.currentFrame === this.animations.Dead.frameRate - 1)
                
                this.dead = true
                return
            }
        switch(animations)
        {
            
            case 'Shooting':
                if(this.image !== this.animations.Shooting.image)
                {
                    this.image = this.animations.Shooting.image
                    this.frameRate = this.animations.Shooting.frameRate
                    this.currentFrame = 0
                   
                }
                break
                case 'Dead':
                    if(this.image !== this.animations.Dead.image)
                    {
                        this.image = this.animations.Dead.image
                        this.frameRate = this.animations.Dead.frameRate
                        this.currentFrame = 0
                       
                    }    
                break
                case 'ShootingRight':
                if(this.image !== this.animations.ShootingRight.image)
                {
                    
                    this.image = this.animations.ShootingRight.image
                    this.frameRate = this.animations.ShootingRight.frameRate
                    this.currentFrame = 0
                   
                }
                break
        }

    }

    draw()
    {
        if (!this.image) return

        const crop = 
        {
            position: {
                x: this.currentFrame * (this.image.width/ this.frameRate),
                y: 0,
            },
            width: this.image.width / this.frameRate,
            height: this.image.height,
        }
        context.drawImage(this.image, crop.position.x, crop.position.y, crop.width, crop.height, this.position.x, this.position.y,this.width,this.height)
    }
    update()
    {
        this.draw() 
        if(this.showHitbox === true)
        {
           this.updateHitbox() 
        }
        
        this.updateFrames()
        this.checkHCollisions()
        if(this.showHitbox === true)
        {
           this.updateHitbox() 
        }
        
        ///Enemy Hitbox
         //context.fillStyle = 'rgba(0, 255, 0, 0.5)'
         //context.fillRect(this.hitbox.position.x, this.hitbox.position.y,this.hitbox.width,this.hitbox.height)
        
    }

    updateFrames() {
        this.pastFrames++
        if(this.pastFrames % this.frameBuffer === 0)
        {
        if(this.currentFrame < this.frameRate - 1)
        this.currentFrame++
        else this.currentFrame = 0
        }
         
    }

    updateHitbox()
    {
        this.hitbox = 
        {
            position: 
            {
               x: this.position.x + 45,
               y: this.position.y + 30,
            },
            width: 40,
            height: 80,
        }
    }

    checkHCollisions () 
    {
         if (
                collision({
                object1: this.hitbox,
                object2: player.AttackHitbox,
            })
            ) {
                if ( this.velocity.x > 0)
                {
                   this.width = 0
                   this.height = 0 
                   this.hitbox.width = 0
                   this.hitbox.height = 0
                   this.hitbox.position.x = 0
                   this.hitbox.position.y = 0
                   this.showHitbox = false
                   this.shooting = false
                   this.dead = true
                   this.score++
                }
                else this.shooting = true
            }

            if (
                collision({
                object1: this.hitbox,
                object2: player.hitbox,
            })
            ) {
                if ( player.hitbox.position.x = this.hitbox.position.x)
                {
                
                  player.spriteChange('Death')
                    player.velocity.x === 0 
                    player.velocity.y === 0
                    player.frameBuffer = 9
                    document.querySelector('#Health').style.width = '0px'
                    document.querySelector('#GameOver').style.display = 'flex'
                    this.sound.pause()

                    setTimeout(() =>
                    {
                        this.gameOver = true
                    },1000)
                }
                else this.shooting = true
            }
    }
}