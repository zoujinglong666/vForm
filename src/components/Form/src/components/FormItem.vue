<!--<script lang="ts" setup>-->
<!--import { componentMap } from "../componentMap";-->
<!--import { FormSchema } from "../type/index.ts";-->
<!--import { ElFormItem } from "element-plus";-->
<!--import {isString} from "@/utils/is.ts";-->
<!--import {Recordable} from "@/hooks/vben/types";-->

<!--const attrs = useAttrs();-->
<!--const props = defineProps<{-->
<!--  schema: FormSchema;-->
<!--  formProps: Recordable;-->
<!--  setFormModel: (k: string, v: any) => void;-->
<!--}>();-->
<!--const { component, field, label } = props.schema;-->

<!--const labelIsVNode = computed(() => !isString(label));-->

<!--const compAttr = computed(() => ({-->
<!--  ...props.schema.componentProps,-->
<!--}));-->

<!--// 内容组件的双向绑定数据-->
<!--const getModelValue = computed({-->
<!--  get() {-->
<!--    return props.formProps.model[field];-->
<!--  },-->
<!--  set(value) {-->
<!--    props.setFormModel(field, value);-->
<!--  },-->
<!--});-->

<!--const getBindValue = computed(() => {-->
<!--  const value: Recordable = {-->
<!--    ...attrs,-->
<!--    prop: field,-->
<!--  };-->
<!--  if (isString(label)) {-->
<!--    value.label = label;-->
<!--  }-->
<!--  return value;-->
<!--});-->

<!--function renderComponent() {-->
<!--  if (props.schema.render) {-->
<!--    return props.schema.render;-->
<!--  }-->
<!--  return componentMap.get(component);-->
<!--}-->
<!--</script>-->

<!--<template>-->
<!--  <ElFormItem v-bind="getBindValue" style="width: 100%">-->
<!--    <template v-if="labelIsVNode" #label>-->
<!--      <component :is="label" />-->
<!--    </template>-->
<!--    <component-->
<!--      style="width:100%"-->
<!--      v-model="getModelValue"-->
<!--      v-bind="compAttr"-->
<!--      :is="renderComponent()"-->
<!--    />-->
<!--  </ElFormItem>-->
<!--</template>-->
<script lang="tsx">
import {defineComponent, PropType} from "vue";
import {type Nullable, type Recordable} from '@/hooks/vben/types';
import {FormSchema} from "@/components/Form/src/type";
import {componentMap} from "@/components/Form/src/componentMap.ts";
import {ElFormItem, FormProps} from "element-plus";
import {upperFirst} from "scule";
import {isFunction} from "@/utils/is.ts";

export default defineComponent ( {
  name: "BasicFormItem",
  inheritAttrs: false,
  props: {
    schema: {
      type: Object as PropType<FormSchema>,
      default: () => ({}),
    },
    formProps: {
      type: Object as PropType<FormProps>,
      default: () => ({}),
    },
    allDefaultValues: {
      type: Object as PropType<Recordable<any>>,
      default: () => ({}),
    },
    formModel: {
      type: Object as PropType<Recordable<any>>,
      default: () => ({}),
    },
    setFormModel: {
      type: Function as PropType<(key: string, value: any, schema: FormSchema) => void>,
    },
  },
  setup(props, {slots}) {
    let {component, label, changeEvent = 'change', field, render} = props.schema
    let Comp = componentMap.get ( component ) as ReturnType<typeof defineComponent>;
    let bindValue = {
      modelValue: props.formModel[field],
    }


    let getModelValue = computed ( {
      get() {
        console.log (props.formProps.model[field])
        return props.formProps.model[field]
      },
      set(value) {
        console.log ("设置",value)
        props.setFormModel ( field, value )
      }
    } )

    const getValues = computed ( () => {
      const {allDefaultValues, formModel, schema} = props;
      const {mergeDynamicData} = props.formProps;
      return {
        field: schema.field,
        model: formModel,
        values: {
          ...mergeDynamicData,
          ...allDefaultValues,
          ...formModel,
        } as Recordable<any>,
        schema: schema,
      };
    } );
    let getComponentsProps = computed ( () => {
      let {schema, formModel} = props;
      let {componentProps = {}} = schema;
      if ( isFunction ( componentProps ) ) {
        componentProps = componentProps ( {schema, formModel} ) ?? {};
      }
      return componentProps as Recordable<any>;
    } );
    let propsData: Recordable<any> = {
      ...unref ( getComponentsProps ),
      disabled: false,
      readonly: false,
    };
    console.log ( propsData )
    let isCheck = component && ['Input'].includes ( component );
    let eventKey = isCheck ? `change` : `on${upperFirst ( changeEvent )}`;
    let on = {
      [eventKey]: (...args: Nullable<Recordable<any>>[]) => {
        let [e] = args;
        if ( propsData[eventKey] ) {
          propsData[eventKey] ( ...args );
        }
        let target = e ? e.target : null;
        let value = target ? (isCheck ? target.value : target.value) : e;
        props?.setFormModel ( field, value, props.schema );
      },
    };

    let compAttr = {
      ...bindValue, ...on,...propsData
    }
    console.log (compAttr,'compAttr')
    return () => (
      <ElFormItem label={label} prop={props.schema.field}>
        <div style="display:flex;width:100%">
          <div style="flex:1 1 0;"><Comp {...compAttr} /></div>
        </div>
      </ElFormItem>


    )
  },

} )

</script>

<style lang="scss" scoped>
.test {
  font-size: 24px;

  span {
    font-weight: bold;
    color: #f00;
  }
}
</style>


