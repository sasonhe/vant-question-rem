# vant-question-rem

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
# vant-question-rem

# rem
// set 1rem = viewWidth / 10
function setRemUnit () {
  var rem = docEl.clientWidth / 10
  if(docEl.clientWidth >= 1024){
    docEl.style.fontSize = 48 + 'px'
    return;
  }
  docEl.style.fontSize = rem + 'px'
}

setRemUnit()
