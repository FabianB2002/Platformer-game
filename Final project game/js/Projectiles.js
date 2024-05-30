class Projectile 
{
    constructor({position, velocity, imageSrc})
    {
        this.position = position
        this.velocity = velocity
        this.image = new Image()
        this.image.src = imageSrc

        this.colliding = false

        this.hitbox =
        {
            position:
            {
                x:this.position.x += this.velocity.x,
                y:this.position.y += this.velocity.y,
            },
            width:10,
            height:10
        }
    }

    draw()
    {
        context.drawImage(this.image,this.position.x,this.position.y)
        
    }
    update()
    {
        this.updateHitbox()
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.checkHCollisions()
        this.updateHitbox()
    }


    updateHitbox() 
    {
        this.hitbox = 
        {
            position:
            {
                x: this.position.x,
                y: this.position.y,
            },
            width: 35,
            height: 5
        }
    }

    checkHCollisions () 
    {

        const block1 = player.hitbox
            if (
                collision({
                object1: this.hitbox,
                object2: block1,
            })
            ) {
                if ( this.velocity.x > 0)
                {
                    this.colliding = true
                    this.velocity.x = 0
                    const offsetH = this.hitbox.position.x - this.position.x + this.hitbox.width 
                    this.position.x = block1.position.x - offsetH - 0.01
                    
                }

                if ( this.velocity.x < 0)
                {
                    this.colliding = true

                    this.velocity.x = 0
                    const offsetH = this.hitbox.position.x - this.position.x 
                    this.position.x = block1.position.x + block1.width - offsetH + 0.01
                    
                    
                }
            }
    }
    
}