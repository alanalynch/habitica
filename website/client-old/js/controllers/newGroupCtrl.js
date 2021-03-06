"use strict";

/*
 A controller to manage the New Group page
 */

angular.module('habitrpg')
  .controller("NewGroupCtrl", ['$scope', '$window', 'Groups', 'Payments',
    function ($scope, $window, Groups, Payments) {
      $scope.PAGES = {
        CREATE_GROUP: 'create-group',
        UPGRADE_GROUP: 'upgrade-group',
      };
      $scope.activePage = $scope.PAGES.CREATE_GROUP;
      $scope.changePage = function (page) {
        $scope.activePage = page;
        $window.scrollTo(0, 0);
      };

      $scope.newGroup = {
        type: 'guild',
        privacy: 'private',
      };
      $scope.PAYMENTS = {
        AMAZON: 'amazon',
        STRIPE: 'stripe',
      };

      $scope.newGroupIsReady = function () {
        return !!$scope.newGroup.name;
      };

      $scope.createGroup = function () {
        $scope.changePage($scope.PAGES.UPGRADE_GROUP);
      };

      $scope.upgradeGroup = function (paymentType) {
        var subscriptionKey = 'group_monthly'; // @TODO: Get from content API?
        if (paymentType === $scope.PAYMENTS.STRIPE) Payments.showStripe({
          subscription: subscriptionKey,
          coupon: null,
          groupToCreate: $scope.newGroup
        });
        if (paymentType === $scope.PAYMENTS.AMAZON) Payments.amazonPayments.init({
          type: 'subscription',
          subscription: subscriptionKey,
          coupon: null,
          groupToCreate: $scope.newGroup
        });
      };
    }]);


