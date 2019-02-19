const GROUND_TILES = [
    "GRASS_1",
    "GRASS_2",
    "GRASS_3",
    "GRASS_4",
    "PLANT_1",
    "PLANT_2",
    "PLANT_3",
    "PLANT_4",
    "FLOWER_1",
    "FLOWER_2",
    "FLOWER_3",
    "FLOWER_4",
    "STUMP_1"
].reduce((obj, val, idx) => {

    var tileOffset;

    switch(val){
        case 'GRASS_1':
            tileOffset = `${0 * (-1 * obj.size)}px 0px`;
            break;

        case 'GRASS_2':
            tileOffset = `${1 * (-1 * obj.size)}px 0px`;
            break;

        case 'GRASS_3':
            tileOffset = `${2 * (-1 * obj.size)}px 0px`;
            break;

        case 'GRASS_4':
            tileOffset = `${3 * (-1 * obj.size)}px 0px`;
            break;

        case 'PLANT_1':
            tileOffset = `${0 * (-1 * obj.size)}px ${4 * (-1 * obj.size)}px`;
            break;

        case 'PLANT_2':
            tileOffset = `${1 * (-1 * obj.size)}px ${4 * (-1 * obj.size)}px`;
            break;

        case 'PLANT_3':
            tileOffset = `${2 * (-1 * obj.size)}px ${4 * (-1 * obj.size)}px`;
            break;

        case 'PLANT_4':
            tileOffset = `${3 * (-1 * obj.size)}px ${4 * (-1 * obj.size)}px`;
            break;

        case 'FLOWER_1':
            tileOffset = `${0 * (-1 * obj.size)}px ${15 * (-1 * obj.size)}px`;
            break;

        case 'FLOWER_2':
            tileOffset = `${10 * (-1 * obj.size)}px ${15 * (-1 * obj.size)}px`;
            break;

        case 'FLOWER_3':
            tileOffset = `${14 * (-1 * obj.size)}px ${15 * (-1 * obj.size)}px`;
            break;

        case 'FLOWER_4':
            tileOffset = `${15 * (-1 * obj.size)}px ${13 * (-1 * obj.size)}px`;
            break;

        case 'STUMP_1':
            tileOffset = `${4 * (-1 * obj.size)}px 0px`;
            break;
    }

    obj[val] = idx;
    obj.tiles.push({
        tileId: idx,
        offset: tileOffset
    });
    return obj;
}, {
        size: 30,
        img: process.env.PUBLIC_URL + 'assets/img/ground.png',
        tiles: []
});

export default GROUND_TILES;