
window.addEventListener('keydown', (event) =>
{
    switch (event.key){
        case 'd' :
            keys.d.pressed = true
        break

        case 'a' :
            keys.a.pressed = true
        break

        case ' ' :
            keys.space.pressed = true
            if(player.velocity.y === 0 && keys.space.pressed && health > 0)
            {
             player.velocity.y = -15 
            
            }
            if (event.repeat)
            {
                player.velocity.y = 15
            }
        break

        case 'm' :
            
        break

        case 'Escape' :
            window.location.href = 'index.html'
        break
        }
    
} )

window.addEventListener('keyup', (event) =>
{
    switch (event.key){
        case 'd' :
            keys.d.pressed = false;
        break
        
        case'a':
            keys.a.pressed = false;
        break
        case 'm' :
            keys.pressed = false
       
    }
    
})

window.addEventListener('click', () => 
{
    if(player.direction === 'right')
    {
      mouse.mouse1.clicked = true
      player.Attacking()  
      player.state = 'Attacking'
    }
    else
    {
          
        player.LeftAttacking()
    }
    
})




