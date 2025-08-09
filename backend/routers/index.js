import {
  adminRouter
} from './admin.route.js'

import {
  blogRouter
} from './blog.route.js'

export const routes = (app) => {
  app.use('/api/v1/admin', adminRouter)
  app.use('/api/v1/blog', blogRouter)
}