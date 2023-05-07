const enum Status {
	ok = 200,
	badRequest = 400,
	notFound = 404,
	internalServerError = 500,
}

const enum ErrorName {
	validation = 'ValidationError',
	notFound = 'DocumentNotFoundError',
	cast = 'CastError',
}

// Const enum Resource {
// 	user = 'user',
// 	users = 'users',
// 	cards = 'cards',
// }

const linkValidationRegex =
	/^http(s)?:\/\/(www.)?[\w.~:/?%#\]@!$&'()*+,;=]{1,256}$/i;

export { Status, ErrorName, linkValidationRegex };
