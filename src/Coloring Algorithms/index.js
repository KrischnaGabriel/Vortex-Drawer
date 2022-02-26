
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

/*
    obj = {
        length: number between max diameter 2 and 0
        loop: integer of which loop that is starting at 0
    }
    max_loops: max amount of loops that exist
*/
var max_loops
var index = [
    {
        name: "length->hue",
        code: function(current_loop) {
            return function(length) {

                // circle d=2 so length can be max 2 . sooo
                let hue = Math.floor(length * 180) // value from 0 to 359 max

                return {stroke:"hsl("+hue+", 100%, 50%)"}
            }
        },
        staticStyles: {
            "stroke-width": "auto",
            "opacity": "auto",
        }
        
    },
    {
        name: "loop->color length=opacity",
        code: function(current_loop) {
            let hue = 360/max_loops * (current_loop)
            return function(length) {
                let opacity = length/2
                return {stroke:"hsl("+hue+", 100%, 50%)", opacity: opacity }
            }
        },
        staticStyles: {
            "stroke-width": "0.003",
        }
    },
]
index.set_max_loops = (value)=>{max_loops=value}
export default index;