export interface IProfile {
    _id : string
    firstName: string
    lastName: string
    displayPicture: string
    premium: {
        hasProSubscription: boolean
        subscription: {
            _id: string
            planId: string
            nextInterval: Date
            isCancelled: boolean
        }
    }
}