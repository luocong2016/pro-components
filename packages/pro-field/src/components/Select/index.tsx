import { defineComponent, type App, DefineComponent, Plugin, PropType, ExtractPropTypes } from 'vue';
import { getSlot, type ProFieldRequestData } from '@ant-design-vue/pro-utils';
import { Spin } from 'ant-design-vue';
import renderEmpty from 'ant-design-vue/es/config-provider/renderEmpty';
import SearchSelect from './SearchSelect';
import type { SearchSelectProps } from './SearchSelect/types';
import { proFieldFC } from '../typings';
import { useFetchData } from './hooks/useFetchData';

export const fieldSelectProps = {
  ...proFieldFC,
  fieldProps: {
    type: Object as PropType<SearchSelectProps>,
  },
  // 请求
  request: {
    type: Function as PropType<ProFieldRequestData>,
  },
};
export type FieldSelectProps = Partial<ExtractPropTypes<typeof fieldSelectProps>>;

const FieldSelect = defineComponent({
  inheritAttrs: false,
  props: fieldSelectProps,
  slots: ['render', 'renderFormItem'],
  setup(props, { slots }) {
    const { defaultKeyWords, loading, options } = useFetchData(props);
    return () => {
      const { mode, text, fieldProps } = props;
      const render = getSlot(slots, props, 'render') as any;
      const renderFormItem = getSlot(slots, props, 'renderFormItem') as any;

      if (mode === 'read') {
        const dom = <>{text}</>;
        if (render) {
          return render(text, { mode, fieldProps }, dom) || null;
        }
        return dom;
      }
      if (mode === 'edit' || mode === 'update') {
        const hasChildren = typeof fieldProps?.default === 'function';
        const renderDom = (
          <SearchSelect
            style={{
              minWidth: 100,
            }}
            {...fieldProps}
            loading={loading.value}
            options={hasChildren ? undefined : options.value}
            default={hasChildren ? fieldProps?.default : undefined}
            fetchData={(value) => (defaultKeyWords.value = value)}
            resetData={() => (defaultKeyWords.value = '')}
            v-slots={{
              notFoundContent: () => {
                return loading.value ? <Spin size={'small'} /> : fieldProps?.notFoundContent || renderEmpty('Select');
              },
            }}
          />
        );
        if (renderFormItem) {
          return renderFormItem(text, { mode, fieldProps }, renderDom) || null;
        }
        return renderDom;
      }
      return null;
    };
  },
});

FieldSelect.install = (app: App) => {
  app.component(FieldSelect.name, FieldSelect);
  return app;
};

export default FieldSelect as DefineComponent<FieldSelectProps> & Plugin;
