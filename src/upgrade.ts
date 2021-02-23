
export class Upgrade {
  private nextStep = 0

  constructor(readonly name: string, private upgradeVector: number[], private upgradeCosts: number[]) {
  }

  upgrade() {
    this.nextStep++
  }

  getNextUpgradeCost() {
    return this.upgradeCosts[this.nextStep]
  }

  getNextBoost() {
    return this.upgradeVector[this.nextStep]
  }

  getNextBoostDifferential() {
    const boostDifferential = this.upgradeVector[this.nextStep] / this.upgradeVector[this.nextStep - 1]
    return boostDifferential
  }

  isExhausted() {
    return this.upgradeVector.length === this.nextStep
  }
}

export function getAllUpgrades(): Upgrade[] {
  return []
}
