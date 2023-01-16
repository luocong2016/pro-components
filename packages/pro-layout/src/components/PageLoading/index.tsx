import { defineComponent } from "vue";
import { Spin, type SpinProps } from "ant-design-vue";

export type PageLoadingProps = SpinProps;

export default defineComponent<SpinProps & any>({
  setup(props) {
    const { isLoading, pastDelay, timedOut, error, retry, ...reset } = props;

    return () => (
      <div style={{ paddingBlockStart: '100px', textAlign: "center" }}>
        <Spin
          size='large'
          {...reset}
        />
      </div>
    );
  },
});
