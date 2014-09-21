SearchView = Backbone.View.extend({
    initialize: function (options) {
        this.attributes = options;
        this.render();
    },
    render: function () {
        // Compile the template using underscore
        var attr = this.attributes;
        var template = _.template('<label><%= label %></label>' +
            '<input type="text" id="search_input" />' +
            '<input type="button" id="search_button" value="Search" />');
        // Load the compiled HTML into the Backbone "el"
        this.$el.html(template(attr));
    },
    events: {
        "click input[type=button]": "doSearch"
    },
    doSearch: function (event) {
        // Button clicked, you can access the element that was clicked with event.currentTarget
        alert("Search for " + $("#search_input").val());
    },
    testMethod: function () {
        alert("View`s method was triggered. Look at page`s and component code.");
    },
    attributeChanged: function(attributes) {
        this.render();
        alert('Element attribute changed, this updated attributes property of view and executed view`s attributeChanged callback which includes this.render and current alert');
    }
});

document.registerBackbone('backbone-search', SearchView);