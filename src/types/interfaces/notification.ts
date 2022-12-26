export default interface INotification {
    message: string
    timeoutInSec: number
    type: "alert" | "notification"
}