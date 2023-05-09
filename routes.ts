import { Router } from 'express';
import {
	createCardController as createCard,
	deleteCardController as deleteCard,
	unlikeCardController,
	getCardsController as getCards,
	likeCardController as likeCard,
} from './controllers/cards-controller';
import {
	getUsersController as getUsers,
	getUserController as getUser,
	createUserController as createUser,
	updateProfileController as updateProfile,
	updateAvatarController as updateAvatar,
} from './controllers/users-controllers';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);
router.post('/users', createUser);

router.get('/cards', getCards);
router.put('/cards/:cardId/likes', likeCard);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);
router.delete('/cards/:cardId/likes', unlikeCardController);

export default router;
