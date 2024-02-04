<script setup lang="ts">
import {useRuleFormItem} from "@/hooks/component/useFormItem.ts";

const props=defineProps({
  modelValue:{
    type:Array,
    default:()=>[]
  },
  options:{
    type:Array,
    default:()=>[]
  }
})
const emits=defineEmits(['update:modelValue'])
const valueCom=computed({
  get(){
    return props.modelValue
  },
  set(val){
    emits('update:modelValue',val)
  }
})
const handleChange=(val)=>{
  if(val===undefined||val===null){
    emits('update:modelValue',[])
  }
  emits('update:modelValue',val)
}
</script>

<template>
  <el-checkbox-group
    v-bind="$attrs"
    v-model="valueCom"
    @change="handleChange"
  >
    <el-checkbox-button v-for="(item,index) in props.options" :key="index" :label="item">{{
        item
      }}</el-checkbox-button>
  </el-checkbox-group>
</template>

<style scoped lang="scss">

</style>
