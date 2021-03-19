<template>
  <div class="pg-item-pagination" @click="enterPagItem" :class="{'show':show}">
      {{number}}
  </div>
</template>

<script>
export default {
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
    }

}
</script>

<style lang="scss" >
    .pg-item-pagination{
        height: 30px;
        min-width: 30px;
        display: flex;
        margin-left: 2px;
        margin-right: 2px;
        justify-content: center;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        align-items: center;
        border-radius: .65rem;
        font-weight: 600;
        cursor: pointer;
        font-size: 1.3rem;
        background-color: #fff;        
        &.show{
          background-color: #17A2B8;
          border-radius: 25%;
          color: #fff;
        }
        &:not(.show):hover{
          color: #17A2B8;
        }
    }

</style>