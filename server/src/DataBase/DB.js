import { v4 as uuidv4 } from 'uuid'

export const DB = {
  contacts: [
    {
      id: uuidv4(),
      firstName: 'Ян',
      lastName: 'Топлес',
      nickName: 'cool',
      favourite: false,
      description: 'bloger',
      email: 'yan@mail.com',
      avatar: 'https://wallpaperaccess.com/full/2771087.jpg',
      phoneNumber: '+7 345 678 91 01'
    },
  ],
}
