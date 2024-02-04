<route lang="yaml">
name: home
meta:
title: 主页
icon: ant-design:home-twotone
</route>

<script setup lang="ts">
import useForm from "@/components/VForm/src/hooks/useForm.ts";
import Input from "@/views/component_basic_example/components/input.vue";
import {BasicForm, FormSchema} from "@/components/VForm";
import RadioGroup from "@/components/RadioGroup/RadioGroup.vue";
import CheckBoxGroup from "@/components/CheckBoxGroup/CheckBoxGroup.vue";
import {componentMap} from "@/components/VForm/src/componentMap.ts";


const schemas = ref<FormSchema> ( [


  {
    field: 'price222',
    component: 'DataInput',
    defaultValue:'123',
    label: '菜品价格',
    componentProps: {
      onChange(val) {
        console.log ( val, "val" )
      },
    }

  },
  {
    field: 'price111',
    component: 'Input',
    defaultValue:'123',
    label: '菜品价格',
    required: true,


  },
  {
    field: 'price1',
    component: 'Input',
    defaultValue:'123',
    label: '菜品价格',
    required: true,

  },
  {
    field: 'price2',
    component: 'Input',
    defaultValue:'123',
    label: '菜品价格',
    required: true,

  },
  {
    field: 'price3',
    component: 'Input',
    defaultValue:'123',
    label: '菜品价格',
    required: true,

  },
  {
    field: 'price4',
    component: 'Input',
    defaultValue:'123',
    label: '菜品价格',
    required: true,

  },
  {
    field: 'price5',
    component: 'Input',
    defaultValue:'123',
    label: '菜品价格',
    required: true,

  },
  {
    field: 'description',
    defaultValue:123,
    component: 'InputNumber',
    componentProps: {},
    label: '菜品描述',
  },
  {
    field: 'Switch4',
    component: 'DataSelect',
    label: 'Select',
    defaultValue:"选项1",

    componentProps: {
      onChange(val) {
        console.log ( val, "val" )
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
    }
  },
  {
    field: 'Switch5',
    defaultValue:new Date(),
    component: 'TimeSelect',
    label: 'TimeSelect',
  },

  {
    field: 'Switch11',
    component: 'Cascader',
    label: 'Cascader',
    componentProps: {

      options: [
        {
          value: 'guide',
          label: 'Guide',
          children: [
            {
              value: 'disciplines',
              label: 'Disciplines',
              children: [
                {
                  value: 'consistency',
                  label: 'Consistency',
                },
                {
                  value: 'feedback',
                  label: 'Feedback',
                },
                {
                  value: 'efficiency',
                  label: 'Efficiency',
                },
                {
                  value: 'controllability',
                  label: 'Controllability',
                },
              ],
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'side nav',
                  label: 'Side Navigation',
                },
                {
                  value: 'top nav',
                  label: 'Top Navigation',
                },
              ],
            },
          ],
        },
        {
          value: 'component',
          label: 'Component',
          children: [
            {
              value: 'basic',
              label: 'Basic',
              children: [
                {
                  value: 'layout',
                  label: 'Layout',
                },
                {
                  value: 'color',
                  label: 'Color',
                },
                {
                  value: 'typography',
                  label: 'Typography',
                },
                {
                  value: 'icon',
                  label: 'Icon',
                },
                {
                  value: 'button',
                  label: 'Button',
                },
              ],
            },
            {
              value: 'form',
              label: 'Form',
              children: [
                {
                  value: 'radio',
                  label: 'Radio',
                },
                {
                  value: 'checkbox',
                  label: 'Checkbox',
                },
                {
                  value: 'input',
                  label: 'Input',
                },
                {
                  value: 'input-number',
                  label: 'InputNumber',
                },
                {
                  value: 'select',
                  label: 'Select',
                },
                {
                  value: 'cascader',
                  label: 'Cascader',
                },
                {
                  value: 'switch',
                  label: 'Switch',
                },
                {
                  value: 'slider',
                  label: 'Slider',
                },
                {
                  value: 'time-picker',
                  label: 'TimePicker',
                },
                {
                  value: 'date-picker',
                  label: 'DatePicker',
                },
                {
                  value: 'datetime-picker',
                  label: 'DateTimePicker',
                },
                {
                  value: 'upload',
                  label: 'Upload',
                },
                {
                  value: 'rate',
                  label: 'Rate',
                },
                {
                  value: 'form',
                  label: 'Form',
                },
              ],
            },
            {
              value: 'data',
              label: 'Data',
              children: [
                {
                  value: 'table',
                  label: 'Table',
                },
                {
                  value: 'tag',
                  label: 'Tag',
                },
                {
                  value: 'progress',
                  label: 'Progress',
                },
                {
                  value: 'tree',
                  label: 'Tree',
                },
                {
                  value: 'pagination',
                  label: 'Pagination',
                },
                {
                  value: 'badge',
                  label: 'Badge',
                },
              ],
            },
            {
              value: 'notice',
              label: 'Notice',
              children: [
                {
                  value: 'alert',
                  label: 'Alert',
                },
                {
                  value: 'loading',
                  label: 'Loading',
                },
                {
                  value: 'message',
                  label: 'Message',
                },
                {
                  value: 'message-box',
                  label: 'MessageBox',
                },
                {
                  value: 'notification',
                  label: 'Notification',
                },
              ],
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'menu',
                  label: 'Menu',
                },
                {
                  value: 'tabs',
                  label: 'Tabs',
                },
                {
                  value: 'breadcrumb',
                  label: 'Breadcrumb',
                },
                {
                  value: 'dropdown',
                  label: 'Dropdown',
                },
                {
                  value: 'steps',
                  label: 'Steps',
                },
              ],
            },
            {
              value: 'others',
              label: 'Others',
              children: [
                {
                  value: 'dialog',
                  label: 'Dialog',
                },
                {
                  value: 'tooltip',
                  label: 'Tooltip',
                },
                {
                  value: 'popover',
                  label: 'Popover',
                },
                {
                  value: 'card',
                  label: 'Card',
                },
                {
                  value: 'carousel',
                  label: 'Carousel',
                },
                {
                  value: 'collapse',
                  label: 'Collapse',
                },
              ],
            },
          ],
        },
        {
          value: 'resource',
          label: 'Resource',
          children: [
            {
              value: 'axure',
              label: 'Axure Components',
            },
            {
              value: 'sketch',
              label: 'Sketch Templates',
            },
            {
              value: 'docs',
              label: 'Design Documentation',
            },
          ],
        },
      ],
      onChange(val) {
        console.log ( val, "val" )
      }
    },
  },
] )

componentMap.set ( "RadioGroup", RadioGroup );
componentMap.set ( "CheckBoxGroup", CheckBoxGroup );
const {register, methods} = useForm ( {
  schemas: schemas.value
} );
const handleGetValue = async () => {
  var fieldsValue = await methods.getFieldsValue ();
  console.log ( fieldsValue, '1' )
}
const setValue = async () => {
  await methods.setFieldsValue ( {
    price: 1
  } )
}
function handleSubmit(val){
  console.log (val,'val')
}
</script>

<template>
  <div>
    <PageMain>
      <BasicForm @register="register" @submit="handleSubmit"></BasicForm>
    </PageMain>
  </div>
</template>

<style lang="scss" scoped>

</style>
