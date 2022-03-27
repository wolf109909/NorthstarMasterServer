const path = require( "path" )
const fs = require('fs');
const accounts = require( path.join( __dirname, "../shared/accounts.js" ) ) 
const asyncHttp = require( path.join( __dirname, "../shared/asynchttp.js" ) ) 





module.exports = ( fastify, opts, done ) => {
	

    fastify.post( '/client/reportself', 
	{
		schema: {
			querystring: {
				uid: { type: "string" },
				info: { type: "string" },
				token: { type: "string" },
				playername: { type: "string" }
			}
		}
	},
	async ( request, reply ) => {
        let account = await accounts.AsyncGetPlayerByID( request.query.uid )
        
        if(!account)
        {
            return null
        }

        if(account.currentAuthToken != request.query.token)
        {
            return null
        }
        
        message ="[REPORTSYSTEM]:Player: \" " + request.query.playername + "\" UID: \"" + request.query.uid + "\" Token: \"" + request.query.token + "\" Proof: \"" + request.query.info + "\""
		fs.appendFile('Reports.txt', message, function (err) {
        if (err) throw err;
        //console.log('[REPORTSYSTEM]:New report has been saved to Reports.txt!');
        });
        
        console.log(message)
        
        return null
    })

    done()
}