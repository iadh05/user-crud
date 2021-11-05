import Vue from 'vue'
import { mount, createLocalVue, enableAutoDestroy } from '@vue/test-utils'
import UserForm from '@/components/UserForm.vue'
import Vuex from "vuex"
import Vuetify from 'vuetify'


// calls wrapper.destroy() after each test
enableAutoDestroy(afterEach)


const localVue = createLocalVue()

Vue.use(Vuetify);
let actions
let store
let getters;
let state
describe('UserForm.vue', () => {
    beforeEach(() => {
        localVue.use(Vuex)
        actions = {
            updateUserFields: jest.fn(),
            updateUser: jest.fn()
        }
        getters = {
            getUser: (state) => ({ field }) => {
                return state.user[field];
            },

        }
        state = {
            user: {
                firstName: "jhon",
                lastName: "doe",
                email: "test@gmail.com",
                address: '30 street'
            }
        }

        store = new Vuex.Store({
            actions,
            getters,
            state
        })


    })
    it('should show the form element on the user output', () => {
        const wrapper = mount(UserForm, {
            store,
            localVue,
            vuetify: new Vuetify,

            data() {
                return {
                    dialog: true
                }
            },
        })

        expect(wrapper.html()).toMatchSnapshot()
    })
    it("should show update icon", () => {
        const wrapper = mount(UserForm, {
            store,
            localVue,
            vuetify: new Vuetify,

            propsData: {
                update: true,
                icon: true
            }
        })

        expect(wrapper.find("[data-cy='update']").exists()).toBe(true);
    })
    it("should trigger update click", async () => {
        const wrapper = mount(UserForm, {
            store,
            localVue,
            vuetify: new Vuetify,

            propsData: {
                update: true,
                icon: true
            },
            data() {
                return {
                    dialog: true
                }
            }
        })


        const updateClick = wrapper.find("[data-cy='update-button']")
        expect(updateClick.exists()).toBe(true);
        const handleSubmit = jest.fn()
        const firstNameInput = wrapper.find('[data-cy="firstName"]')
        const lastNameInput = wrapper.find('[data-cy="lastName"]')
        const emailInput = wrapper.find('[data-cy="email"]')
        const addressInput = wrapper.find('[data-cy="address"]')
        firstNameInput.setValue('jhon')
        lastNameInput.setValue('doe')
        emailInput.setValue('test@gmail.com')
        addressInput.setValue('30 street')

        await firstNameInput.trigger('[data-cy="firstName"]')
        await lastNameInput.trigger('[data-cy="lastName"]')
        await emailInput.trigger('[data-cy="email"]')
        await addressInput.trigger('[data-cy="address"]')
        await wrapper.setMethods({ handleSubmit })

        expect(updateClick.attributes("disabled")).not.toBe("disabled")

        await updateClick.trigger("click")

        await wrapper.vm.$nextTick()

        expect(handleSubmit).toHaveBeenCalled()
    })
    it("inject props readonly", () => {
        const wrapper = mount(UserForm, {
            store,
            localVue,
            vuetify: new Vuetify,

            propsData: {
                readonly: true,
                icon: true
            }
        })

        expect(wrapper.find("[data-cy='readonly']").exists()).toBe(true);
    })

    it('dispatches "actionInput" when input event value is "input"', async () => {
        const wrapper = mount(UserForm, {
            store,
            localVue,
            vuetify: new Vuetify,

            data() {
                return {
                    dialog: true
                }
            },
        })
        const firstNameInput = wrapper.find('[data-cy="firstName"]')
        const lastNameInput = wrapper.find('[data-cy="lastName"]')
        const emailInput = wrapper.find('[data-cy="email"]')
        const addressInput = wrapper.find('[data-cy="address"]')
        firstNameInput.setValue('jhon')
        lastNameInput.setValue('doe')
        emailInput.setValue('test@gmail.com')
        addressInput.setValue('30 street')

        await firstNameInput.trigger('[data-cy="firstName"]')
        await lastNameInput.trigger('[data-cy="lastName"]')
        await emailInput.trigger('[data-cy="email"]')
        await addressInput.trigger('[data-cy="address"]')
        expect(actions.updateUserFields).toHaveBeenCalled()
    })

})
