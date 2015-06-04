chrome.runtime.onInstalled.addListener(function() {
 
    console.log("bookmark search exporter extention Installed.");
 
    var bm_urls = new Array();
 
    function fetch_bookmarks(parentNode) {
        parentNode.forEach(function(bookmark) {
            if(! (bookmark.url === undefined || bookmark.url === null)) {
                bm_urls.push(bookmark.url);
            }
            if (bookmark.children) {
                fetch_bookmarks(bookmark.children);
            }
        });
    }
 
    chrome.bookmarks.getTree(function(rootNode) {
        fetch_bookmarks(rootNode);
        console.log(JSON.stringify(bm_urls));
    });
});
 
 
chrome.bookmarks.onCreated.addListener(function(id, bookmark) {
    console.log("bookmark added .. " +  bookmark.url);
});
 
chrome.bookmarks.onRemoved.addListener(function(id, removeInfo) {
    console.log("bookmark removed .. " +  id);
});
 
chrome.bookmarks.onChanged.addListener(function(id, changeInfo){
    console.log("bookmark changed .. " +  id);
});



var App = React.createClass({
  render: function() {

    var bookmarks = chrome.bookmarks.getTree(function(itemTree){
        itemTree.forEach(function(item){
            return processNode(item);
        });
    });

    function processNode(node) {
        if(node.children) {
            node.children.forEach(function(child) { processNode(child); });
        }

        // print leaf nodes URLs to console
        if(node.url) { console.log(JSON.stringify(node.url)); }
    };

    
    return (
      <div>
        THIS THING: 
        {bookmarks}

      </div>
    )
  }
});
