/* prettier-ignore */
const drawings = {
  'J': [
    '   XXX',
    '     X',
    '     X',
    ' X   X',
    '  XXX '
  ],
  'O': [
    '  XXX ',
    ' X   X',
    ' X   X',
    ' X   X',
    '  XXX '
  ],
  'H': [
    ' X   X',
    ' X   X',
    ' XXXXX',
    ' X   X',
    ' X   X'
  ],
  'N': [
    ' X   X',
    ' XX  X',
    ' X X X',
    ' X  XX',
    ' X   X',
  ],
}

type alphabet = keyof typeof drawings

function drawWord(word: string) {
  const CANVAS_WIDTH = 51
  const WORD_WIDTH = 6
  const PADDING_X = Math.floor((CANVAS_WIDTH - WORD_WIDTH * word.length) / 2)
  const PADDING_Y = " ".repeat(CANVAS_WIDTH)

  const graph: string[][] = []

  graph.push(PADDING_Y.split(""))

  for (let row = 0; row < 5; row++) {
    let line = "".padStart(PADDING_X)

    for (const char of word.toUpperCase()) {
      const alphabet = char as alphabet
      if (drawings[alphabet]) {
        line += drawings[alphabet][row]
      }
    }
    graph.push(line.padEnd(CANVAS_WIDTH).split(""))
  }

  graph.push(PADDING_Y.split(""))

  const transposed = graph[0].map((_, col) => graph.map((row) => row[col]))
  return transposed.map((line) => line.join(""))
}

const pattern = drawWord("Joohoon")
const mask = pattern.flatMap((line) =>
  line.split("").map((char) => char === " ")
)

export { pattern, mask }

/*
                                                   
       XXX  XXX   XXX  X   X  XXX   XXX  X   X     
         X X   X X   X X   X X   X X   X XX  X     
         X X   X X   X XXXXX X   X X   X X X X     
     X   X X   X X   X X   X X   X X   X X  XX     
      XXX   XXX   XXX  X   X  XXX   XXX  X   X     
                                                   
*/
