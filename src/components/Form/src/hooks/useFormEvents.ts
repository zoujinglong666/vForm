import {ComputedRef, nextTick, Ref, unref} from "vue";
import type { FormActionType, FormProps } from "../types";
import {Recordable} from "@/hooks/vben/types";
import {FormSchema} from "@/components/Form/src/type";

export interface UseFormActionContext {
  propsRef: Ref<Partial<FormProps>>;
  formElRef: Ref<FormActionType>;
  emit: EmitType
  getProps: ComputedRef<FormProps>
  getSchema: ComputedRef<FormSchema[]>
  formModel: Recordable
  defaultValueRef: Ref<Recordable>
  schemaRef: Ref<FormSchema[]>
}

export function useFormEvents({ propsRef,formElRef,emit,getSchema }: UseFormActionContext) {
  const getAllFields = () =>
    unref(getSchema)
      .map(item => [...(item.fields || []), item.field])
      .flat(1)
      .filter(Boolean)

  function getFieldsValue(): Recordable {
    console.log (propsRef,'propsRef')
    const formModel=unref(propsRef)
    const model=formModel.model
    return model

  }
  async function resetFields() {
    await unref(formElRef).resetFields();
    nextTick(() => clearValidate());
  }

  async function clearValidate(name?: string | string[]) {
    await unref(formElRef).clearValidate(name);
  }

  async function validate(callback: (valid: any) => void) {
    return await unref(formElRef).validate(callback);
  }

  async function validateField(
    prop: string | string[],
    callback: (err: string) => void
  ) {
    return await unref(formElRef).validateField(prop, callback);
  }

  async function scrollToField(prop: string) {
    return await unref(formElRef).scrollToField(prop);
  }

  return { resetFields, clearValidate, validate, validateField, scrollToField,getAllFields,getFieldsValue };
}
