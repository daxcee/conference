(function($, Backbone, app) {
	"use strict";
	app.View = app.View || {};

	app.View.Sessions = Backbone.View.extend({
		initialize: function() {
			_.bindAll(this);
			this.lineItem = _.template(this.$("script").text().trim().replace(/\t/g, ""));
			this.toolbar = new app.View.UserPrefs({
				el: this.$el,
				model: app.user
			});
			app.currentViews.push(this.toolbar);
			this.render();
			this.listenTo(this.collection, "reset", this.render);

			this.listenTo(this, "navigate", this.onNavigate);
			this.path = undefined;
		},

		render: function(from) {
			this.$(".sessionContent").empty();
			var data = this.options.dataFunc.call(this.collection, this.item);
			_.each(data, this.addSession);
			this.toolbar.setStates();
		},

		addSession: function(s) {
			s && this.$(".sessionContent").append(this.lineItem({
				s: s,
				userPrefsToolbar: this.toolbar.getHTML(s)
			}));
		},

		onNavigate: function(path) {
			if(!path[2]) {
				return;
			}
			this.$(".viewall").show();
			var me = this;
			this.$(".sessionContent li").hide();
			_.each(this.options.dataFunc.call(this.collection, path[2]), function(val, key) {
				me.$("#item-" + val.id).show();
			});
		}

	});
}(jQuery, Backbone, window.app = window.app || {}));