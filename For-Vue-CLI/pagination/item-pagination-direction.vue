<template>
  <div class="pg-item-pagination-direction" @click="enterPagItem" >
      <vs-icon :icon="'chevron_'+direction" size="medium"></vs-icon>
  </div>
</template>

<script>
export default {
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
    }

}
</script>
