angular.module('app.treeView', [])

.directive('treeView', function ()
{
    return {
        replace: true,
        restrict: 'E',
        scope: { nodes: '=', nodeTemplate: '=', nodeSelected: '&' },
        template: ''
            + '<div class="tree-view">'
                + '<tree-view-node ng-repeat="node in nodes" node="node"></tree-view-node>'
            + '</div>',
        link: function (scope, element, attrs, controller)
        {
            if (!scope.nodeTemplate)
                scope.nodeTemplate = '<div><span>{{node}}</span></div>';
        },
        controller: function ($scope)
        {
            this.selectedNode = null;
            this.externalScope = $scope.$parent;

            this.nodeClicked = function (event, node)
            {
                if (!node) return;
                
                if (angular.isFunction($scope.nodeSelected))
                    if ($scope.nodeSelected({ event: event, node: node }) == false)
                        return;

                if (node.selected) return;
                if (this.selectedNode) this.selectedNode.selected = false;

                node.selected = true;
                this.selectedNode = node;
            }
            this.nodeDoubleClicked = function (event, node)
            {
                if (!node) return;

                node.open = !node.open;
            }

            this.getNodeTemplate = function ()
            {
                return $scope.nodeTemplate;
            }
            this.getNodeChildrenTemplate = function (node)
            {
                return node && node.children ? '<tree-view-node ng-if="node.open" node="child" ng-repeat="child in node.children"></tree-view-node>' : ''
            };
        }
    };
})
.directive('treeViewNode', ['$compile', function ($compile)
{
    return {
        replace: true,
        restrict: 'E',
        require: "^treeView",
        scope: { node: '=node' },
        template: ''
            + '<div class="tree-view-node" ng-class="{selected: node.selected}">'
                + '<div class="tree-view-node-title" ng-click="tree.nodeClicked($event, node)" ng-dblclick="tree.nodeDoubleClicked($event, node)" compile-content="tree.getNodeTemplate()"></div>'
                + '<div class="tree-view-node-children" compile-content="tree.getNodeChildrenTemplate(node)"></div>'
            + '</div>',
        link: function (scope, element, attrs, controller)
        {
            scope.tree = controller;
        },
    };
}])
.directive('compileContent', ['$compile', function ($compile)
{
    return function (scope, element, attrs)
    {
        scope.$watch(attrs.compileContent, function (value) { element.html(value); $compile(element.contents())(scope); });
    };
}]);
