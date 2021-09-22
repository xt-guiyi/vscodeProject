import tooltip from './tooltip.vue'
import { createPopper } from '@popperjs/core';
import Vue from 'vue'
export default {
  install () {
    Vue.prototype.$tooltip = installTooltip
  }
}

const TooltipConstructor = Vue.extend(tooltip)
const Tooltip = new TooltipConstructor()

function installTooltip(el, data = [], popperOption= {}) {
  Tooltip.list = data.length !== 0 ? data : []
  const vm = Tooltip.$mount()
  document.getElementById('app').appendChild(vm.$el)
  _mount(el, Tooltip.$el, popperOption)
}

function _mount(el,TooltipEl, popperOption) {
  createPopper(el, TooltipEl, popperOption)
  TooltipEl.style.display = 'inline-block';
}
