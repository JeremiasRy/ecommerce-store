import { useAppSelector } from "../hooks/reduxHook"

export default function Notification() {
    const notification = useAppSelector(state => state.notification)
    return (
        <div className={`notification-bar ${notification.message.length === 0 ? "closed" : "open"} ${notification.type}`}>
            {Array.isArray(notification.message) ? notification.message.map((msg, idx) => <p key={`${msg}${idx}`}>{msg}</p>) : <p>{notification.message}</p>}
        </div>
    )
}
