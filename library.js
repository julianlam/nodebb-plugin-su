import * as controllers from './lib/controllers.js';

const routeHelpers = nodebb.require('./src/routes/helpers');

export async function init(params) {
	const { router } = params;

	routeHelpers.setupAdminPageRoute(router, '/admin/plugins/su', controllers.renderAdminPage);
};

export async function addRoutes({ router, middleware }) {
	const middlewares = [
		middleware.ensureLoggedIn,
		middleware.admin.checkPrivileges,
	];

	routeHelpers.setupApiRoute(router, 'post', '/su/switch', middlewares, controllers.switchUser);
};

export function addAdminNavigation(header) {
	header.plugins.push({
		route: '/plugins/su',
		icon: 'fa-user-switch',
		name: '[[su:title]]',
	});

	return header;
};
