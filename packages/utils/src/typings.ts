import type { Slot, VNode, VNodeChild } from 'vue';
import type { DefaultOptionType } from 'ant-design-vue/es/select';

import type { ProFieldValueType, ProFieldValueTypeWithFieldProps } from './types';

export { ProFieldValueType, ProFieldValueTypeWithFieldProps };

export type Recordable<T = any> = Record<string, T>;

// Node
export type VueNode =
  | Slot
  | VNodeChild
  | VNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | ((...props: any[]) => Slot)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | ((...props: any[]) => VNode)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | ((...args: any[]) => VNode)
  | VNode[]
  | JSX.Element
  | string
  | null
  | undefined;

// Mode
export type ProFieldFCMode = 'read' | 'edit' | 'update';

// Text
export type VueText = string | number;

// Text
export type ProFieldTextType = VueNode | VueNode[] | Record<string, any> | Record<string, any>[];

export type ProFieldRequestData<U = any> = (params?: U) => Promise<DefaultOptionType[]>;

export type ProFieldValueObjectType = {
  type: 'progress' | 'money' | 'percent' | 'image';
  status?: 'normal' | 'active' | 'success' | 'exception' | undefined;
  locale?: string;
  /** Percent */
  showSymbol?: ((value: any) => boolean) | boolean;
  showColor?: boolean;
  precision?: number;
  moneySymbol?: boolean;
  request?: ProFieldRequestData;
  /** Image */
  width?: number;
};
