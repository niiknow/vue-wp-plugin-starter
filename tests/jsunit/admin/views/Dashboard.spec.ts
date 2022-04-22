import { mount } from '@vue/test-utils';
import Dashboard from '~src/admin/views/Dashboard.vue';

describe('Dashboard.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = mount(Dashboard, {
      props: { msg },
    })
    expect(wrapper.text()).toMatch(msg);
  });
});
