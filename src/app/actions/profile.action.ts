import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { IProfile } from '../models/iprofile'

export const SET_PROFILE = '[PROFILE] Set'


export class SetProfile implements Action {
    readonly type = SET_PROFILE

    constructor(public data: IProfile)  {

    }
}

export type Actions = SetProfile