import { sequelize } from '../util/database';
import { User } from './user';
import { Influencer } from './influencer';
import { Feed } from './feed';

// 관계 설정에서 alias가 'influencer'로 설정되었는지 확인
Influencer.hasMany(Feed, { foreignKey: 'influencer_id', as: 'influencer' });
Feed.belongsTo(Influencer, { foreignKey: 'influencer_id', as: 'influencer' });

// User와 Influencer 간 관계에서 alias 'user'가 설정되어 있는지 확인
User.hasOne(Influencer, { foreignKey: 'user_id', as: 'user' });
Influencer.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
