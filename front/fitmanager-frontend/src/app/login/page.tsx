import LoggedRedirect from "@/components/LoggedRedirect/LoggedRedirect";
import Login from "./Login";

export default function LoginPage() {
    return (
		<LoggedRedirect>
			< Login />
		</LoggedRedirect>
    );
}