import { Router } from 'express';
import {
	createCard,
	deleteCard,
	getCards,
	likeCard,
} from './controllers/cards-controller';
import {
	getUsers,
	getUser,
	createUser,
	updateProfile,
	updateAvatar,
} from './controllers/users-controllers';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);
router.post('/users', createUser);

router.get('/cards', getCards);
router.put('/cards/:cardId/likes', likeCard);
router.post('/cards', createCard);
router.delete('/cards/:id', deleteCard);
router.delete('/cards/:id/likes', deleteCard);

export default router;
