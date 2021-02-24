import * as _ from 'lodash'

import {Upgrade} from './upgrade'

interface PurchasedUpgrade {
  name: string
  boost: number
  waitingTime: number
}

export interface FarmState {
  habUpgradeTime: number
  otherResearchTime: number
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
    const newHabUpgradeTime = habUpgradeCost / newEarningRate
    const newTotalTime = upgradeCostTime + state.otherResearchTime + newHabUpgradeTime
    if (newTotalTime < state.habUpgradeTime + state.otherResearchTime) {
      const newPurchase = {
        name: u.name,
        boost: u.getNextBoost(),
        waitingTime: upgradeCostTime,
      }
      u.upgrade()

      return {
        habUpgradeTime: newHabUpgradeTime,
        otherResearchTime: state.otherResearchTime + upgradeCostTime,
        earningRate: newEarningRate,
        upgrades: state.upgrades.filter(u => !u.isExhausted()),
        upgradeSequence: state.upgradeSequence.concat(newPurchase),
      }
    }
  }

  return null
}

