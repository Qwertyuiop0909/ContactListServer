import { DB } from "../DataBase/DB.js"
import { contactCreateSchema, contactUpdateSchema } from "../validators/contactsValidator.js"
import {v4 as uuidv4} from 'uuid'


export const getAllContacts = (req, res) => {
	try {
		res.json(DB.contacts)
	} catch (error) {
		res.sendStatus(500)
	}
}

export const createContact = async (req, res) => {
	try {
		const newContactFromReq = req.body

		// const isValidData = await contactSchema.isValid(newContactFromReq)

		await contactCreateSchema.validate(newContactFromReq, { abortEarly: false })

		const newContactBack = {
			id: uuidv4(),
			...newContactFromReq,
			favourite: false,
			nickName: '',
      description: '',
      avatar: "https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png",
      phoneNumber: '',
		}

		try {
			DB.contacts.unshift(newContactBack)

			return res.status(201).json(newContactBack)
		} catch (error) {
			return res.sendStatus(500)
		}
	} catch (e) {
    console.log({e})
		const preparedErrors = e.inner.reduce((acc, el) => {
			acc[el.path] = el.errors.join(', ')

			return acc
		}, {})
		return res.status(400).json(preparedErrors)
	}
}

export const getContactById = (req, res) => {
  try {
    const { id } = req.params

    const currentContact = DB.contacts.find((contact) => contact.id === id)

    if (currentContact) {
      return res.json(currentContact)
    }

    return res.sendStatus(400)
  } catch (error) {
    return res.sendStatus(500)
  }
}

export const deleteContactById = (req, res) => {
  try {
    const { id } = req.params

    const indexOfCurrentContact = DB.contacts.findIndex((contact) => contact.id === id)

    if (indexOfCurrentContact === -1) {
      return res.sendStatus(204)
    }

    DB.contacts.splice(indexOfCurrentContact, 1)

    return res.sendStatus(200)
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

export const updateContact = async (req, res) => {
  try {
    const { id } = req.params
    const contactFromReq = req.body

    const indexOfCurrentContact = DB.contacts.findIndex((contact) => contact.id === id)

    if (indexOfCurrentContact === -1) return res.sendStatus(400)

    await contactUpdateSchema.validate(contactFromReq, { abortEarly: false })

    try {
      const newContactBack = {
        id,
        ...DB.contacts[indexOfCurrentContact],
        ...contactFromReq,
      }
      DB.contacts.splice(indexOfCurrentContact, 1, newContactBack)

      return res.status(200).json(newContactBack)
    } catch (error) {
      return res.sendStatus(500)
    }
  } catch (e) {
    
    const preparedErrors = e.inner.reduce((acc, el) => {
      acc[el.path] = el.errors.join(', ')

      return acc
    }, {})
    return res.status(400).json(preparedErrors)
  }
}

export const favouriteContactHandler = async (req, res) => {
  try {
    const { id } = req.params

    const indexOfCurrentContact = DB.contacts.findIndex((contact) => contact.id === id)

    if (indexOfCurrentContact === -1) return res.sendStatus(400)

    DB.contacts[indexOfCurrentContact].favourite = !(DB.contacts[indexOfCurrentContact].favourite
      || false)

    return res.sendStatus(200)
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      msg: 'Some wrong with server',
      error: 'asdfasdf',
    })
  }
}