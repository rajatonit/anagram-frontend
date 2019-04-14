import { mount } from '@vue/test-utils'
import App from '@/App.vue'
import Vuetify from 'vuetify'
import Vue from "vue"
import moxios from 'moxios'

Vue.use(Vuetify, {
  iconfont: 'md',
})



describe('App.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(App)
    moxios.install()
    wrapper.element.setAttribute('data-app', true)
  });
  afterEach(()=>{
    moxios.uninstall()
  })

  it('Expect err when passed invalid string', () => {
    wrapper.find("#text-box").setValue("@#$@ads")
    wrapper.find('#button').trigger('click')
    //console.log(wrapper.vm.word)
    expect(wrapper.find('#err').text()).toBe('Please enter valid string with no special chars!')
    expect(wrapper.vm.err).toBe('Please enter valid string with no special chars!')
  });
  it('Expect empty anagram when passed non-anagram string', async () => {
    wrapper.find("#text-box").setValue("sddsas")
    wrapper.find('#button').trigger('click')
    moxios.stubRequest('/api/v1/anagram/sddsas', {
      status: 200,
      response:{"word":"sddsas","anagrams":[]}
    })
    await wrapper.vm.anagramSearch()
    expect(wrapper.find('#anagram-err-box').text()).toBe('Could not find a anagram for sddsas!')
  });

  it('Expect anagram when passed anagram string', async () => {
    wrapper.find("#text-box").setValue("tabs")
    wrapper.find('#button').trigger('click')
    moxios.stubRequest('/api/v1/anagram/tabs', {
      status: 200,
      response:{"word":"tabs","anagrams":['bast','bats','stab']}
    })
    await wrapper.vm.anagramSearch()
    expect(wrapper.find('#list-group').text()).toBe('bast bats stab')
    expect(wrapper.find('#anagram-list-header').text()).toBe("Here's all the anagrams for tabs!")

  });

})
