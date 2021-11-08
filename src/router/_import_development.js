module.exports = file =>
    require( /* webpackChunkName: router */ '@/views/' + file + '.vue').default // vue-loader at least v13.0.0+