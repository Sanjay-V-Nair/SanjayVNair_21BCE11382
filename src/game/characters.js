function movePawn(character, direction) {
    const { row, col } = character.position;
    let newRow = row, newCol = col;

    switch (direction) {
        case 'L': newCol -= 1; break;
        case 'R': newCol += 1; break;
        case 'F': newRow -= 1; break;
        case 'B': newRow += 1; break;
    }

    return { newRow, newCol };
}

function moveHero1(character, direction) {
    const { row, col } = character.position;
    let newRow = row, newCol = col;

    switch (direction) {
        case 'L': newCol -= 2; break;
        case 'R': newCol += 2; break;
        case 'F': newRow -= 2; break;
        case 'B': newRow += 2; break;
    }

    return { newRow, newCol };
}

function moveHero2(character, direction) {
    const { row, col } = character.position;
    let newRow = row, newCol = col;

    switch (direction) {
        case 'FL': newRow -= 2; newCol -= 2; break;
        case 'FR': newRow -= 2; newCol += 2; break;
        case 'BL': newRow += 2; newCol -= 2; break;
        case 'BR': newRow += 2; newCol += 2; break;
    }

    return { newRow, newCol };
}

module.exports = { movePawn, moveHero1, moveHero2 };
