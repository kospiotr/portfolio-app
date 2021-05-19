function importDependencies(dev){
  baseUrl = dev ? 'https://raw.githack.com/kospiotr/portfolio-app/main' : 'https://kospiotr.github.io/portfolio-app'
  return Promise.all([
    import(baseUrl+'/portfolio-module.js')
  ])
}

importDependencies(true).then((portfolio_module) => {
  console.log('app loaded', portfolio_module)
})
