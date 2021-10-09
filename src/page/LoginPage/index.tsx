import React, { useState } from "react";
import * as Yup from "yup";
import { useAppDispatch } from "../../redux/store/hooks";
import { FormLogin } from "../../model";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { Button } from "reactstrap";
import { authActions } from "../../redux/reducer/authReducer";

export const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch();
    // const { isLoading } = useSelector((state: RootState) => state.authReducer);

    const [, setMessageError] = useState<string>("");

    const handleSubmit = (values: FormLogin) => {
      dispatch(authActions.login(values));
    }

    const initialValues: FormLogin = { email: '', password: '' };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={LoginSchema}
                onSubmit={(values) => handleSubmit(values)}>
                {({ errors, touched }) => (
                    <Form className="">
                        <div className="auth-form-group">
                            <Field
                                name="email"
                                id="login-email"
                                className={errors.email && touched.email ? 'error' : null}
                                placeholder="Username"
                                onMouseDown={() => {
                                    setMessageError('');
                                }}
                            />
                            <ErrorMessage className="auth-form-group__message-error" name="username" component="p" />
                        </div>

                        <div className="auth-form-group">
                            <Field
                                type="password"
                                name="password"
                                id="login-password"
                                className={errors.password && touched.password ? 'error' : null}
                                placeholder="Password"
                                onMouseDown={() => {
                                    setMessageError('');
                                }}
                            />
                            <ErrorMessage className="auth-form-group__message-error" name="password" component="p" />
                        </div>

                        <div>
                            <Button type="submit" className="auth-form__button auth-form__button--submit">
                                <span>&nbsp;SIGN IN</span>
                            </Button>
                        </div>

                        <div className="auth-form__check">
                            <label htmlFor="login-checkbox">
                                <input type="checkbox" name="checkbox" id="login-checkbox" />
                                <span>Keep me signed in</span>
                            </label>
                            <Link to={window.location} className="login-forgot-password">
                                Forgot password?
                            </Link>
                        </div>

                        <div>
                            <Button type="button" className="auth-form__button auth-form__button--social" title="Connect ">
                                <span>Connect using facebook</span>
                            </Button>
                        </div>

                        <p className="auth-form__switch-page">
                            <span> Don&apos;t have an account?</span>
                            <Link to="/register">Create</Link>
                        </p>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default LoginPage;
