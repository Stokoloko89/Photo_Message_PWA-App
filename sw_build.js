// Require Workbox build
const { generateSW } = require('workbox-build')

generateSW({

    swDest: 'app/sw.js',
    globDirectory: 'app',
    globPatterns: [
        '**/*.{html,css}',
        'main.js',
        'Classes/*'
    ],
    skipWaiting: true,
    clientsClaim: true,
}).then(({ count, size }) => {
    console.log(`Generated new service workers with ${count} precached files, totaling ${size} bytes.`)
}).catch(console.error)