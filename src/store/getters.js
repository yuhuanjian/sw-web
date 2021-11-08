const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  permission_routers: state => state.app.routers,
  nav_routers: state => state.app.navRouters,
  refreshRouterName: state => state.app.refreshRouterName,
  tagNavList: state => state.app.tagNavList
}
export default getters
