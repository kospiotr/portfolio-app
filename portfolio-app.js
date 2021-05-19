Promise.retry = function(fn, times, delay) {
    return new Promise(function(resolve, reject){
        var error;
        var attempt = function() {
            if (times == 0) {
                reject(error);
            } else {
                fn().then(resolve)
                    .catch(function(e){
                        times--;
                        error = e;
                        setTimeout(function(){attempt()}, delay);
                    });
            }
        };
        attempt();
    });
};

function init(dev){
  baseUrl = dev ? '.' : 'https://kospiotr.github.io/portfolio-app'

  function  appendStyle(url){
      return Promise.resolve(document.getElementsByTagName("head")[0].insertAdjacentHTML(
              "beforeend",
              "<link rel=\"stylesheet\" href=\""+url+"\" />"));
  }

  return Promise.all([
    appendStyle('https://cdn.jsdelivr.net/npm/@quasar/extras/material-icons/material-icons.css'),
    appendStyle('https://cdn.jsdelivr.net/npm/quasar/dist/quasar.min.css'),
    import('https://cdn.jsdelivr.net/npm/vue'),
    import('https://cdn.jsdelivr.net/npm/quasar/dist/quasar.umd.min.js')
  ]).then(() => Promise.all([
    import(baseUrl+'/components/app.component.js')
  ]))

}

init(window.is_dev).then(modules => {
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
