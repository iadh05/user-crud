import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import { render } from '@vue/server-test-utils'
import UserForm from '@/components/UserForm.vue'
import Vuex from "vuex"
import Vuetify from 'vuetify'


const localVue = createLocalVue()

localVue.use(Vuex)
let actions
let store
let vuetify;
describe('UserForm.vue', () => {
    beforeEach(() => {
        vuetify = new Vuetify()
    })
    it('should show the form element on the user output', () => {
        const wrapper = mount(UserForm, {
            vuetify,
            localVue
        })
        expect(wrapper.html()).toMatchSnapshot()
    })
    beforeEach(() => {
        actions = {
            actionClick: jest.fn(),
            updateUserFields: jest.fn()
        }
        store = new Vuex.Store({
            actions
        })
    })

    it('dispatches "actionInput" when input event value is "input"', async () => {
        vuetify = new Vuetify()
        const wrapper = await mount(UserForm, {
            stubs: {

            }
        })

    })
    it("changing the element's value, updates the v-model", () => {
        const parent = mount(UserForm, {
            store: { state }
        })

        const firstNameInputInnerTextField = parent.find('#firstname');
        firstNameInputInnerTextField.element.value = "test";
        firstNameInputInnerTextField.trigger('input');

        expect(parent.vm.store.state.user.firstName).toBe("test");

    })
})
