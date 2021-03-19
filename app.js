Vue.component('direction-icon', {
  props:{          
    height: {
        required: true,
        default: "#000",
        type: String,
    },
    color: {
        require: true,
        default: "#000000",
        type: String,
    },
    name: {
        default: "left",
        type: String,
    }
  },
  template: '<div>'+
     '<svg style="padding-top:5px;" v-if="name == \'left\'" viewBox="0 0 256 512" class="angle-left" :width="height" :height="height"><path class="angle-left" :fill="color" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg>'+
     '<svg  v-else  style="padding-top:5px;" viewBox="0 0 256 512" class="angle-right" :width="height" :height="height"><path class="angle-right" :fill="color" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg>'+
     '</div>'
   
})

Vue.component('item-pagination-direction', {
  props:{
      direction:{
          default:'left',
          type:[String]
      }
  },
  methods:{
      enterPagItem(e){
          this.pauseEvent(e)
          this.$emit('change')
      },        
      pauseEvent(e){
          if(e.stopPropagation) e.stopPropagation();
          if(e.preventDefault) e.preventDefault();
          e.cancelBubble=true;
          e.returnValue=false;
          return false;
      },
  },
  template: '<div class="pg-item-pagination-direction" @click="enterPagItem">'+
       '<direction-icon :name="direction" height="24" ></direction-icon>'+
      '</div>'
   
})

Vue.component('item-pagination', {
  props:{
      show:{
          default:false,
          required:false,
          type:Boolean
      },
      number:{
          type:[Number,String],
          required:true
      }
  },
  methods:{
      enterPagItem(){
          this.$emit('change',this.number)
      }
  },
  template: '<div class="pg-item-pagination" @click="enterPagItem" :class="{\'show\':show}">'+
              '{{number}}'+
          '</div>'
   
})

Vue.component('pagination', {
  props:{
      offset:{
          default:0,
          type:[Number,String]
      },
      limit:{
          default:25,
          type:[Number,String],
          required:true
      },
      datalen:{
          default:0,
          type:[Number,String],
          required:true
      },
      wishlength:{
          default:7,
          type:[Number,String],
          required:false
      },
      color:{
          default:"#f0f0f0",
          type:[String],
          required:false
      }
      
  },
  data(){
      return{
          pags:[{value:1,show:true}],
          totalPage:1,
          currentPage:1,
          //eğer invalid değerler çıktığında cleanlist istenen sayıda eleman alamazsa seçili öğeden kaç çıkarılaarak eleman alınacağını belirtir.
          negativeDiff: 0
      }
  },
  computed:{
      cssVariables(){
          return{
              "--pagination-width":(30 * (this.totalPage > this.wishlength-1 ? this.wishlength : this.totalPage)) + "px", 
              "--container-width":((30 * ((this.totalPage > this.wishlength-1 ? this.wishlength : this.totalPage) + 2)) + (this.totalPage * 2) + 10) + "px",
              "--selected-color":this.color 
          }
      },
      currectOffset(){
          return (this.currentPage - 1) * this.limit
        }
  },
  created(){
      this.createPags()
  },
  methods:{
      createPags(){
        console.log(this.wishlength)
          //liste uzunluğu en fazla 7 olacak şekilde
          this.totalPage = Math.ceil(this.datalen / this.limit) 
          this.pags = []
          let cleanList = []
          //temel bir liste ile başlıyoruz
          let lists = []
          for (let i = 0; i < this.wishlength; i++) {
              lists.push(i+1)                
          }
          //eğer seçili eleman üstteki listenin sağ yarısına geçmişse veya yoksa yeni bir liste oluşturuyoruz
          if(this.currentPage > Math.ceil(this.wishlength / 2) && this.totalPage > this.wishlength){
              lists = [1]
              for (let i = 0; i < this.wishlength - 2 ; i++) {
                  if(i % 2){
                      lists.push(this.currentPage + (this.negativeDiff))
                  }else{                        
                      lists.push(this.currentPage - (this.negativeDiff))
                      this.negativeDiff += 1
                  }
              }
              this.negativeDiff = 0
          }
          //invalid değerleri ayıklıyoruz
          lists.map((item)=>{
              if(item < this.totalPage){
                  cleanList.push(item)
              }               
          })
          //liste uzunluğu this.wishlength'nin altındaysa geçerli elemanlar ekliyoruz
          if(this.totalPage > this.wishlength && cleanList.length < this.wishlength){
              let diff = (this.wishlength -1) - cleanList.length
              for (let i = 1; i < diff+1; i++) {
                  let pushData = this.currentPage - (this.negativeDiff + i)
                  //eğer eklenecek değer listede yoksa ekle
                  if(!cleanList.includes(pushData)){
                      cleanList.push(pushData)  
                  }                  
              }
          }
          if((this.totalPage > this.wishlength && this.currentPage > Math.ceil(this.wishlength / 2)) || (this.totalPage < this.wishlength)){
            cleanList.push(this.totalPage)
          }

          cleanList.sort(function(a, b){return a-b})

          for (let i = 0; i < cleanList.length; i++) {
              this.pags.push({
                  value:cleanList[i],
                  show: this.currentPage == (cleanList[i]) 
              })
          }
      },
      pauseEvent(e){
          if(e.stopPropagation) e.stopPropagation();
          if(e.preventDefault) e.preventDefault();
          return false;
      },
      enterPagItem(value){
          this.pauseEvent(value)
          this.currentPage = value
          this.$emit('offset',this.currectOffset)
          this.createPags()
      },
      rightDirection(){
          this.currentPage = this.currentPage == this.totalPage ? this.totalPage : this.currentPage + 1
          this.$emit('offset',this.currectOffset)
          this.createPags()
      },
      leftDirection(){
          this.currentPage = this.currentPage == 1 ? 1 : this.currentPage - 1
          this.$emit('offset',this.currectOffset)
          this.createPags()
      }
  },
  watch:{
      limit:"createPags",
      offset:"createPags",
      datalen:"createPags"
  },
  template: '<div class="pg-pagination-container" :style="cssVariables">'+
              '<item-pagination-direction  @change="leftDirection" :direction="\'left\'"></item-pagination-direction>'+
              '<item-pagination class="pg-pagination-content" @change="enterPagItem" :show="pag.show" :number="pag.value" v-for="(pag,key) in pags" :key="key"></item-pagination>'+
              '<item-pagination-direction  @change="rightDirection"  :direction="\'right\'"></item-pagination-direction>'+
            '</div>'
   
})




var app = new Vue({
    el: '#app',
    data() {
      return{
        totalItems:100,
        limit:25,
        wishlength:7,
        selectLimit:25,
        offsetResults:[...Array(6).keys()],
        limits:[25,50,75,100,250],
        wishlengths:[7,3,5,10,25,50],
        wishColors:["#17A2B8","#feda75","#fa7e1e","#d62976","	#962fbf","#4f5bd5"],
        changeKey:0
      }      
    },
    methods:{
        changeOffset(e,event){
            this.offsetResults[e] = event
            this.changeKey +=1
        }
    }
  })