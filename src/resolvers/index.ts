import { merge } from 'lodash';
import queries from './queries';
import mutations from './mutations';

const resolvers = merge({}, queries, mutations);

export default resolvers;
