import * as _ from 'lodash'

import {Upgrade} from './upgrade'

interface PurchasedUpgrade {
  name: string
  boost: number
}

export interface FarmState {
  totalTime: number
  elapsedTime: number
  earningRate: number

  upgrades: Upgrade[]
  upgradeSequence: PurchasedUpgrade[]
}

export function nextUpgrade(state: FarmState, habUpgradeCost: number): FarmState | null {
  const upgradesToTry = _.sortBy(state.upgrades, u => u.getNextUpgradeCost())
  for (const u of upgradesToTry) {
    const boostDifferential = u.getNextBoostDifferential()
    const newEarningRate = state.earningRate * boostDifferential

    const upgradeCostTime = u.getNextUpgradeCost() / state.earningRate
    const newTotalTime = upgradeCostTime + habUpgradeCost / newEarningRate
    if (newTotalTime < state.totalTime) {
      const newPurchase = {
        name: u.name,
        boost: u.getNextBoost(),
      }
      u.upgrade()

      return {
        totalTime: newTotalTime,
        elapsedTime: state.elapsedTime + upgradeCostTime,
        earningRate: newEarningRate,
        upgrades: state.upgrades.filter(u => !u.isExhausted()),
        upgradeSequence: state.upgradeSequence.concat(newPurchase),
      }
    }
  }

  return null
}

