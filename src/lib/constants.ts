export const ICONS = {
  logo: '/icons/logo.png',
  logout: '/icons/logout.svg',
  profile: '/icons/profile.svg'
};

export const SIDEBAR_LINKS = [
  {
    imgURL: '/icons/home.svg',
    route: '/',
    label: 'Home'
  },
  {
    imgURL: '/icons/search.svg',
    route: '/search',
    label: 'Search'
  },
  {
    imgURL: '/icons/heart.svg',
    route: '/activity',
    label: 'Activity'
  },
  {
    imgURL: '/icons/create.svg',
    route: '/create-thread',
    label: 'Create Thread'
  },
  {
    imgURL: '/icons/community.svg',
    route: '/communities',
    label: 'Communities'
  },
  {
    imgURL: '/icons/user.svg',
    route: '/profile',
    label: 'Profile'
  }
];

export const profileTabs = [
  { value: 'threads', label: 'Threads', icon: '/icons/reply.svg' },
  { value: 'replies', label: 'Replies', icon: '/icons/members.svg' },
  { value: 'tagged', label: 'Tagged', icon: '/icons/tag.svg' }
];

export const communityTabs = [
  { value: 'threads', label: 'Threads', icon: '/icons/reply.svg' },
  { value: 'members', label: 'Members', icon: '/icons/members.svg' },
  { value: 'requests', label: 'Requests', icon: '/icons/request.svg' }
];
