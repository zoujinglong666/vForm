<script lang="tsx">
import {defineComponent, PropType} from "vue";
import {type Nullable, type Recordable} from '@/hooks/vben/types';
import {FormSchema} from "@/components/Form/src/type";
import {componentMap} from "@/components/Form/src/componentMap.ts";
import {FormProps} from "element-plus";
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
    let {component, label, changeEvent = 'change', field} = props.schema
    let Comp = componentMap.get ( component ) as ReturnType<typeof defineComponent>;
    console.log (props.formModel[field],"props.formModel[field]")
    console.log (props.formModel,"props.formModel")
    let bindValue = {
      modelValue: props.formModel[field],
    }
    let getModelValue = computed ( {
      get() {
        return props.formModel[field];
      },
      set(value: any) {
        props.setFormModel ( field, value, props.schema );
      },
    } );
    let getComponentsProps = computed ( () => {
      let {schema, formModel, setFormModel} = props;
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
    console.log (propsData)
    let isCheck = component && ['Input'].includes ( component );
    let eventKey = isCheck?`onInput`:`on${upperFirst ( changeEvent )}`;
    console.log ( eventKey, "eventKey" )
    let on = {
      [eventKey]: (...args: Nullable<Recordable<any>>[]) => {
        console.log (args,"args")
        let [e] = args;
        console.log ( e,"e" )
        if ( propsData[eventKey] ) {
          propsData[eventKey] ( ...args );
        }
        let target = e ? e.target : null;
        let value = target ? (isCheck ? target.value : target.value) : e;
        props?.setFormModel ( field, value, props.schema );
      },
    };

    let compAttr = {
      ...bindValue, ...on
    }
    // v-model={getModelValue}
    return () => (
      <el-form-item label={label}>
        <div style="display:flex;width:100%">
          <div style="flex:1 1 0;"><Comp {...compAttr} /></div>
        </div>
      </el-form-item>


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


