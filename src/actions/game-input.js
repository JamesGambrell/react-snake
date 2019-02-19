export const KEYPRESS = "KEYPRESS";
export const MOUSE_CLICK = "MOUSE_CLICK";
export const MOUSE_MOVE = "MOUSE_MOVE";

export const keyPress = (evt, type) => {
    console.log('keyPress: ', evt);
    console.log(evt.key);
    var dir = "";
    switch(evt.key){
        case "ArrowUp":
        case "w":
        case "W":
            dir = "up";
            break;

        case "ArrowRight":
        case "d":
        case "D":
            dir = "right";
            break;

        case "ArrowDown":
        case "s":
        case "S":
            dir = "down";
            break;

        case "ArrowLeft":
        case "a":
        case "A":
            dir = "left";
            break;
    }
    return {
        type: KEYPRESS,
        payload: dir
    }
};