export default {
  inserted(el, binding) {
    if ('value' in binding && binding.value === false) return
    el.focus()
  }
}
