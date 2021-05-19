alert('test')

  import('https://kospiotr.github.io/portfolio-app/portfolio-module.js').then(module => {
      module.hello('world');
    });
