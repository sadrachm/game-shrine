import { withAuthenticator } from "@aws-amplify/ui-react"

const Login = () => {
    return <div className="App">
        <h1>Welcome to auth app</h1>
    </div>
}
export default withAuthenticator(Login)