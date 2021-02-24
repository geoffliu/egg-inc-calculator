import { computeTrophyAttemptDetails } from './index'

const state = computeTrophyAttemptDetails({
  earningBonus: 2241,
  habBoost: 0,
  eggValueBoost: 0,
})

console.log(state.upgradeSequence)
console.log('Final earning rate:')
console.log(state.earningRate)
console.log('Total time required (days):')
console.log((state.habUpgradeTime + state.otherResearchTime) / 3600 / 24)
