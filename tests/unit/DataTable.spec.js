import Vue from 'vue'
import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import DataTable from '@/components/DataTable.vue'
import Vuetify from 'vuetify'
import Vuex from "vuex"

const localVue = createLocalVue()
const users = [
    {
        id: 1,
        firstName: "Joe",
        lastName: 'Doe',
        email: "test@email.com",
        address: "test"
    },
    {
        id: 2,
        firstName: "iadh",
        lastName: 'ben abderrahman',
        email: "iadh@email.com",
        address: "30 sproles"
    },
]
Vue.use(Vuetify);
let actions
let store
let getters;
let state
const headers = [{ "text": "id", "value": "id" }, { "text": "firstName", "value": "firstName" }, { "text": "lastName", "value": "lastName" }, { "text": "email", "value": "email" }, { "text": "address", "value": "address" }, { "text": "actions", "value": "" }]
Vue.use(Vuetify);
describe('DataTable.vue', () => {
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
    it('should show Table', () => {
        const wrapper = mount(DataTable, {
            store,
            localVue,
            vuetify: new Vuetify,
            propsData: {
                items: users,
                headers
            }

        })

        expect(wrapper.html()).toMatchSnapshot()
    })
    it('should show Table result', () => {
        const wrapper = mount(DataTable, {
            store,
            localVue,
            vuetify: new Vuetify,
            propsData: {
                items: users,
                headers
            },
            data() {
                return {
                    search: "iadh"
                }
            }

        })

        expect(wrapper.find("[data-cy='firstName']").text()).toMatch(wrapper.vm.search);
    })

})

