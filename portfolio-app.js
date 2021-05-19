alert('test')
console.log('after')
  import('https://kospiotr.github.io/portfolio-app/portfolio-module.js').then(module => {
    console.log('in module')
      module.hello('world with Kosmo');
    });
