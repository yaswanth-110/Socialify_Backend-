import {
  Form,
  NavLink,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import Input from "./UI/Input";
import Button from "./UI/Button";

const AuthForm = () => {
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();

  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <Form method="POST" className="m-auto">
        <div className="flex flex-col flex-1">
          <h1 className="font-bold text-2xl mb-6 text-green">
            {isLogin ? "Login" : "Sign Up"}
          </h1>
          {!isLogin && (
            <>
              <Input
                label="Name"
                id="name"
                name="name"
                type="text"
                placeholder={"Eg. Jim Halpert"}
                required
              />
              <Input
                label="Username"
                id="username"
                name="username"
                type="text"
                placeholder={"Eg. jim29"}
                required
              />
            </>
          )}

          <Input
            label="Email"
            id="email"
            name="email"
            type="mail"
            placeholder={"Eg. jimhalpert@gmail.com"}
            required
          />
          <Input
            label="Password"
            id="password"
            name="password"
            type="password"
            required
          />

          <Button disabled={isSubmitting}>
            {isSubmitting ? "Submitting" : "Submit"}
          </Button>

          <span className="font-thin mt-8">
            {isLogin ? "Create a new account." : "Already have an account?"}
            <NavLink
              to={`/auth?mode=${isLogin ? "signup" : "login"}`}
              className={
                "rounded-md px-4 py-2 font-medium text-green hover:underline"
              }
            >
              {isLogin ? "Signup" : "Login"}
            </NavLink>
          </span>
        </div>
      </Form>
    </>
  );
};

export default AuthForm;
