Vue.component('image-holder',{
  props: ['dir','name','ext','year'],
  template: '<a :href="dir + name + ext" :data-lightbox="year"><img :class="year" :src="dir + name + ext"/></a>',
})

//https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function
new Vue({
  el: '#certHolder',
  data: {
    item: [
      {
        year: '2010',
        image:[
          {name: 'image1'}
        ],
      }, 
      {
        year: '2011',
        image:[
          {name: 'image1'},
          {name: 'image2'},
          {name: 'image3'},
          {name: 'image4'},
        ],
      },
      {
        year: '2012',
        image:[
          {name: 'image1'},
          {name: 'image2'},
          {name: 'image3'},
        ],
      },
      {
        year: '2013',
        image:[
          {name: 'image1'},
          {name: 'image2'},
          {name: 'image3'},
          {name: 'image4'},
          {name: 'image5'},
          {name: 'image6'},
          {name: 'image7'},
        ],
      },
      {
        year: '2015',
        image:[
          {name: 'image1'},
        ],
      },
      {
        year: '2016',
        image:[
          {name: 'image1'},
        ],
      },
      {
        year: '2017',
        image:[
          {name: 'image1'},
          {name: 'image2'},
        ],
      },
      {
        year: '2018',
        image:[
          {name: 'image1'},
          {name: 'image2'},
          {name: 'image3'},
          {name: 'image4'},
        ],
      },
    ], //End of item
    ext: '.jpg',
    dir: 'app/images_doc/',
    prefix: 'Y'
  } //End of data
})
