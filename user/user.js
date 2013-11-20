(function () {

	"use strict";

	// Get the Application's module:
	var app = angular.module('ZendCon');


	/**
	 * Directive: zcUserProfile
	 *
	 * Usage: Element
	 * Example: <zc-user-profile></zc-user-profile>
	 */
	app.directive('zcUserProfile', function ($rootScope)
	{
		return {
			// Declare it as a new HTML tag (Element):
			restrict    : 'E',
			// Template URL for the contents:
			templateUrl : 'user/user-profile.html',

			scope : true,

			link : function (scope)
			{
				// Init user object and reset the changes.
				scope.reset = function ()
				{
					// -- MAGIC HAPPENS HERE --
					scope.user = angular.copy($rootScope.user);
				};

				scope.reset();

				// Commit the changes of the form.
				scope.submit = function ()
				{
					// -- MORE MAGIC HAPPENS HERE --
					$rootScope.user.name = scope.user.name;
				};

				// Is there any changes in the form?
				scope.isUnchanged = function ()
				{
					return angular.equals(scope.user, $rootScope.user);
				};
			}
		};
	});

})();