import type { Component } from 'vue';
import type { ComponentType } from './types';
import {
  ElCascader, ElDatePicker, ElDivider,
  ElInput,
  ElInputNumber,
  ElLink,
  ElRadio,
  ElRadioButton, ElRate,
  ElSelect,
  ElSlider,
  ElSwitch,
  ElText, ElTimePicker, ElTimeSelect, ElUpload,ElColorPicker,ElCheckbox
} from "element-plus";
import DataSelect from "@/components/DataSelect/DataSelect.vue";
import DateSelect from "@/components/DateSelect/DateSelect.vue";
import TimeSelect from "@/components/TimeSelect/TimeSelect.vue";
import RadioGroup from "@/components/RadioGroup/RadioGroup.vue";
import CheckBoxGroup from "@/components/CheckBoxGroup/CheckBoxGroup.vue";

/**
 * Component list, register here to setting it in the form
 */
const componentMap = new Map<any | string, Component>();

componentMap.set('Input', ElInput);
componentMap.set('InputNumber', ElInputNumber);
componentMap.set('Select', ElSelect);
componentMap.set('Switch', ElSwitch);
componentMap.set('Text', ElText);
componentMap.set('Link', ElLink);
componentMap.set('Radio', ElRadio);
componentMap.set('RadioButton', ElRadioButton);
componentMap.set('CheckBox', ElCheckbox);
componentMap.set('Slider', ElSlider);
componentMap.set('TimePicker', ElTimePicker);
componentMap.set("Cascader", ElCascader);
componentMap.set("DateSelect", DateSelect);
componentMap.set("TimePicker", ElTimePicker);
componentMap.set("TimeSelect", ElTimeSelect);
componentMap.set("Switch", ElSwitch);
componentMap.set("Upload", ElUpload);
componentMap.set("Slider", ElSlider);
componentMap.set("Rate", ElRate);
componentMap.set("Divider", ElDivider);
componentMap.set("ColorPicker", ElColorPicker);
componentMap.set("DataSelect", DataSelect);
componentMap.set("TimeSelect", TimeSelect);
componentMap.set("RadioGroup", RadioGroup);
componentMap.set("CheckBoxGroup", CheckBoxGroup);





export function add<T extends string, R extends Component>(
  compName: ComponentType | T,
  component: R,
) {
  componentMap.set(compName, component);
}

export function del<T extends string>(compName: ComponentType | T) {
  componentMap.delete(compName);
}

export { componentMap };
