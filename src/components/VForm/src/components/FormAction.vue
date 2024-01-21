<template>
  <el-col v-bind="actionColOpt" v-if="showActionButtonGroup">
    <div style="width: 100%" :style="{ textAlign: actionColOpt.style.textAlign }">
        <slot name="resetBefore"></slot>
        <el-button
          class="mr-2"
          v-bind="getResetBtnOptions"
          @click="resetAction"
          v-if="showResetButton"
        >
          {{ getResetBtnOptions.text }}
        </el-button>
        <slot name="submitBefore"></slot>

        <el-button
          type="primary"
          class="mr-2"
          v-bind="getSubmitBtnOptions"
          @click="submitAction"
          v-if="showSubmitButton"
        >
          {{ getSubmitBtnOptions.text }}
        </el-button>

        <slot name="advanceBefore"></slot>
        <el-button
          size="small"
          @click="toggleAdvanced"
          v-if="showAdvancedButton && !hideAdvanceBtn"
        >
          {{ isAdvanced ? 'component.form.putAway': 'component.form.unfold' }}
          <BasicArrow class="ml-1" :expand="!isAdvanced" up />
        </el-button>
        <slot name="advanceAfter"></slot>
    </div>
  </el-col>
</template>
<script lang="ts" setup>
  import type { ColEx } from '../types';
  import { computed, PropType } from 'vue';
  import { useFormContext } from '../hooks/useFormContext';
  import { propTypes } from '@/utils/propTypes';
  import {ButtonProps} from "element-plus";

  defineOptions({ name: 'BasicFormAction' });

  const props = defineProps({
    showActionButtonGroup: propTypes.bool.def(true),
    showResetButton: propTypes.bool.def(true),
    showSubmitButton: propTypes.bool.def(true),
    showAdvancedButton: propTypes.bool.def(true),
    resetButtonOptions: {
      type: Object as PropType<ButtonProps>,
      default: () => ({}),
    },
    submitButtonOptions: {
      type: Object as PropType<ButtonProps>,
      default: () => ({}),
    },
    actionColOptions: {
      type: Object as PropType<Partial<ColEx>>,
      default: () => ({}),
    },
    actionSpan: propTypes.number.def(6),
    isAdvanced: propTypes.bool,
    hideAdvanceBtn: propTypes.bool,
  });

  const emit = defineEmits(['toggle-advanced']);

  const { resetAction, submitAction } = useFormContext();

  const actionColOpt = computed(() => {
    const { showAdvancedButton, actionSpan: span, actionColOptions } = props;
    const actionSpan = 24 - span;
    const advancedSpanObj = showAdvancedButton ? { span: actionSpan < 6 ? 24 : actionSpan } : {};
    const actionColOpt: Partial<ColEx> = {
      style: { textAlign: 'right' },
      span: showAdvancedButton ? 6 : 4,
      ...advancedSpanObj,
      ...actionColOptions,
    };
    return actionColOpt;
  });

  const getResetBtnOptions = computed((): ButtonProps => {
    return Object.assign(
      {
        text: '重置',
      },
      props.resetButtonOptions,
    );
  });

  const getSubmitBtnOptions = computed((): ButtonProps => {
    return Object.assign(
      {
        text: '提交',
      },
      props.submitButtonOptions,
    );
  });

  function toggleAdvanced() {
    emit('toggle-advanced');
  }
</script>
