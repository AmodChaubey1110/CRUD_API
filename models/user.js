const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			// Model attributes are defined here
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
                unique:true
			},
			password: {
				type: DataTypes.STRING,
				allowNull:false,
			},
			isActive:{
				type:DataTypes.STRING,
			},
		},
        {
            tableName:"user",
            timestamps: false
        }
	);

    User.beforeCreate(async (user) => {
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
    });

	return User;
};
