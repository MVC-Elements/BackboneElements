SearchView = Backbone.View.extend({
    initialize: function(options){
        this.attributes = options;
        this.render();
    },
    render: function(){
        // Compile the template using underscore
        var self = this;
        var template = _.template( '<label><%= label %></label>' +
            '<input type="text" id="search_input" />' +
            '<input type="button" id="search_button" value="Search" />', self.attributes );
        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
    },
    events: {
        "click input[type=button]": "doSearch"
    },
    doSearch: function( event ){
        // Button clicked, you can access the element that was clicked with event.currentTarget
        alert( "Search for " + $("#search_input").val() );
    }
});

document.registerBackbone('backbone-search', SearchView);