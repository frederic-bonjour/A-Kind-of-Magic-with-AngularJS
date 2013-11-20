(function () {

	"use strict";

	var app = angular.module('ZendCon');


	/**
	 * Controller: zcMessageController
	 *
	 * Gets the messages from the MessageService and give them to the template, via the $scope object.
	 */
	app.controller('zcMessageController', function ($scope, zcMessageService)
	{
		// Get messages from the Messages Service:
		// messages are loaded asynchronously but Angular will notice the changes
		// and update the view automagically.
		$scope.messages = zcMessageService.getMessages();

		$scope.filter = 'date';
		$scope.reverse = true;

		// Message selection
		$scope.selectedMessage = null;

		$scope.select = function (message)
		{
			$scope.selectedMessage = message;
		};
	});


	/**
	 * Service: MessageService
	 *
	 * Loads the messages from the server.
	 */
	app.service('zcMessageService', function ($http)
	{
		var messages = [];

		function loadMessages ()
		{
			$http.get('api/messages.json')
				.success(function (results)
				{
					angular.forEach(results, function (m) {
						messages.push(m);
					});
				}
			);
		}

		// Public API of the service:

		return {

			getMessages : function ()
			{
				if (messages.length === 0) {
					loadMessages();
				}
				return messages;
			}

		};
	});


	/**
	 * Directive: zc-message
	 *
	 * Usage: CSS class
	 * Parameters: message
	 * Example: <div class="zc-message" message="msg"></div>
	 */
	app.directive('zcMessage', function ()
	{
		return {
			restrict : 'C',
			templateUrl : 'messages/message.html',
			scope : {
				message : '=' // 2-ways data-binding
			},

			link : function (scope)
			{
				scope.$watch('message', function (message) {
					if (message) {
						message.status = 'read';
					}
				});

				// Message related user actions:
				// these methods are used in the Directive's template (messages/message.html)

				scope.markAsRead = function ()
				{
					scope.message.status = 'read';
				};

				scope.markAsUnread = function ()
				{
					scope.message.status = 'unread';
				};

				scope.isRead = function ()
				{
					// Need to check if 'message' exists because this method may be called
					// even if no message is selected.
					return scope.message && scope.message.status === 'read';
				};
			}
		};
	});

})();

