import { Button } from "reactstrap";
import { useAppDispatch } from "../../redux/store/hooks";
import { authActions } from "../../redux/reducer/authReducer";

export const Header = () => {

    const dispatch = useAppDispatch();
    const handleLogout = () => {
        dispatch(authActions.logout());
    }

    return (
        <div>
            <Button onClick={handleLogout}>
                Logout
            </Button>
        </div>
    )
}
