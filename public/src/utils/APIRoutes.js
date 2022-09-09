const host = "http://localhost:5000";
const registerRoute = `${host}/api/auth/register`;
const loginRoute = `${host}/api/auth/login`;
const logoutRoute = `${host}/api/auth/logout`;
const allUsersRoute = `${host}/api/auth/allusers`;
const sendMessageRoute = `${host}/api/messages/`;
const receiveMessageRoute = `${host}/api/messages/all`;
const setAvatarRoute = `${host}/api/auth/setavatar`;
export {
	host,
	registerRoute,
	loginRoute,
	logoutRoute,
	allUsersRoute,
	sendMessageRoute,
	receiveMessageRoute,
	setAvatarRoute,
};
