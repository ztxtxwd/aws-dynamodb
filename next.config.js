const withPlugins = require('next-compose-plugins');   //引入插件管理器
// next.config.js
const semi = require('@douyinfe/semi-next').default({
    /* the extension options */
});
const withSvgr = require('@newhighsco/next-plugin-svgr')

module.exports = withPlugins([
    [semi, {}], [withSvgr, {
        svgrOptions: {
            /* config options here */
        }
    }]                            //把插件放入插件管理器导出
]);