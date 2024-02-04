import {nextTick, onUnmounted, ref, unref, watch} from "vue";
import {FormActionType, FormProps} from "../types";
import {throwError} from "@/utils/common/log";
import {isProdMode} from "@/utils/env";
import {Nullable} from "@/hooks/vben/types";
import {FormSchema} from "@/components/VForm";

export default function useForm(props?: Partial<FormProps>) {
  const formAction = ref<Nullable<FormActionType>>(null);
  const loadedRef = ref<Nullable<boolean>>(false);
  console.log (formAction,"Dom")
  function register(instance: FormActionType) {
    if (isProdMode()) {
      // 开发环境下，组件卸载后释放内存
      onUnmounted(() => {
        formAction.value = null;
        loadedRef.value = null;
      });
    }

    // form 组件实例 instance 已存在
    // 实际上 register 拿到的并不是 组件实例， 只是挂载了一些组件内部方法的 对象 formAction
    if (unref(loadedRef) && isProdMode() && instance === unref(formAction)) {
      return;
    }

    formAction.value = instance;
    loadedRef.value = true;

    // 监听 props， 若props改变了
    // 则使用 form 实例调用内部的 setProps 方法将新的props设置到form组件内部
    watch(
      () => props,
      () => {
        if (props) {

          console.log (instance,"实例")
          instance.setProps(props);
        }
      },
      { immediate: true, deep: true }
    );
  }

  async function getForm() {
    const form = unref(formAction);
    console.log (form,"form")
    if (!form) {
      throwError(
        "The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation!"
      );
    }
    await nextTick();
    return form as FormActionType;
  }

  const methods: FormActionType = {
    async setProps(formProps: Partial<FormProps>) {
      const form = await getForm();
      form.setProps(formProps);
    },
    async validate(callback: (valid: any) => void) {
      const form = await getForm();
      form.validate(callback);
    },
    async validateField(
      props: string | string[],
      callback: (err: string) => void
    ) {
      const form = await getForm();
      form.validateField(props, callback);
    },
    async resetFields() {
      const form = await getForm();
      form.resetFields();
    },
    async clearValidate() {
      const form = await getForm();
      form.clearValidate();
    },
    async scrollToField(prop: string) {
      const form = await getForm();
      form.scrollToField(prop);
    },
    async getAllFields(prop: string) {
      const form = await getForm();
      return await form.getAllFields ()
    },

    async getFieldsValue(prop: string) {
      const form = await getForm();
      return await form.getFieldsValue ()
    },

    setFieldsValue: async <T extends Recordable<any>>(values: T) => {
      const form = await getForm()
      await form.setFieldsValue(values)
    },
    appendSchemaByField: async (
      schema: FormSchema | FormSchema[],
      prefixField: string | undefined,
      first?: boolean,
    ) => {
      const form = await getForm();
      form.appendSchemaByField(schema, prefixField, first);
    },

    submit: async (): Promise<any> => {
      const form = await getForm();
      return form.submit();
    },



    validateFields: async (nameList?: any[]): Promise<Recordable> => {
      const form = await getForm();
      return form.validateFields(nameList);
    },
  };

  return { register, methods };
}
