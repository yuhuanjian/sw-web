module.exports = file => () =>
    import ( /* webpackChunkName: router */ '@/views/' + file + '.vue')