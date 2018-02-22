#!/usr/bin/env node

import * as fs from 'fs-extra'
import * as json2Sass from 'jsontosass'
import * as path from 'path'

const rootDir = process.cwd()

type Configuration = {
    paths: {
        route: string
    }
}

class Compiler {

    private paths = {
        destination: null,
        scss: path.resolve(__dirname, '../source/scss')
    }

    constructor(private configuration: Configuration) {

        this.paths.destination = path.resolve(rootDir, this.configuration.paths.route)

        this.cleanDestination()
            .then(() => this.copySass())
            .then(() => this.generateVariables())

    }

    private cleanDestination() {
        return fs.emptyDir(this.paths.destination)
    }

    private generateVariables() {
        return fs.writeFile(
            path.resolve(this.paths.destination, '_values.scss'),
            json2Sass.convert(JSON.stringify({ 'grid-values': this.configuration }))
        )
    }

    public copySass() {
        return fs.copy(this.paths.scss, this.paths.destination)
            .then(() => fs.rename(
                path.resolve(this.paths.destination, 'core.scss'),
                path.resolve(this.paths.destination, this.configuration[ 'prefix' ] + '-grid.scss'))
            )
    }

}

try {
    new Compiler(
        fs.readJSONSync(path.resolve(rootDir, '.gridelrc'))
    )
} catch (error) {
    console.log(error)
}
