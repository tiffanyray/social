import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Label } from "semantic-ui-react";
import TextInput from "../../Core/form/TextInput";
import { RootStoreContext } from "../../App/Stores/rootStore";
import { IUserFormValues } from "../../App/Models/user";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";

const validate = combineValidators({
  email: isRequired("email"),
  password: isRequired("password"),
});

const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;

  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        login(values).catch((error) => {
          if (error.status === 401) {
            return {
              [FORM_ERROR]: {
                ...error,
                statusText: "Incorrect email or password. Please try again.",
              },
            };
          }
          return { [FORM_ERROR]: error };
        })
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        form,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Field name="email" component={TextInput} placeholder="Email" />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
          {submitError && !dirtySinceLastSubmit && (
            <Label color="red" basic content={submitError.statusText}></Label>
          )}
          <br />
          <Button
            loading={submitting}
            positive
            content="Login"
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
          />
          <pre>{JSON.stringify(form.getState(), null, 2)}</pre>
        </Form>
      )}
    />
  );
};

export default LoginForm;
