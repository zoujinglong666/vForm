<script setup lang="ts">
import {useRuleFormItem} from "@/hooks/component/useFormItem.ts";

const props=defineProps({
  modelValue:{
    type:Date
  }
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
  <el-date-picker
    :title="state"
    v-bind="$attrs"
    clearable
    editable
    v-model="state"
    @change="handleChange"
    type="datetime"
  />
</template>

<style scoped lang="scss">

</style>
