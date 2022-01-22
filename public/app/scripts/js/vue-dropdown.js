//https://vuejs.org/v2/guide/syntax.html
Vue.component('dropdown-option',{
  props: ['val'],
  template: '<option :value="val"></option>',
})

new Vue({
  el: '#searchBar',
  data: {
    item:[
      {val: 'All'},
      {val: '2010'},
      {val: '2011'},
      {val: '2012'},
      {val: '2013'},
      {val: '2015'},
      {val: '2016'},
      {val: '2017'},
      {val: '2018'},
    ]
  }
})
