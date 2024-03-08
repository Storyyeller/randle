import { WORDS } from '../constants/wordlist'
import { VALIDGUESSES } from '../constants/validGuesses'

const WORDSET = new Set([...WORDS, ...VALIDGUESSES]);

export const isWordInWordList = (word: string) => {
  return WORDSET.has(word.toLowerCase())
}

export const isWinningWord = (word: string) => {
  return solution === word
}

const scorePair = (solution: string, firstGuess: string) => {
  const letters = solution

  // Keep generating solution,firstGuess pairs until we find one
  // that gives some information, but not too much
  // green counts 2, yellow counts 1
  let score = 0
  for (let i=0; i<5; ++i) {
    if (solution[i] === firstGuess[i]) {score+=2}
    else if (letters.includes(firstGuess[i])) {score++}
  }
  return score
}

export const getWordOfDay = () => {
  const epochMs = new Date('March 6, 2024 00:00:00').valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay - 1 / 24)
  const nextday = (index + 1) * msInDay + epochMs

  const wordlist = [...WORDSET]

  let state = 12345678
  function next() {
    state ^= state << 13
    state ^= state >> 17
    state ^= state << 5
    return state >>> 1
  }

  // Ensure that the same word is not chosen twice by choosing the
  // words for every previous day without replacement
  let chosen = [];
  let unchosen = [...WORDS]
  while (chosen.length <= index) {
    let i = next() % unchosen.length
    unchosen[unchosen.length-1] = unchosen[i]
    chosen.push(unchosen.pop())
  }
  const solution = (chosen[index] || '').toUpperCase()
  if (state !== index) {state ^= index;}

  // let solution = WORDS[next() % WORDS.length].toUpperCase()
  let firstGuess = wordlist[next() % wordlist.length].toUpperCase()
  while (true) {
    const score = scorePair(solution, firstGuess);
    if (score > 0 && score <= 3) {
      break
    }
    // solution = WORDS[next() % WORDS.length].toUpperCase()
    firstGuess = wordlist[next() % wordlist.length].toUpperCase()
  }

  return {
    solution,
    firstGuess,
    solutionIndex: index,
    tomorrow: nextday,
  }
}

export const { solution, firstGuess, solutionIndex, tomorrow } = getWordOfDay()
