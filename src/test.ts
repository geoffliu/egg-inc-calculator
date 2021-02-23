import { computeTrophyAttemptDetails } from './index'

const state = computeTrophyAttemptDetails({
  earningBonus: 2.1,
  habBoost: 0,
  eggValueBoost: 0,
})

console.log(state.upgradeSequence)
console.log('Total time required (days):')
console.log(state.totalTime / 3600 / 24)
