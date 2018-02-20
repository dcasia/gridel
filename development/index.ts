import Gridish from 'css-gridish-grid'
import './style.scss'

document.addEventListener('DOMContentLoaded', function () {
    const grid = new Gridish(require('../.gridelrc'))
    grid.init()
    grid.show()
})
