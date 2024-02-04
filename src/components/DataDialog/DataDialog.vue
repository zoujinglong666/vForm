<template>
  <div class="">
    <el-dialog
      v-bind="attrs"
      :width="props.width"
      :model-value="props.modelValue"
      :show-close="false"
      :fullscreen="attrs?.fullscreen ?? isFullscreen"
      :before-close="handleClose"
    >
      <template #header>
        <div>
          <span class="dialog-title">{{ props.title }}</span>
        </div>
        <div class="btns">
          <el-icon v-if="isFullScreenBtn" @click="handleFullscreen"><FullScreen /></el-icon>
          <el-icon @click="handleClose"><Close /></el-icon>
        </div>
      </template>
      <div class="dialog-content" v-loading="props.loading">
        <slot></slot>
      </div>
      <template #footer v-if="props.showFooter">
        <div v-if="!slots.footer" class="dialog-footer">
          <FixedActionBar v-if="isFullscreen">
            <el-button type="primary" @click="handleConfirm">{{ props.confirmText }}</el-button>
            <el-button @click="handleClose">{{ props.cancelText }}</el-button>
          </FixedActionBar>
          <div v-else>
            <el-button type="primary" @click="handleConfirm">{{ props.confirmText }}</el-button>
            <el-button @click="handleClose">{{ props.cancelText }}</el-button>
          </div>
        </div>
        <slot v-else name="footer"></slot>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, useAttrs, useSlots, watch } from "vue";
import { Close, FullScreen } from "@element-plus/icons-vue";
import FixedActionBar from "@/components/FixedActionBar/index.vue";

const attrs = useAttrs();
const slots = useSlots();
const isFullscreen = ref(false);
const isFullScreenBtn = computed(() => {
  if (props.hiddenFullBtn) return false;
  if (attrs?.fullscreen) return false;
  return true;
});

interface DataDialogPropsType {
  title?: string;
  isDraggable?: boolean;
  modelValue?: boolean;
  hiddenFullBtn?: boolean;
  loading?: boolean;
  confirmText?: string;
  cancelText?: string;
  showFooter?: boolean;
  width?: string;
  showConfirmBtn?: boolean;
}

const props = withDefaults(defineProps<DataDialogPropsType>(), {
  title: "",
  isDraggable: false,
  modelValue: false,
  hiddenFullBtn: false,
  loading: false,
  confirmText: "确认",
  cancelText: "关闭",
  showFooter: true,
  showConfirmBtn: true,
  width: "50%"
});

const emits = defineEmits<{
  (e: "update:modelValue", val: Boolean): void;
  (e: "confirm"): void;
  (e: "close"): void;
  (e: "open"): void;
}>();

const handleFullscreen = () => {
  if (attrs?.fullscreen) return;
  isFullscreen.value = !isFullscreen.value;
};

watch(
  () => props.modelValue,
  (value, oldValue, onCleanup) => {
    if (value) {
      emits("open");
    }
  }
);
const handleClose = () => {
  if (Reflect.has(attrs, "before-close") && typeof attrs["before-close"] === "function") {
    attrs["before-close"]();
  }
  setTimeout(() => {
    isFullscreen.value = false;
  }, 0);
  emits("close");
  emits("update:modelValue", false);
};
const handleConfirm = () => {
  emits("confirm");
};
defineExpose({
  visible: props.modelValue
});
</script>

<style lang="scss" scoped>
:deep(.el-dialog__header) {
  border-bottom: 1px solid #eee;
  display: flex;
  padding: 12px 16px;
  align-items: center;
  justify-content: space-between;
  margin: 0;
}

:deep(.el-dialog__footer) {
  box-sizing: border-box;
}

.dialog-content {
  max-height: 75vh;
  flex: 1;
  overflow: scroll;
}

.dialog-title {
  line-height: 24px;
  font-size: 18px;
  color: #303133;
}

.btns {
  display: flex;
  align-items: center;

  i {
    margin-right: 8px;

    font-size: 16px;
    cursor: pointer;
  }
  i:last-child {
    margin-right: 0;
  }
}
</style>
