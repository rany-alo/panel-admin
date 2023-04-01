import ArticlesIcon from '../assets/icons/articles.png';
import UsersIcon from '../assets/icons/users.png';
import CommentsIcon from '../assets/icons/comment.png';

const sidebar_menu = [
    {
        id: 1,
        icon: UsersIcon,
        path: '/dashboard/users',
        title: 'Users',
    },
    {
        id: 2,
        icon: ArticlesIcon,
        path: '/dashboard/articles',
        title: 'Articles',
    },
    {
        id: 3,
        icon: CommentsIcon,
        path: '/dashboard/comments',
        title: 'Comments',
    }
]

export default sidebar_menu;