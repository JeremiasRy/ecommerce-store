import { useAppSelector } from "../hooks/reduxHook"

export default function Notification() {
    const notification = useAppSelector(state => state.notification)

    return (
        <div className={`notification-bar ${notification.message === "" ? "closed" : "open"} ${notification.type}`}>
            <p>{notification.message}</p>
        </div>
    )
}
