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

const enum RequestKind {
	query,
	mutation,
}

const enum QueryKind {
	all,
	filter,
}

const enum MutationKind {
	create,
	delete,
	update,
}

const enum Resource {
	user,
	card,
	users,
	cards,
}

const linkValidationRegex =
	/^http(s)?:\/\/(www.)?[\w.~:/?%#\]@!$&'()*+,;=]{1,256}$/i;

const mongooseLinkValidator = (link: string) => linkValidationRegex.test(link);

export {
	Status,
	ErrorName,
	RequestKind,
	QueryKind,
	MutationKind,
	Resource,
	linkValidationRegex,
	mongooseLinkValidator,
};
