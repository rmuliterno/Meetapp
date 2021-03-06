import Sequelize, { Model } from 'sequelize';

class File extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
				path: Sequelize.STRING,
				url: {
					type: Sequelize.VIRTUAL,
					get() {
						return `http://${process.env.USER_HOST}/files/${this.path}`;
					},
				},
			},
			{
				sequelize,
			}
		);

		return this;
	}
}

export default File;
