import { useParams } from "react-router-dom";
import ResetForm from "../../components/Reset Form/ResetForm";

function ResetPassword() {
  const { token } = useParams(); // Get the token from URL params

  return (
    <div className="forgot-password">
      <h2>Reset Password</h2>
      <ResetForm token={token} />
    </div>
  );
}

export default ResetPassword;
