<template>
  <div class="pg-pagination-container" v-if="pags.length > 1" :style="cssVariables">
      <item-pagination-direction  @change="leftDirection" :direction="'left'"></item-pagination-direction>
      <item-pagination class="pg-pagination-content" @change="enterPagItem" :show="pag.show" :number="pag.value" v-for="(pag,key) in pags" :key="key"></item-pagination>
      <item-pagination-direction  @change="rightDirection"  :direction="'right'"></item-pagination-direction>
  </div>
</template>

<script>
import ItemPagination from "./item-pagination"
import ItemPaginationDirection from './item-pagination-direction.vue'
export default {
    components:{
        ItemPagination,
        ItemPaginationDirection
    },
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
        dataLen:{
            default:0,
            type:[Number,String],
            required:true
        },
        wishLength:{
            default:7,
            type:[Number,String],
            required:false
        },
        
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
                "--pagination-width":(30 * (this.totalPage > this.wishLength-1 ? this.wishLength : this.totalPage)) + "px", 
                "--container-width":((30 * ((this.totalPage > this.wishLength-1 ? this.wishLength : this.totalPage) + 2)) + (this.totalPage * 2) + 10) + "px" 
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
            //liste uzunluğu en fazla 7 olacak şekilde
            this.totalPage = Math.ceil(this.dataLen / this.limit) 
            this.pags = []
            let cleanList = []
            //temel bir liste ile başlıyoruz
            let lists = []
            for (let i = 0; i < this.wishLength; i++) {
                lists.push(i+1)                
            }
            //eğer seçili eleman üstteki listenin sağ yarısına geçmişse veya yoksa yeni bir liste oluşturuyoruz
            if(this.currentPage > Math.ceil(this.wishLength / 2) && this.totalPage > this.wishLength){
                lists = [1]
                for (let i = 0; i < this.wishLength - 2 ; i++) {
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
            //liste uzunluğu this.wishLength'nin altındaysa geçerli elemanlar ekliyoruz
            if(this.totalPage > this.wishLength && cleanList.length < this.wishLength){
                let diff = (this.wishLength -1) - cleanList.length
                for (let i = 1; i < diff+1; i++) {
                    let pushData = this.currentPage - (this.negativeDiff + i)
                    //eğer eklenecek değer listede yoksa ekle
                    if(!cleanList.includes(pushData)){
                        cleanList.push(pushData)  
                    }                  
                }
            }
            if((this.totalPage > this.wishLength && this.currentPage > Math.ceil(this.wishLength / 2)) || (this.totalPage < this.wishLength)){
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
        dataLen:"createPags"
    }
}
</script>
