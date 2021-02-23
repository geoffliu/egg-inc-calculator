import * as _ from 'lodash'

import {WORMHOLE_DAMPENING_COSTS} from './upgrade_data'
import {nextUpgrade, FarmState} from './simulator'
import {getAllUpgrades} from './upgrade'

// At 1.499 o% of EB, with 50k chickens, and all upgrade up to tier 10
// completed, earning rate is 0.3649 d/s
const SAMPLE_EB = 1.499
const SAMPLE_EARNING = 0.3649

// In 10 millions
const BASE_HAB = 756
const TARGET_HAB = 1000

function getTotalHabUpgradeCost(habBoost: number) {
  const requiredRatio = TARGET_HAB / BASE_HAB / (habBoost / 100 + 1)
  if (requiredRatio < 1) {
    return 0
  }

  const numUpgrades = (requiredRatio - 1) / 0.02
  return _.sum(WORMHOLE_DAMPENING_COSTS.slice(0, Math.ceil(numUpgrades)))
}

interface BoostParameters {
  // In o%
  earningBonus: number

  // Hab capacity boost percent
  habBoost: number

  // Egg value boost percent
  eggValueBoost: number
}

export function computeTrophyAttemptDetails(params: BoostParameters) {
  const { earningBonus, habBoost, eggValueBoost } = params
  const habUpgradeCost = getTotalHabUpgradeCost(habBoost)

  const initialEarning = SAMPLE_EARNING  / SAMPLE_EB * earningBonus
    * BASE_HAB * 1e7 / 50000
    * eggValueBoost

  let currState: FarmState = {
    elapsedTime: 0,
    earningRate: initialEarning,

    upgrades: getAllUpgrades(),
    upgradeSequence: []
  }

  while (true) {
    const nextState = nextUpgrade(currState, habUpgradeCost)
    if (!nextUpgrade) {
      return currState
    }
    currState = nextState
  }
}

export { CAVEATS } from './caveats'
