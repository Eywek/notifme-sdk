/* @flow */
import NotificationCatcherProvider from '../notificationCatcherProvider'
// Types
import type {WebpushRequestType} from '../../models/notification-request'

export default class WebpushNotificationCatcherProvider extends NotificationCatcherProvider {
  async send ({subscription, title, ...request}: WebpushRequestType): Promise<string> {
    return this.sendToCatcher({
      to: `${request.userId ? request.userId : 'user'}@webpush`,
      from: '-',
      subject: title,
      headers: {
        'X-type': 'webpush',
        'X-to': `[webpush] ${request.userId ? request.userId : ''}`,
        'X-payload': JSON.stringify({title, ...request})
      }
    })
  }
}
