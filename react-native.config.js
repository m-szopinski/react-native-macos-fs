const path = require('path');

module.exports = {
    dependencies: {
        'react-native-macos-fs': {
            platforms: {
                macos: {
                    sourceDir: path.join(__dirname, 'macos'),
                },
            },
        },
    },
};
