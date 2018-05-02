// import something here

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do

  router.beforeEach((to, from, next) => {
    // Now you need to add your authentication logic here like calling an API endpoint
    if (to.path != '/login' && router.app.isCheckAuth && !router.app.user) {
      next({ path: '/login' });
    }
    next();
  });
};
