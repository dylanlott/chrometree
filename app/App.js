var React = require('react');


var App = React.createClass({
  
  render: function() {

    var bookmarks;

    chrome.bookmarks.getTree(function(bookmarkTree){
      console.log(JSON.stringify(bookmarkTree))
      bookmarks = JSON.stringify(bookmarkTree);
    })
    console.log(bookmarks)
    return (
        <div>
            Bookmarks- 
            {bookmarks}
        </div>
      )
    }

});

React.render(<App />, document.getElementById('app'))