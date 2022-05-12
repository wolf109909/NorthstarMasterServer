const path = require( "path" )
const asyncHttp = require( path.join( __dirname, "../shared/asynchttp.js" ) ) 


let versionstring = "v1.6.4"


module.exports = ( fastify, opts, done ) => {
	

	fastify.get( '/version/query', async ( request, response ) => {
		return versionstring
	})
    done()
}