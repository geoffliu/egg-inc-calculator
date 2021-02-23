import {
  GRAVITON_COATING,
  CRYSTALLINE_SHELLING,
  TELEPATHIC_WILL,
  ATOMIC_PURIFICATION,
  MULTIVERSAL_LAYERING,
  TIMELINE_DIVERSION,
  EGGSISTOR_MINIATURIZATION,
  UpgradeVector,
} from './upgrade_data'

export class Upgrade {
  private nextStep = 0

  constructor(readonly name: string, private upgradeVector: UpgradeVector) {
  }

  upgrade() {
    this.nextStep++
  }

  getNextUpgradeCost() {
    return this.upgradeVector[this.nextStep][0]
  }

  getNextBoost() {
    return this.upgradeVector[this.nextStep][1]
  }

  getNextBoostDifferential() {
    const prevBoost = this.nextStep === 0 ? 1 : this.upgradeVector[this.nextStep - 1][1]
    const boostDifferential = this.upgradeVector[this.nextStep][1] / prevBoost
    return boostDifferential
  }

  isExhausted() {
    return this.upgradeVector.length === this.nextStep
  }
}

export function getAllUpgrades(): Upgrade[] {
  return [
    new Upgrade('GRAVITON_COATING', GRAVITON_COATING),
    new Upgrade('CRYSTALLINE_SHELLING', CRYSTALLINE_SHELLING),
    new Upgrade('TELEPATHIC_WILL', TELEPATHIC_WILL),
    new Upgrade('ATOMIC_PURIFICATION', ATOMIC_PURIFICATION),
    new Upgrade('MULTIVERSAL_LAYERING', MULTIVERSAL_LAYERING),
    new Upgrade('TIMELINE_DIVERSION', TIMELINE_DIVERSION),
    new Upgrade('EGGSISTOR_MINIATURIZATION', EGGSISTOR_MINIATURIZATION),
  ]
}
