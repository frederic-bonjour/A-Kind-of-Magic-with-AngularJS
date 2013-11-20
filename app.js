(function () {

	"use strict";

	//
	// Registration of the Main module of the application:
	//

	var app = angular.module(
		'ZendCon',                                   // Module name (see ng-app)
		['ng', 'ngRoute', 'ngAnimate', 'ngSanitize'] // Dependencies (modules)
	);


	//
	// Routes definition (navigation into the single-page app)
	//

	app.config(function ($routeProvider) {
		$routeProvider
			. when('/home'    , { templateUrl : 'home/home-view.html' })
			. when('/profile' , { templateUrl : 'user/user-view.html' })
			. when('/messages', { templateUrl : 'messages/messages-view.html' })
			. otherwise({ redirectTo: '/home'})
		;
	});


	//
	// User initialisation
	//

	app.run(function ($rootScope) {
		$rootScope.user = {
			avatarUrl : 'img/logo-change@2x.png',
			name : 'Fred'
		};
	});


	//
	// Directives
	//

	/**
	 * Directive: zc-breadcrumb
	 *
	 * Usage: element
	 * Example: <zc-breadcrumb></zc-breadcrumb>
	 */
	app.directive('zcBreadcrumb', function ($rootScope, $location)
	{
		return {
			restrict : 'E',
			scope : true,
			template :
				'<ul class="breadcrumb">' +
					'<li><a href="#/home">Home</a></li>' +
					'<li ng-if="place != null" class="active">{{ place }}</li>' +
				'</ul>',

			link : function (scope)
			{
				$rootScope.$on('$routeChangeSuccess', function ()
				{
					switch ($location.path()) {
						case '/profile':
							scope.place = "User profile";
							break;
						case '/messages':
							scope.place = "Messages";
							break;
						default :
							scope.place = null;
					}
				});
			}
		};
	});


	/**
	 * Directive: zc-active-route
	 *
	 * Usage: attribute on <a/> elements.
	 * Example: <li><a zc-active-route="li" href="...">...</a></li>
	 */
	app.directive('zcActiveRoute', function ($rootScope, $location)
	{
		return {
			restrict : 'A',

			link : function (scope, iElement, iAttrs)
			{
				// Get parent element on which the 'active' class should be set
				var parentEl = iElement.closest(iAttrs.zcActiveRoute || 'li');

				// React to every route change and add/remove 'active' on parent element
				$rootScope.$on('$routeChangeSuccess', function ()
				{
					var method = iAttrs.href === ('#' + $location.path()) ? 'addClass' : 'removeClass';
					parentEl[method]('active');
				});
			}
		};
	});


})();