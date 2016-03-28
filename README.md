# angular-treeview

My own attempt at the treeview directive for angular 1.x

The "project" includes one file (treeview.js) found in the root of the repo. Referencing this script file from your angular app page is all the setup you need. Adding the treeview.css file from the example folder or a css file of your own is recomended.

To work with the treeview, simply add a <tree-view> element and bind its "nodes" property to an array of nodes in your scope.

    <tree-view nodes="treeNodes" ></tree-view>
    
    $scope.treeNodes = ['Client Side', 'Server Side', 'Data Bases'];

The treeview has a default node template that would work with an array of native values but you could easily extend it by binding the "node-template" property. This extension pattern allows the treeview to work with any kind of object items you may need.

    <tree-view nodes="treeNodes" node-template="treeNodeTemplate"></tree-view>
    
    $scope.treeNodeTemplate = '<div>{{node.name}}</div>';
    $scope.treeNodes = [{name: 'Client Side'}, {name: 'Server Side'}, {name: 'Data Bases'}];

Currently the only event implemented "node-selected" which could be binded to a custom handler in your scope. By default, when a node is clicked it will be selected but if a custom handler returns 'false' the default behavior is aborted.

    <tree-view nodes="treeNodes" node-template="treeNodeTemplate" node-selected="treeNodeSelected(event, node)"></tree-view>
    
    $scope.treeNodeSelected = function (event, node) { return true; }

To add another layer of sub items to the tree simply populate the "children" property of a node. This could be performed at run time and recursively if needed.

To expand a node and view sub items just double click it. 

Please view the "example" folder for a live demo.


Hope somone finds this usefull and any suggestions for improvments are more than welcome. 
