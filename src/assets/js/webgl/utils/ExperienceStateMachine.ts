export enum ExperienceStep {
    DEPOLLUTION,
    VEGETATION,
    FEEDING,
    END
}

export interface ExperienceListener {

}

export interface DepollutionStatus {
    bottlesPicked: number;
    drinksPicked: number;
    toothBrushesPicked: number;
    cansPicked: number;
}

const BOTTLES_AMOUNT = 3
const DRINKS_AMOUNT = 2
const TOOHBRUSHES_AMOUNT = 1
const CANS_AMOUNT = 2

const NEEDED_FISH_AMOUNT = 50 // TO DEFINE

/**
 * State machine to manage the experience flow
 */
export default class ExperienceStateMachine {

    private listener: ExperienceListener = null

    private _currentStep: ExperienceStep = ExperienceStep.DEPOLLUTION

    private _depollutionStatus: DepollutionStatus = {
        bottlesPicked: 0,
        drinksPicked: 0,
        toothBrushesPicked: 0,
        cansPicked: 0,
    }

    //////////////////
    // -- Global -- //
    //////////////////

    get neededCanAmount() {
        return CANS_AMOUNT;
    }

    get neededToothbrushAmount() {
        return TOOHBRUSHES_AMOUNT;
    }

    get neededDrinkAmount() {
        return DRINKS_AMOUNT;
    }

    get neededBottleAmount() {
        return BOTTLES_AMOUNT;
    }

    /**
     * Global environment sustainability
     */
    get sustainabilityIndex(): number {
        switch(this._currentStep) {
            case ExperienceStep.DEPOLLUTION:
                return this.depollutionPercentage
            case ExperienceStep.VEGETATION:
                return 100/3
            case ExperienceStep.FEEDING:
                return (100/3) * 2
            case ExperienceStep.END:
                return 1
            default: 
                return 0
        }
    }

    /**
     * Current experience step
     */
    get currentStep(): ExperienceStep {
        return this._currentStep
    }

    /**
     * Continue to next experience step
     * @returns 0 it has been done, -1 if it's not possible
     */
    nextStep(): boolean {
        switch(this._currentStep) {
            case ExperienceStep.DEPOLLUTION:
                this._currentStep = ExperienceStep.VEGETATION
                return true
            case ExperienceStep.VEGETATION:
                this._currentStep = ExperienceStep.FEEDING
                return true
            case ExperienceStep.FEEDING:
                this._currentStep = ExperienceStep.END
                return true
            case ExperienceStep.END:
                // ..
                return false
        }
    }

    register(listener: ExperienceListener) {
        this.listener = listener;
    }

    ///////////////////////
    // -- Depollution -- //
    ///////////////////////

    /**
     * Get the depollution percentage based on remaining trash
     */
    private get depollutionPercentage(): number {
        const dc = this._depollutionStatus
        const trashPicked = dc.bottlesPicked + dc.drinksPicked + dc.cansPicked + dc.toothBrushesPicked 
        const trashAmount = BOTTLES_AMOUNT + DRINKS_AMOUNT + TOOHBRUSHES_AMOUNT + CANS_AMOUNT
        
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