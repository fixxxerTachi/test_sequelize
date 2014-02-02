var Sequelize=require('sequelize')
,sequelize=new Sequelize('test_sequelize','root','pass',{
	dialecct:'mysql',
});
/*******************************************************
sequelize.authenticate().complete(function(err){
	if(err){
		console.log('Unable to connect to database:',err)
	}else{
		console.log('connection has been established')
	}
});
***********************************************************/
var User=sequelize.define('User',{
	username: Sequelize.STRING,
	password: Sequelize.STRING
},{
	tableName:'users',
	updatedAt:'updated_at',
	createdAt:'created_at'
});
/***************************************************:
sequelize
	.sync({ force:true })
	.complete(function(err){
		if(!!err){
			console.log('an error has occurrd',err)
		}else{
			console.log('It worked')
		}
	});

var user=User.build({
	username:'john-doe',
	password:'i-am-so-great'
});

user
	.save()
	.complete(function(err){
		if(!!err){
			console.log('The instance has not been saved',err)
		}else{
			console.log('We have a persisted instance now')
		}
	});
	
User
	.find({ where:{ username:'john-doe'}})
	.complete(function(err,johnDoe){
		if(!!err){
			console.log('An error ocurred while searching for Jogn;',err)
		}else if(!johnDoe){
			console.log('No user with the username "john-doe"')
		}else{
			console.log('Hello' + johnDoe.username + '!');
			console.log('All attributes of john:',johnDoe.values.username)
		}
	});

******************************************************/

var Project=sequelize.define('Project',{
	title: Sequelize.STRING,
	description: Sequelize.TEXT
},{
	tableName:'project',
	createdAt:'created_at',
	updatedAt:'updated_at'
});

var Task=sequelize.define('Task',{
	title: Sequelize.STRING,
	description:Sequelize.TEXT,
	deadline:Sequelize.DATE
},{
	tableName:'task',
	createdAt:'created_at',
	updatedAt:'updated_at'
});
var Tool=sequelize.define('Tool',{
	name:Sequelize.STRING
},{
	tableName:'tool',
	createdAt:'created_at',
	updatedAt:'updated_at'
});
var Foo=sequelize.define('Foo',{
	name:Sequelize.STRING,
	title:{
		type: Sequelize.STRING,
		allowNull:false,
		get:function()
		{
			return this.getDataValue('title') + 'is title';
		}
	}},
	{
		tableName:'foo',
		createdAt:'created_at',
		updatedAt:'updated_at'
	}
);
/**********
Foo.sync({force: true});
Foo.create({ name:'foo name',title:'foo tile'}).success(function(){
	console.log('foo creaed');
});
Foo.find(1).success(function(foo){
	console.log(foo.title);
});
****************/
Task.belongsTo(User);
User.hasMany(Task,{foreignKey:'user_id'});
User.hasMany(Tool,{as:'Instruments',foreignKey:'user_id'});
Project.hasMany(User,{foreignKey:'user_id'});
User.hasMany(Project,{foreignKey:'project_id'});
/*******************************:
sequelize.sync({force:true}).success(function(){
	console.log('created')
});
User.create({username:'tachi',password:'tachi'}).success(function(user){
	console.log(user.username);
});
User.find(1).success(function(user){
	Task.create({
		title:'first title',
		description:'this is my first task',
		deadline:new Date(),
	}).success(function(task){
		user.setTasks([task])
	});
});
Task.findAll({ include:[User]}).success(function(tasks){
	console.log(JSON.stringify(tasks));
});
var Task=sequelize.define('Task',{
	title: Sequelize.STRING,
	rating:{ 
		type: Sequelize.STRING,
		defaultValue: 3
	}},
	{
		tableName:'task',
		createdAt:'created_at',
		updatedAt:'updated_at',
	}
);
var task=Task.build({
	title: 'very important task'
});
task.save().success(function(task){
	console.log(task.title + '+' + task.rating);
}).error(function(task){
	console.log('error')
});
*************************************/
sequelize.sync({force:true});
