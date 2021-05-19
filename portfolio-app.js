function importDependencies(dev){
  baseUrl = dev ? 'https://raw.githack.com/kospiotr/portfolio-app' : 'https://kospiotr.github.io/portfolio-app'
  return Promise.all([
    import(baseUrl+'/portfolio-module.js')
  ])
}

importDependencies(true).then(() => {
  console.log('app loaded')
})
