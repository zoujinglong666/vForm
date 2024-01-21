import {definePropType} from "@/utils";
import {FormRules} from "element-plus";
import {PropType} from "vue";
import {FormSchema} from "@/components/Form/src/type";
export const basicProps = {
  model:{
    type:definePropType<Record<string, any>>(Object),
    default:()=>{
      return {}
    }
  },
  labelWidth:{
    type:definePropType([String,Number]),
    default:"100px"
  },
  inline:{
    type:Boolean,
    default:true
  },
  rules:{
    type:definePropType<FormRules>(Object),
    default:()=>{
      return {}
    }
  },
  labelPosition:{
    type:definePropType([String]),
    default:'right'
  },
  disabled:{
    type:Boolean
  },
  scrollToError:{
    type:Boolean,
    default:true
  },
  showMessage:{
    type:Boolean,
    default:true
  },
  resetFunc: Function as PropType<() => Promise<void>>,
  submitFunc: Function as PropType<() => Promise<void>>,
  schemas: {
    type: Array as PropType<FormSchema[]>,
    default: () => [],
  },
}

export const basicEmits = [
  'reset',
  'submit',
  'register',
]
