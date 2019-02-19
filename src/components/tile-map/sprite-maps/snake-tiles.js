const SNAKE_TILES = [
    "HEAD_UP",
    "HEAD_RIGHT",
    "HEAD_DOWN",
    "HEAD_LEFT",
    "TAIL_UP",
    "TAIL_RIGHT",
    "TAIL_DOWN",
    "TAIL_LEFT",
    "BODY_UP_RIGHT",
    "BODY_DOWN_RIGHT",
    "BODY_LEFT_DOWN",
    "BODY_LEFT_UP",
    "BODY_UP_DOWN",
    "BODY_LEFT_RIGHT",
    "RABBIT",
    "BODY_FULL"
].reduce((obj, val, idx) => {
    obj[val] = idx;
    obj.tiles.push({
        tileId: idx,
        offset: `${(idx % 4) * (-1*obj.size)}px ${Math.floor(idx / 4) * (-1*obj.size)}px`
    });
    return obj;
}, {
        size: 30,
        img: process.env.PUBLIC_URL + 'assets/img/snake.png',
        tiles: []
});

export default SNAKE_TILES;