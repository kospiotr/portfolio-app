function init(dev){
  baseUrl = dev ? '.' : 'https://kospiotr.github.io/portfolio-app'

  function appendStyle(url){
      return Promise.resolve(document.getElementsByTagName("head")[0].insertAdjacentHTML(
              "beforeend",
              "<link rel=\"stylesheet\" href=\""+url+"\" />"));
  }

  return Promise.all([
    import('https://cdn.jsdelivr.net/npm/vue'),
    import('https://cdn.jsdelivr.net/npm/quasar/dist/quasar.umd.min.js'),
    import(baseUrl+'/portfolio-module.js'),
    import(baseUrl+'/components/app.component.js'),
    appendStyle('https://cdn.jsdelivr.net/npm/@quasar/extras/material-icons/material-icons.css'),
    appendStyle('https://cdn.jsdelivr.net/npm/quasar/dist/quasar.min.css'),
  ])
}

init(window.is_dev).then(modules => {
  var [vue, quasar, portfolio_module] = modules

  new Vue({
    el: '#q-app',
    data: function () {
      return {
        version: Quasar.version
      }
    },
    methods: {
    	notify: function () {
        this.$q.notify('Running on Quasar v' + this.$q.version)
      }
  	}
  })
})
