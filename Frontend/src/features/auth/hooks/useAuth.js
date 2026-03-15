import { loginUser, registerUser, getUser } from "../services/auth.api";
import { setUser, setLoading, setError } from "../auth.slice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export function useAuth() {
    const dispatch = useDispatch();


    async function handleRegister(data) {
        let toastId;
        try {
            toastId = toast.loading("Processing..")
            dispatch(setLoading(true));
            const res = await registerUser(data);
            toast.success(res?.message, { id: toastId });
            return res;
        } catch (error) {
            toast.error(error?.message || "Registration Failed", { id: toastId });
        } finally {
            dispatch(setLoading(false));
        }
    }


    async function handleLogin(data) {
        let toastId;
        try {
            toastId = toast.loading("Processing..")
            dispatch(setLoading(true));
            const res = await loginUser(data);
            dispatch(setUser(res?.user))
            toast.success(res?.message, { id: toastId });
        } catch (error) {
            toast.error(error?.message || "Login Failed", { id: toastId });
        } finally {
            dispatch(setLoading(false));
        }
    }



    async function handleGetUser(data) {
        let toastId;
        try {
            toastId = toast.loading("Processing..")
            dispatch(setLoading(true));
            const res = await getUser();
            dispatch(setUser(res?.user))
            toast.success(res?.message, { id: toastId });
        } catch (error) {
            toast.error(error?.message || "User not found", { id: toastId });
        } finally {
            dispatch(setLoading(false));
        }
    }

    return { handleGetUser, handleLogin, handleRegister };
}
