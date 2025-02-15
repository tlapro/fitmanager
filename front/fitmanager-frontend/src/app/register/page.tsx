import LoggedRedirect from "@/components/LoggedRedirect/LoggedRedirect";
import Register from "./Register";

export default function RegisterPage() {
    return (
        <LoggedRedirect>
            < Register />
        </LoggedRedirect>
    );
}