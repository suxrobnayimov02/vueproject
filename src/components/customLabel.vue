
<template>
  <div>
    <div
      class="my-input"
      :class="{ 'no-label' : label === '','uppercase-text': uppertext }"
    >
      <label
        v-if="label !== ''"
        class="input-color-label"
      > {{ label }} </label>
      <div class="my-label-content">
        {{ content }}
      </div>
      <div class="right-addon-icon">
        <slot name="right-icon" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        label:{
            type : String,
            default : 'Label'
        },
        uppertext:{
            type : Boolean,
            default  :false
        },
        content  : {
            type : String,
            default : ''
        }
    },
    data(){
        return{
            // inputVal : ''
        }
    },
    methods:{
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
.my-input{
    display: block;
    border-radius: 4px;
    width: 100%;
    background-color: #F7F7F7;
    position: relative;
    padding-bottom: 8px;
    .my-label-content{
        // min-height: 33px;
        padding-bottom: 3px;
        line-height: 1.5;
        padding-left: 15px;
        color: $primary-dark;
    }
    .right-addon-icon{
        position: absolute;
        top : 15px;
        right: 15px;
        vertical-align: middle;
        cursor: pointer;
    }
    label{
        width: 100%;
        padding-left: 16px;
        text-transform: uppercase;
        font-size: 12px;
        line-height: 1;
        color: #111;
    }
    input{
        width: 100%;
        outline: none;
        border: none;
        background-color: #F7F7F7;
        padding-left: 16px;
        border-radius: 12px;
        margin-bottom: 8px;
        &::placeholder{
            color: $input-text-placeholder;
        }
    }
    
}
.no-label{
    padding-top: 16px;
    padding-bottom: 8px;
    .input-color-label{
        display: none;
    }
}
.uppercase-text input{
    text-transform: uppercase;
}
</style>