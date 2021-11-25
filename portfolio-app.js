function normalize(){
//    document.querySelectorAll('[style]').forEach(el => el.removeAttribute('style'));
//    document.querySelectorAll('link[rel="stylesheet"]').forEach(el => el.parentNode.removeChild(el));
//    document.querySelectorAll('style').forEach(el => el.parentNode.removeChild(el));
//    (document.getElementById('s4-workspace') || document.body).innerHTML = `<div id="q-app"><app></app></div>`;

}

function init(dev){

    baseUrl = dev ? '.' : 'https://kospiotr.github.io/portfolio-app'

    function  appendStyle(url){
        return Promise.resolve(document.getElementsByTagName("head")[0]
                .insertAdjacentHTML("beforeend","<link rel=\"stylesheet\" href=\""+url+"\" />"));
    }

    return Promise.all([
        appendStyle('https://cdn.jsdelivr.net/npm/@quasar/extras/material-icons/material-icons.css'),
        appendStyle('https://cdn.jsdelivr.net/npm/quasar/dist/quasar.min.css'),
    ])
    .then(() => import('https://cdn.jsdelivr.net/npm/vue'))
    .then(() => import('https://cdn.jsdelivr.net/npm/quasar/dist/quasar.umd.min.js'))
    .then(() => import(baseUrl+'/components/app.component.js'))

}

let is_dev = window.is_dev
normalize()
//init(is_dev)
//    .then(modules => {
//        new Vue({
//            el: '#q-app',
//            methods: {
//
//            },
//            created: function() {
//            }
//        })
//    })

