import Clipboard from 'clipboard'
import Vue from 'vue'

Vue.directive('clipboard', {
  bind (el, bingind, vnode) {
    const clip = new Clipboard(el)
    el.dataset.clipboardText = bingind.value
    clip.on('success', e => {
      console.info('Action:', e.action)
      console.info('Text:', e.text)
      console.info('Trigger:', e.trigger)
    })
    clip.on('error', e => {
      console.error('Action:', e.action)
      console.error('Trigger:', e.trigger)
    })
  },
  update (el, bingind) {
    el.dataset.clipboardText = bingind.value
    // console.log(bingind)
  }
})
