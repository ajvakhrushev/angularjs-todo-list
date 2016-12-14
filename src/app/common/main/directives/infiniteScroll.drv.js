(function () {
  'use strict';

  angular
    .module('test.common')
    .directive('testCommonInfiniteScroll', Directive);

  function Directive() {

    return {
      restrict: 'A',
      scope: {
        callback: '&testCommonInfiniteScrollCallback'
      },
      link: function (
        $scope,
        $element
      ) {

        var isLoading = false;

        $element.on('scroll', function() {

          if(!isLoading && this.scrollHeight - this.scrollTop <= this.offsetHeight) {
            isLoading = true;

            $scope.callback().finally(function() {
              isLoading = false;
            });
          }

        });

        $element.on('$destroy', function() {
          $scope.$destroy();
        });
      }
    };
  }
})();
