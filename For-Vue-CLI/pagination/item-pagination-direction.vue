<template>
  <div class="pg-item-pagination-direction" @click="enterPagItem" >
      <svg style="padding-top:5px;" v-if="direction == 'left'" viewBox="0 0 256 512" class="angle-left" :width="height" :height="height"><path class="angle-left" :fill="color" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg>
      <svg  v-else  style="padding-top:5px;" viewBox="0 0 256 512" class="angle-right" :width="height" :height="height"><path class="angle-right" :fill="color" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg>
     
  </div>
</template>

<script>
export default {
    data(){
        return{
            height:"24",
            color:"#000"
        }
    },
    props:{
        direction:{
            default:'left',
            type:[String]
        },
        
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
    }

}
</script>
