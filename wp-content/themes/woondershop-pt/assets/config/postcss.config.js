// https://github.com/postcss/postcss-cli#config

'use strict';

module.exports = {
	map: false,
	plugins: {
		'cssnano': {
			discardComments: {
				removeAll: true
			},
			zindex: false, // added because the .admin-bar was going over the overlaid WoonderShop elements (.woondershop-overlay)
		}
	}
};
