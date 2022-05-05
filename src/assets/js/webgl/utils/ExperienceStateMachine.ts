enum ExperienceStep {
    IDLE,
    DEPOLLUTION,
    REVEGETATION,
    FEEDING,
    END
}

interface DepollutionStatus {
    bottlesPicked: number;
    buttsPicked: number;
    plasticBagsPicked: number;
    cansPicked: number;
    trashBagsPicked: number;
}

const BOTTLES_AMOUNT = 3
const BUTTS_AMOUNT = 3
const PLASTICBAGS_AMOUNT = 3
const CANS_AMOUNT = 3
const TRASHBAGS_AMOUNT = 3

const NEEDED_FISH_AMOUNT = 50 // TO DEFINE

/**
 * State machine to manage the experience flow
 */
export default class ExperienceStateMachine {

    private _currentStep: ExperienceStep = ExperienceStep.IDLE

    private _depollutionStatus: DepollutionStatus = {
        bottlesPicked: 0,
        buttsPicked: 0,
        plasticBagsPicked: 0,
        cansPicked: 0,
        trashBagsPicked: 0
    }

    //////////////////
    // -- Global -- //
    //////////////////

    /**
     * Global environment sustainability
     */
    get sustainabilityIndex(): number {
        switch(this._currentStep) {
            case ExperienceStep.DEPOLLUTION:
                return this.depollutionPercentage
            case ExperienceStep.REVEGETATION:
                return 100/3
            case ExperienceStep.FEEDING:
                return (100/3) * 2
            case ExperienceStep.END:
                return 100
            default: 
                return 0
        }
    }

    /**
     * Current experience step
     */
    get currentStep(): number {
        return this._currentStep
    }

    /**
     * Continue to next experience step
     * @returns 0 it has been done, -1 if it's not possible
     */
    nextStep(): number {
        switch(this._currentStep) {
            case ExperienceStep.IDLE:
                this._currentStep = ExperienceStep.DEPOLLUTION
                return 0
            case ExperienceStep.DEPOLLUTION:
                this._currentStep = ExperienceStep.REVEGETATION
                return 0
            case ExperienceStep.REVEGETATION:
                this._currentStep = ExperienceStep.FEEDING
                return 0
            case ExperienceStep.FEEDING:
                this._currentStep = ExperienceStep.END
                return 0
            case ExperienceStep.END:
                // ..
                return -1
        }
    }

    ///////////////////////
    // -- Depollution -- //
    ///////////////////////

    /**
     * Get the depollution percentage based on remaining trash
     */
    private get depollutionPercentage(): number {
        const dc = this._depollutionStatus
        const trashPicked = dc.bottlesPicked + dc.buttsPicked + dc.cansPicked + dc.plasticBagsPicked + dc.trashBagsPicked
        const trashAmount = BOTTLES_AMOUNT + BUTTS_AMOUNT + PLASTICBAGS_AMOUNT + CANS_AMOUNT + TRASHBAGS_AMOUNT
        
        return (trashPicked / trashAmount) * 100
    }

    /**
     * Update the depollution status object & return the new depollutionPercentage
     * @param depollutionCompletion
     * @returns completion percentage
     */
    public updateDepollutionCompletion(dc: DepollutionStatus): number {
        this._depollutionStatus = dc;
        return this.depollutionPercentage
    }

    ///////////////////
    // -- Feeding -- //
    ///////////////////

    /**
     * Return if `fishAmount` is correct according to `NEEDED_FISH_AMOUNT`
     * @param fishAmount 
     */
    isFishAmountValid(fishAmount: number): boolean {
        return fishAmount === NEEDED_FISH_AMOUNT
    }
}