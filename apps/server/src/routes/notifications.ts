import { z } from 'zod'
import fetch from 'node-fetch'
import { notificationsSchema } from '@packages/schemas/notifications'
import NotificationModel from '$models/Notification'
import { procedure, router } from '../trpc'
import UserModel from '$models/User'

const LOOKUP_NOTIFICATIONS_ENDPOINT = 'https://dev.api.antalmanac.com/api/notifications/lookupNotifications'

interface NotificationItem {
  courseTitle: string
  sectionCode: string
}

interface NotificationAPIResponse {
  smsNotificationList: NotificationItem[]
}

const notificationsRouter = router({
  /**
   * insert a new notification entry
   */
  insert: procedure.input(notificationsSchema).mutation(async ({ input }) => {
    const existing = await NotificationModel.get({
      course: input.course,
    })

    // Dynamoose TypeScript doesn't support this statement natively atm
    const updateUserIds: Partial<any> = { [existing ? '$ADD' : '$SET']: { userIds: [input.userId] } }

    const notification = await NotificationModel.update({ course: input.course }, updateUserIds)

    const user = await UserModel.get({ id: input.userId })

    if (!user) {
      return null
    }

    const updateNotifications: Partial<any> = {
      [user.notifications ? '$ADD' : '$SET']: { notifications: [input.course] },
    }

    const updatedUser = await UserModel.update({ id: input.userId }, updateNotifications)
    return { notification, updatedUser }
  }),

  /**
   * find all notifications for a given user
   */
  find: procedure.input(z.string()).query(async ({ input }) => {
    const user = await UserModel.get({ id: input })

    if (!user) {
      return null
    }

    return user.notifications
  }),

  lol: procedure.input(z.string()).query(async ({ input }) => {
    if (!input) {
      return {
        phoneNumber: '',
        smsNotificationList: [],
      }
    }

    const response = await fetch(LOOKUP_NOTIFICATIONS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber: input.replace(/ /g, '') }),
    })

    const data = (await response.json()) as NotificationAPIResponse
    return {
      phoneNumber: input,
      smsNotificationList: data.smsNotificationList,
    }
  }),
})

export default notificationsRouter
