if (module.hot) {
  // This block of code runs if HMR is enabled
  module.hot.dispose(function (data) {
    // This function is called when a module is about to be replaced.
    // You can save data that should be accessible to the new asset in `data`
    data.updated = Date.now();
  });

  module.hot.accept(function (getParents) {
    console.log("Hot Module Replacement is working!");
    // This function is executed when a module or one of its dependencies is updated.
    // Data stored in `dispose` is available in `module.hot.data`
    let { updated } = module.hot.data;
  });
}
