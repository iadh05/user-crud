import Vue from 'vue'
import { mount, createLocalVue } from '@vue/test-utils'
import TextHighlight from '@/components/TextHighlight.vue'

import Vuetify from 'vuetify'
const localVue = createLocalVue()

Vue.use(Vuetify);
describe('TextHighlight.vue', () => {
    it('should show TextHighlight', () => {
        const wrapper = mount(TextHighlight, {

            localVue,
            vuetify: new Vuetify,


        })

        expect(wrapper.html()).toMatchSnapshot()
    })
    it('should show TextHighlight', () => {
        const wrapper = mount(TextHighlight, {

            localVue,
            vuetify: new Vuetify,

            propsData: {
                text: "Jhon",
                search: "J"
            }
        })
        const highlighitedText = wrapper.find("[data-cy='highlighitedText']")
        expect(highlighitedText.exists()).toBe(true)
        expect(highlighitedText.text()).toBe("J")
    })
})