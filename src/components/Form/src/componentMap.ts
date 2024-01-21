import type { Component } from 'vue';

/**
 * Component list, register here to setting it in the form
 */
import {
  ElInput,
  ElInputNumber,
  ElSelect,
  ElSwitch,
  ElText, ElLink,
  ElRadio,
  ElRadioButton,
  ElCascader,
  ElDatePicker,
  ElTimePicker,
  ElTimeSelect,
  ElUpload,
  ElSlider,
  ElRate,
  ElDivider,
} from 'element-plus';
import DataSelect from "@/components/DataSelect/DataSelect.vue";

const componentMap = new Map<any | string, Component>();

componentMap.set('Input', ElInput);
componentMap.set('InputNumber', ElInputNumber);
componentMap.set('Select', ElSelect);
componentMap.set('Switch', ElSwitch);
componentMap.set('Text', ElText);
componentMap.set('Link', ElLink);
componentMap.set('Radio', ElRadio);
componentMap.set('RadioButton', ElRadioButton);
componentMap.set('Slider', ElSlider);
componentMap.set('TimePicker', ElTimePicker);
componentMap.set("Cascader", ElCascader);
componentMap.set("DatePicker", ElDatePicker);
componentMap.set("TimePicker", ElTimePicker);
componentMap.set("TimeSelect", ElTimeSelect);
componentMap.set("Switch", ElSwitch);
componentMap.set("Upload", ElUpload);
componentMap.set("Slider", ElSlider);
componentMap.set("Rate", ElRate);
componentMap.set("Divider", ElDivider);
componentMap.set("DataSelect", DataSelect);
export function add<T extends string, R extends Component>(
  compName: any | T,
  component: R,
) {
  componentMap.set(compName, component);
}

export function del<T extends string>(compName: any | T) {
  componentMap.delete(compName);
}

export { componentMap };
