'use strict';

/*
	This file is located in the "modules" block of plugin.json
	It is only loaded when the user navigates to /admin/plugins/su page
*/

import { get, post } from 'api';
import { error } from 'alerts';
import { translate as tx } from 'translator';

export function init() {
	let selectedUid = null;

	const searchInput = $('#su-search');
	const resultsEl = $('#su-results');
	const switchBtn = $('#su-switch');

	async function doSearch() {
		const query = searchInput.val().trim();
		selectedUid = null;
		switchBtn.prop('disabled', true);

		if (query.length < 2) {
			resultsEl.html('');
			return;
		}

		try {
			const result = await get('/api/users', { query });
			if (!result.users || !result.users.length) {
				resultsEl.html(`<div class="text-muted">${tx('[[su:no-users]]')}</div>`);
				return;
			}

			const u = result.users[0];
			selectedUid = u.uid;

			const avatar = u.picture ?
				`<img src="${u.picture}" class="rounded-circle me-2" width="32" height="32">` :
				'';
			resultsEl.html(
				`<div class="d-flex align-items-center">` +
				`${avatar}` +
				`<div>` +
				`<strong>${u.username}</strong>` +
				`<span class="text-muted ms-2">(uid: ${u.uid})</span>` +
				`</div>` +
				`</div>`
			);

			switchBtn.prop('disabled', false);
		} catch (err) {
			resultsEl.html(`<div class="text-danger">${err.message}</div>`);
		}
	}

	searchInput.on('keyup', utils.debounce(doSearch, 500));

	switchBtn.on('click', async () => {
		if (!selectedUid) {
			return;
		}

		switchBtn.prop('disabled', true).html(`<i class="fa fa-spinner fa-spin"></i> ${tx('[[su:switching]]')}`);

		try {
			await post('/plugins/su/switch', { uid: selectedUid });
			window.location.href = '/';
		} catch (err) {
			error(err.message);
			switchBtn.prop('disabled', false).html(`<i class="fa fa-user-switch"></i> ${tx('[[su:switch-button]]')}`);
		}
	});
}
