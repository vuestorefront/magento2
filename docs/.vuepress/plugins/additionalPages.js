const path = require('path')

module.exports = {
  additionalPages: [
    {
      path: '/reference/changelog.html',
      filePath: path.resolve(__dirname, '../../../CHANGELOG.md')
    }
  ]
}