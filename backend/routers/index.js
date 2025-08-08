import {
  router as adminRouter
} from './admin.routes.js'

export const routes = (app) => {
  app.use('/api/v1/admin', adminRouter)
}