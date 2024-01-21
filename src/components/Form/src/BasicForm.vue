<script lang="ts" setup>
import type { Ref } from "vue";
import type {FormActionType, FormProps, FormSchema} from "./type/index.ts";
import { useFormEvents } from "./hooks/useFormEvents";
import {Nullable, Recordable} from "@/hooks/vben/types";
import {responsiveMap,labelWidthMap} from "@/components/Form/src/constant";

const attrs = useAttrs();
const emit = defineEmits(["register"]);
const props = defineProps();
const propsRef = ref<Partial<FormProps>>({});
const formRef = ref<Nullable<FormActionType>>(null);
const defaultValueRef = ref ({})
const schemaRef = ref<FormSchema[] | null> (null)
const getBindValue = computed<Recordable>(() => ({
  ...attrs,
  ...props,
  ...propsRef.value,
}));

const getSchema = computed(() => {
  const { schemas } = unref(propsRef);
  return schemas || [];
});

const { validate, resetFields, clearValidate, scrollToField, validateField,getAllFields,getFieldsValue } =
  useFormEvents({
    emit,
    getSchema,
    propsRef:propsRef,
    schemaRef:schemaRef,
    defaultValueRef:defaultValueRef,
    formElRef: formRef as Ref<FormActionType>,
  });

function setFormModel(key: string, value: any) {
  if (propsRef.value.model) {
    console.log ("set",key,value)
    propsRef.value.model[key] = value;
  }
}
const labelWidthCalc = computed ( () => {
  if(props.labelWidth) return props.labelWidth
  return labelWidthMap?.[currentBreakpoint.value]
} )

const labelPositionCalc = computed ( () => {
  if(currentBreakpoint.value==='xs') return 'top'
return 'right'
} )
function setProps(formProps: Partial<FormProps>) {
  propsRef.value = { ...propsRef.value, ...formProps };
}

watch(
  () => propsRef.model,
  () => {
    const { model } = unref(propsRef);
    if (!model) return;
    console.log (model,model)
  },
  {
    immediate: true,
  },
);

const formAction: Partial<FormActionType> = {
  setProps,
  validate,
  resetFields,
  clearValidate,
  scrollToField,
  validateField,
  getAllFields,
  getFieldsValue
};

// 暴露给外面的组件实例使用
defineExpose(formAction);

onMounted(() => {
  emit("register", formAction);
});

const cols = {xs: 24, sm: 12, md: 12, lg: 8, xl: 6, xxl: 6}
// const allSlotsName = computed(() => Object.keys(toRaw(slots)))
const colArr = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];



// 用来保存当前页面尺寸处于哪个尺寸区间
const screens = reactive ( {
  xs: true,
  sm: true,
  md: true,
  lg: true,
  xl: true,
  xxl: true,
} )
const currentBreakpoint = ref ( '' )
// 计算当前页面尺寸下一行中可以有几个元素
const resultCol = computed ( () => {
  let res = 1
  for (let i = 0; i < colArr.length; i++) {
    const breakpoint = colArr[i]
    currentBreakpoint.value = breakpoint;
    if ( screens[breakpoint] || breakpoint === 'xs' ) {
      res = cols[breakpoint]
      break
    }
  }
  return res
} )
const matchHandlers = {}
onMounted ( () => {
  Object.keys ( responsiveMap ).forEach ( (screen) => {
    const matchMediaQuery = responsiveMap[screen]
    if ( !matchMediaQuery )
      return
    const listener = ({matches}) => {
      screens[screen] = matches
    }
    const mql = window.matchMedia ( matchMediaQuery )
    if ( mql.addEventListener )
      mql.addEventListener ( 'change', listener )
    else
      mql.addListener ( listener )

    matchHandlers[matchMediaQuery] = {
      mql,
      listener,
    }
    listener ( mql )
  } )
} )
onUnmounted ( () => {
  // 移除监听器
  Object.keys ( responsiveMap ).forEach ( (screen) => {
    const matchMediaQuery = responsiveMap[screen]
    if ( !matchMediaQuery )
      return
    const handler = matchHandlers[matchMediaQuery]
    if ( handler && handler.mql && handler.listener ) {
      if ( handler.mql.removeEventListener )
        handler.mql.removeEventListener ( 'change', handler.listener )
      else
        handler.mql.removeListener ( handler.listener )
    }
  } )
} )
</script>

<template>
  <el-form ref="formRef" v-bind="getBindValue"
           label-suffix=":"
           :label-width="labelWidthCalc"
           :label-position="labelPositionCalc">

    <el-row :gutter="20">
      <el-col :span="resultCol" v-for="(schema, index) in getSchema"  :key="schema.field">
        <slot name="formHeader"></slot>
        <FormItem
          :schema="schema"
          :formProps="propsRef"
          :setFormModel="setFormModel"
        >
          <template #[item]="data" v-for="item in Object.keys($slots)">
            <slot :name="item" v-bind="data || {}"></slot>
          </template>
        </FormItem>
        <slot name="formFooter"></slot>
      </el-col>
    </el-row>
    <slot name="formFooter"></slot>
  </el-form>
</template>
