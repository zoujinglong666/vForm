<script setup lang="ts">
import {useRuleFormItem} from "@/hooks/component/useFormItem.ts";

const props=defineProps({
  modelValue:{
    type:[Number,String],
    default: null
  },

})
const emits=defineEmits(['input'])
const emitData = ref('');
// Embedded in the form, just use the hook binding to perform form verification
const [state] = useRuleFormItem(props, 'modelValue', 'input', emitData);
const handleChange=(val)=>{
  if(val===undefined||val===null){
    emits('input','')
  }
  emits('input',val)
}
</script>

<template>
  <el-input-number style="width: 100%" v-model="state" :min="-Infinity" :max="Infinity" @change="handleChange" />
</template>

<style scoped lang="scss">

</style>
