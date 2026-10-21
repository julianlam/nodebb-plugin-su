const user = nodebb.require('./src/user');
const helpers = nodebb.require('./src/controllers/helpers');
const authentication = nodebb.require('./src/controllers/authentication');

exports.renderAdminPage = async (req, res) => {
	res.render('admin/plugins/su', {
		title: '[[su:title]]',
	});
};

exports.switchUser = async (req, res) => {
	const targetUid = parseInt(req.body.uid, 10);

	if (!targetUid || targetUid <= 0) {
		return helpers.formatApiResponse(400, res, '[[su:error-invalid-uid]]');
	}

	const isAdmin = await user.isAdministrator(req.uid);
	if (!isAdmin) {
		return helpers.formatApiResponse(403, res, '[[su:error-not-admin]]');
	}

	const exists = await user.exists(targetUid);
	if (!exists) {
		return helpers.formatApiResponse(404, res, '[[su:error-user-not-found]]');
	}

	await authentication.doLogin(req, targetUid);

	helpers.formatApiResponse(200, res, { uid: targetUid });
};
