import React, {useState} from "react";
import { Link, useHistory } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './styles/LoginForm.css'



const LoginForm = ({handleLogin}) => {

    const history = useHistory();
    const [notification, setNotification] = useState('')

    const formik = useFormik({
        initialValues: {
            userEmail: '',
            password: '',
        },
        validationSchema: Yup.object({
            userEmail: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required')
        }),

        onSubmit: async values => {
            setNotification('')
            console.log(values)
            const result = await handleLogin(values)
            console.log("result ", result)
            if (result){
                history.push('/')
            } else {
                setNotification('Wrong Credentials')
            }
            
        },
        validateOnChange: false,
        validateOnBlur: false
    })

    return (
        <div>

            
            <div className="form-div">
                <div className="login-card">
                    <h2>Login to Shop</h2>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla atque temporibus fugiat at. Unde cumque dicta quis, est doloribus,
                    provident hic vero ad officiis rem eveniet, cupiditate dolor error sit.
                </div>
                <form onSubmit={formik.handleSubmit} className="form">
                    <div className="form-part">
                        <label className="clr-purple">Email</label>
                        <input type="email" name="email" {...formik.getFieldProps('userEmail')}
                        />
                    </div>
                    
                    {formik.touched.userEmail && formik.errors.userEmail ? (
                        <div className="form-error">{formik.errors.userEmail}</div>
                    ) : null}

                    <div className="form-part">
                        <label className="clr-purple">Password</label>
                        <input type="password" name="password" {...formik.getFieldProps('password')} />
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                        <div className="form-error">{formik.errors.password}</div>
                    ) : null}

                    <button type="submit" className="btn clr-purple">
                        Login
                    </button>
                    <p>If you do not have an account, you can <Link to="/signup">sign-up</Link> from here</p>
                
                </form>
            </div>
            {notification}
        </div>



    )
}

export default LoginForm