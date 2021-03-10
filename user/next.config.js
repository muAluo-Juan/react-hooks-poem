
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const withCss = require('@zeit/next-css')
 
// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {}
}
 
module.exports = withCss({
    // cssModules: true,
    webpack: (config) => {
        config.plugins.push(
            new FilterWarningsPlugin({
                exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
            })
        );
        return config;
    }
})