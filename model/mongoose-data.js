//See: http://mongoosejs.com/docs/promises.html
//See: http://stackoverflow.com/questions/35929768/which-is-the-right-way-to-use-bluebird-with-mongoose
//See: http://stackoverflow.com/questions/40551550/what-is-the-correct-way-of-using-bluebird-for-mongoose-promises

var options = { promiseLibrary: require('bluebird') };
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
db = mongoose.createConnection('localhost', 'euro2012', 27017, options);

//Band = db.model('band-promises', { name: String });
db.on('error', console.error.bind(console, 'connection error:'));
//db.on('open', function() {
//    assert.equal(Band.collection.findOne().constructor, require('bluebird'));
//});

exports.teamlist = function(gname, callback) {
    db.once('open', function() {
        var teamSchema = new mongoose.Schema({
            country: String,
            GroupName: String
        });
        var Team = db.model('Team', teamSchema);
        Team.find({
            'GroupName': gname
        }, function(err, teams) {
            if (err) {
                onErr(err, callback);
            } else {
                mongoose.connection.close();
                console.log(teams);
                callback("", teams);
            }
        }); // end Team.find 
    }); // end db.once open 
};