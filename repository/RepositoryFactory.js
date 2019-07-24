import ListingRepository from './ListingRepository';
import SearchRepository from './SearchRepository';
import RequestRepository from './RequestRepository';
import SystemListRepository from './SystemListRepository';
import SubscriptionRepository from './SubscribeRepository';
import UserRepository from './UserRepository';



const repositories = {
  search: SearchRepository,
  listings: ListingRepository,
  systemlist: SystemListRepository,
  subscription: SubscriptionRepository,
  request: RequestRepository,
  user: UserRepository,
};

// eslint-disable-next-line import/prefer-default-export
export const RepositoryFactory = {
  get: name => repositories[name],
};
