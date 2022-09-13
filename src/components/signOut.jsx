
import { Auth } from "aws-amplify";
import { Button } from "@aws-amplify/ui-react";

const SignOut = ({setuser}) => {
    async function signOut() {
        try {
          await Auth.signOut();
          setuser(null);
        } catch (error) {
          console.log("error signing out: ", error);
        }
      }
    return <Button onClick={signOut}>Sign Out</Button>
}

export default SignOut;