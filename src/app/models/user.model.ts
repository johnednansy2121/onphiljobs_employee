export interface UserModel {
    _id: string
    email: string,
    userName: string,
    password: string,
    isVerified: boolean,
    metadata : {
        verificationToken: string,
        hasProfile: boolean,
        dateCreated: Date,
        dateUpdated: Date,
    }
}
