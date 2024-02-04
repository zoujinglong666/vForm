<script setup lang="ts">
import {computed,ref} from "vue";
import {useRuleFormItem} from "@/hooks/component/useFormItem.ts";

interface DataInputPropsType {
  title?: string;
  modelValue?: string | number;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  autofocus?: boolean;
  type?:'text'|'textarea'

}

const props = withDefaults ( defineProps<DataInputPropsType> (), {
  title: "",
  modelValue: '',
  placeholder:"请输入",
  disabled:false,
  readonly:false,
  autofocus:false,
  type:"text"

} );
const emits = defineEmits ( ['update:modelValue', 'change', 'input','blur','clear'] )
const valueCom = computed ( {
  get() {
    return props.modelValue
  },
  set(val) {
    if(val===null||val==undefined){
      emits ( 'update:modelValue', '' )
    }
    emits ( 'update:modelValue', val )
  }
} )
const emitData = ref('');
// Embedded in the form, just use the hook binding to perform form verification
const [state] = useRuleFormItem(props, 'modelValue', 'input', emitData);
const handleChange=(val)=>{
  if(val===undefined||val===null){
    emits('input','')
  }
  emits('input',val)
}
const handleBlur=(val)=>{
  if(val===undefined||val===null){
    emits('blur','')
  }
  emits('blur',val)
}
const handleClear=()=>{
  emits('clear',)
}
</script>

<template>
  <el-input @clear="handleClear" :title="state" v-bind="$attrs" v-model="state" :placeholder="props.placeholder" clearable :type="props.type"
            @input="handleChange" @blur="handleBlur">
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope || {}"/>
    </template>
  </el-input>
</template>

<style scoped lang="scss">

</style>
