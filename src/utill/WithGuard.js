import { useSelector } from "react-redux"

const WithGuard = (Component) => {
    const Wrapper = (props) => {
        const { isLoggedIn } = useSelector((state) => state.auth);
    
        return isLoggedIn ? (
          <Component {...props} />
        ) : (
          <div>Please login first!</div>
        );
      };
      return Wrapper; 
}

export default WithGuard