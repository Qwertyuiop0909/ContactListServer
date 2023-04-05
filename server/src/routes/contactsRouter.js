import express from 'express'
import { createContact, deleteContactById, favouriteContactHandler, getAllContacts, getContactById, updateContact } from '../controllers/contactsController.js'

export const contactsRouter = express.Router()

contactsRouter.route('/')
	// Получить все контакты (возможна фильтрация)
	.get(getAllContacts)
	// Добавление новго контакта
	.post(createContact)

contactsRouter.route('/:id/')
	// Получение конкретного контакта
	.get(getContactById)
	// Удалить контакт
	.delete(deleteContactById)
	// Изменить контакт
	.put(updateContact)
	// Изменить контакт
	.patch(favouriteContactHandler)



