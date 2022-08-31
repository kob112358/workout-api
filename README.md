8/30
Learned about Mongo DB schema. you can .populate('schema', 'optionalSchemaField') to retrieve the Object information i.e. await db.workout.find().populate('lift', 'name')
One to few - store the secondary schema data directly on the primary schema (how I was originally storing lift's on the workout)
One to many - store a reference to the secondary schema on the primary (create a reference array of lifts on the workout)
One to "bajillions" - store a reference to the primary schema on the secondary schema (create a reference )

logging workouts:
one to bajillions - each LoggedWorkout will have a reference to the user, and lift

Here is a bunch of info for creating Mongo DB

//CREATE
// const Lift = mongoose.model('Lift', liftSchema);
// const newLift = new Lift({name: 'bench press', notes: 'keep elbos in', primary: ['chest'], secondary: ['tricep', 'glute']});
// newLift.save();
//READ
//Lift.find({name: 'curl'}).then(data=> {console.log(data)});
//Lift.findOne({name: 'bench press'}).then(data => console.log(data))
//Lift.findOne({version: {$gte: 1}}).then(data => console.log(data))
//UPDATE
//Lift.findOneAndUpdate({name: {$in: ['bench press', 'curl']}, {notes: 'focus on chest compression'}, {new: true, runValidators: true}).then(m => console.log(m)) <--returns a document (defaults to old document, unless you set new:true) - make sure to add runValidators
//Lift.updateOne({name: 'bench press'}, {notes: 'focus on chest compression'}).then(m => console.log(m)) <--does not return a document
//{$in: []} allows you to include multiple values
//Lift.update({name: {$in: ['bench press', 'curl']}, {notes: 'focus on chest compression'}).then(m => console.log(m))
//DELETE
//Lift.findOneAndDelete({name: 'bench press'}).then(m => console.log(m))
//Lift.remove(...) <--this will remove all instances of the given parameter

//instance method  --used for individual products
// liftSchema.methods.toggleName = async function(newName) {
//   this.name = newName;
//   this.save();
// }
//static method --primarily adding something to all product models
// liftSchema.statics.addAuthor = function () {
//  this.updateMany({}, {author: 'eric'}).then(m => console.log(m))
//}

//liftSchema.virtual('repsSets').get(function () {
// return `${this.lifts} ${this.last}`
//})

//liftSchema.pre('save', function(next) {console.log('this happens before save'); next()}) --either make it an async function because it returns a promise, or use the next function/parameter
//liftSchema.post('save', function(next) {console.log('this happens after save'); next()}) --either make it an async function because it returns a promise, or use the next function/parameter


