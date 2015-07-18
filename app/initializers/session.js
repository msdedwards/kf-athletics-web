import Ember from 'ember';

// Since I've defined my url in environment.js I can do this
import ENV from '../config/environment';
var ref = new window.Firebase(ENV.firebase);
export default {
  name: 'session',
  after: 'store',
  initialize: function initialize(registry,app) {
      // session object is nested here as we need access to the container to get the store
      var store = registry.lookup('store:main');
      var session = Ember.Object.extend({

          // initial state
          authed: false,

          // get access to the ember data store


          init: function() {

              // on init try to login
              ref.onAuth(function(authData) {
                  // Not authenticated
                  if (!authData) {
                      this.set('authed', false);
                      this.set('authData', null);
                      this.set('login', null);
                      return false;
                  }

                  // Authenticated
                  this.set('authed', true);
                  this.set('authData', authData);
                  this.afterAuthentication(authData.uid);
              }.bind(this));
          },

          // Call this from your Ember templates
          login: function(provider) {
              this._loginWithPopup(provider);
          },

          // Call this from your Ember templates
          logout: function() {
              ref.unauth();
          },

          // Default login method
          _loginWithPopup: function(provider) {
              var _this = this;
              // Ember.debug('logging in with popup');
              ref.authWithOAuthPopup(provider, function(error, authData) {
                  if (error) {
                      if (error.code === "TRANSPORT_UNAVAILABLE") {
                          // fall-back to browser redirects, and pick up the session
                          // automatically when we come back to the origin page
                          _this._loginWithRedirect(provider);
                      }
                  } else if (authData) {
                      // we're good!
                      // this will automatically call the on ref.onAuth method inside init()
                  }
              });
          },

          // Alternative login with redirect (needed for Chrome on iOS)
          _loginWithRedirect: function(provider) {
              ref.authWithOAuthRedirect(provider, function(error, authData) {
                  if (error) {

                  } else if (authData) {
                      // we're good!
                      // this will automatically call the on ref.onAuth method inside init()
                  }
              });
          },

          // Runs after authentication
          // It either sets a new or already exisiting login
          afterAuthentication: function(loginId) {
              var _this = this;

              // See if the login exists using native Firebase because of EmberFire problem with "id already in use"
              ref.child('logins').child(loginId).once('value', function(snapshot) {
                  var exists = (snapshot.val() !== null);
                  loginExistsCallback(loginId, exists);
              });

              // Do the right thing depending on whether the login exists
              function loginExistsCallback(loginId, exists) {
                  if (exists) {
                      _this.existingLogin(loginId);
                  } else {
                      _this.createLogin(loginId);
                  }
              }
          },

          // Existing login
          existingLogin: function(loginId) {
              var _this = this;
              store.find('login', loginId).then(function(login) {
                  _this.set('login', login);
              }.bind(this));
          },

          // Create a new login
          createLogin: function(loginId) {
              var _this = this;

              store.createRecord('login', {
                  id: loginId,
                  provider: this.get('authData.provider'),
                  name: this.get('authData.facebook.displayName') || this.get('authData.google.displayName') || this.get('authData.twitter.displayName'),
                  created: new Date()
              }).save().then(function(login){

                  // Proceed with the newly create login
                  _this.set('login', login);
              });
          },

          // This is the last step in a successful authentication
          // Set the login (either new or existing)
          afterLogin: function(login) {
              this.set('login', login);
          }
      });

      app.register('session:main', session);
      app.inject('route', 'session', 'session:main');
      app.inject('controller', 'session', 'session:main');
  }
};
