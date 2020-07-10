const ApplicationConfig = {
  api: {
    BooksURL: '/books',
    BookTagsURL: '/book/:id/tags',
    TagBooksURL: '/tag/:id/books',
    PagesURL: '/pages',
    auth:'/user/auth',
    register:'/user/register',
    user:'/user/:id',
    collections:'/collections',
    collection:'/collection/:id',
    collectionBooks:'/collection/:id/books',
    collectionUsers:'/collection/:id/users',
    tags:'/tags'
  },
  useElectron:false
};
export default ApplicationConfig;
