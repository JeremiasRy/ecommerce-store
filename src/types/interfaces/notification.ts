export default interface INotification {
    message: string | string[]
    timeoutInSec: number
    type: "alert" | "notification"
}