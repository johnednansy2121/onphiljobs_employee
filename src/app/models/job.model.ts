export interface JobModel {
    _id: string,
    title: string,
    subtitle: string,
    status: string,
    section: [],
    details: {
      isWorkFromHome: boolean,
        location: {
          address1:  string,
          address2:  string,
          postalCode:  string,
          lat: number,
          long: number,
          city: string,
          state: string,
          country: string,
        }
        salary: {
          base: number,
          upper: number,
          currency: string,
          type: string
        },
    commitment: {
        type: string,
        duration: {
            quantity: number,
            unit: string
            }
        },
        category: string
    },
    premium: {
        isFeatured: boolean
    },
    metadata : {
        createdBy: string,
        client: string,
        organization: {
            name: string,
            roles: [],
            scopes: [],
            _id: string
        },
        dateCreated: string,
        dateUpdated: string,
        publishDate: string,
    },
    private: {
        notes: []
    }
}