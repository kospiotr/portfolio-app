function importDependencies(dev){
  baseUrl = dev ? 'https://raw.githack.com/kospiotr/portfolio-app/main' : 'https://kospiotr.github.io/portfolio-app'
  return Promise.all([
    import(baseUrl+'/portfolio-module.js')
  ])
}

importDependencies(true).then(modules => {
  var [portfolio_module] = modules
  console.log('app loaded', modules)
  portfolio_module.hello("kosmo")
})
