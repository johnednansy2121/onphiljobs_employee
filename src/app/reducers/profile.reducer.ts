import { Action } from '@ngrx/store'
import { IProfile } from '../models/iprofile'
import * as ProfileActions from '../actions/profile.action'

export function reducer(state: IProfile, action: ProfileActions.Actions) {
    switch(action.type) {
        case ProfileActions.SET_PROFILE: 
            state = action.data
            return state
        default: 
            return state
    }
} 