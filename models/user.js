'use strict';

module.exports.getUserAvatar = function (user) {
	var id = 1;
	var avatar = 'png';
	if (user.id) {
		id = user.id;
	}
	if (user.avatar) {
		avatar = user.avatar;
	}
	return {
		uri: 'http://div.io/uploads/avatar/' + id + '_m.' + avatar
	};
};
