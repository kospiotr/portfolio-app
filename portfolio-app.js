function normalize(){
    document.querySelectorAll('[style]').forEach(el => el.removeAttribute('style'));
    document.querySelectorAll('link[rel="stylesheet"]').forEach(el => el.parentNode.removeChild(el));
    document.querySelectorAll('style').forEach(el => el.parentNode.removeChild(el));
    document.body.innerHTML = `<div id="q-app"><app></app></div>`;
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
window.onload = function () {
    let is_dev = window.is_dev
    normalize()
    init(is_dev)
        .then(modules => {
            new Vue({
                el: '#q-app',
                methods: {
                    load: function(){
                        fetch("/sites/testowa/_api/web/GetListUsingPath(DecodedUrl=@a1)/RenderListDataAsStream?@a1=%27%2Fsites%2Ftestowa%2FLists%2Fportfoliodata%27", {
                          "headers": {
                            "content-type": "application/json;odata=verbose",
                          },
                          "body": "{\"parameters\":{\"__metadata\":{\"type\":\"SP.RenderListDataParameters\"},\"RenderOptions\":1183751,\"AllowMultipleValueFilterForTaxonomyFields\":true,\"AddRequiredFields\":true}}",
                          "method": "POST"
                        }).then(response => response.json()).then(data => console.log(data))
                    }
                },
                created: function() {
                        this.load();
                }
            })
        })

}
