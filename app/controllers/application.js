import Ember from 'ember';

export default Ember.Controller.extend({
  actions:{
        login:function(provider){
            this.get('session').login(provider);
            this.transitionTo('home');
        },
        logout: function() {
            this.get('session').logout();
            this.transitionTo('index');
        }
    }
});
